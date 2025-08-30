// banco.js (mesma conexão; funções reestruturadas)
const mysql = require('mysql2/promise');

let conexao;

async function conectarBD() {
  if (!conexao) {
    conexao = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'edustream'
    });
    console.log('Conectou no MySQL!');
  }
  return conexao;
}

/** Funil único p/ queries: mantém compatibilidade e dá visibilidade básica */
async function runQuery(name, sql, params = []) {
  const conn = await conectarBD();
  const t0 = Date.now();
  try {
    const [rows] = await conn.query(sql, params);
    const ms = Date.now() - t0;
    // log simples; depois você pode trocar por seu logger/Datadog
    // console.log(`[DB] ${name} OK (${ms}ms)`);
    return rows;
  } catch (err) {
    const ms = Date.now() - t0;
    console.error(`[DB] ${name} ERRO (${ms}ms): ${err.message}`);
    throw err;
  }
}

/** Compat: quem usa banco.query(sql, params) continua funcionando */
async function query(sql, params) {
  const op = (sql.split(/\s+/)[0] || 'QUERY').toLowerCase();
  return runQuery(op, sql, params);
}

/* ===================== FUNÇÕES DE DOMÍNIO ===================== */

async function buscarUsuario(usuario) {
  const sql = 'SELECT * FROM usuarios WHERE usuemail=? AND ususenha=?;';
  const rows = await runQuery('usuarios.findByEmailSenha', sql, [usuario.email, usuario.senha]);
  return rows && rows.length > 0 ? rows[0] : {};
}

async function buscarAdmin(usuario) {
  const sql = 'SELECT * FROM admins WHERE admemail=? AND admsenha=?;';
  const rows = await runQuery('admins.findByEmailSenha', sql, [usuario.email, usuario.senha]);
  return rows && rows.length > 0 ? rows[0] : {};
}

async function CadastroUsuario(email, senha, nome, foto) {
  const sql = 'INSERT INTO usuarios (usuemail, ususenha, usunome, usufoto) VALUES (?, ?, ?, ?);';
  await runQuery('usuarios.insert', sql, [email, senha, nome, foto]);
}

async function adminInserirCurso(nome, descricao, categoria, horas, preco) {
  // Tabela cursos: (curnome, curdescricao, curhoras, curpreco, catcodigo, curthumb)
  const sql = 'INSERT INTO cursos (curnome, curdescricao, curhoras, curpreco, catcodigo) VALUES (?,?,?,?,?);';
  await runQuery('cursos.insert', sql, [nome, descricao, horas, preco, categoria]);
}

async function adminEditarCurso(id, nome, descricao, categoria, horas, preco) {
  // Corrigido: catcodigo e WHERE curcodigo = ?
  const sql = 'UPDATE cursos SET curnome = ?, curdescricao = ?, catcodigo = ?, curhoras = ?, curpreco = ? WHERE curcodigo = ?;';
  await runQuery('cursos.update', sql, [nome, descricao, categoria, horas, preco, id]);
}

async function end() {
  if (conexao) {
    await conexao.end();
    console.log('Conexão com MySQL encerrada.');
    conexao = null;
  }
}

async function listarCursos() {
  const sql = `
    SELECT 
      c.curnome AS titulo,
      c.curpreco AS preco,
      COUNT(uc.usucodigo) AS alunos
    FROM cursos c
    LEFT JOIN usuario_curso uc ON c.curcodigo = uc.curcodigo
    GROUP BY c.curcodigo
    ORDER BY c.curcodigo ASC;
  `;
  const rows = await runQuery('cursos.listarCursos', sql, []);
  return rows.map(curso => ({
    titulo: curso.titulo,
    alunos: curso.alunos,
    preco: curso.preco
  }));
}

async function listarReceitaMensal() {
  const sql = `
    SELECT 
      c.curnome AS curso,
      r.total
    FROM receita_curso r
    JOIN cursos c ON c.curcodigo = r.curcodigo
    ORDER BY r.total ASC;
  `;
  return runQuery('receita_curso.listar', sql, []);
}

async function listarUsuarios() {
  const sql = 'SELECT * FROM usuarios;';
  try {
    const rows = await runQuery('usuarios.listar', sql, []);
    if (!rows || rows.length === 0) return [];
    return rows.map((usuario) => ({
      id: usuario.usucodigo,
      name: usuario.usunome || 'Usuario Sem Nome',
      email: usuario.usuemail || 'email@exemplo.com',
      foto: usuario.usufoto || '/uploads/default.jpg',
      access: ['exportação de dados'],
      lastSeen: '23 Mar, 2025',
      dateAdded: '30 Jan, 2022'
    }));
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return [];
  }
}

async function buscaCursoId(id) {
  const sql = `
    SELECT c.*, cat.catnome AS categoria
    FROM cursos c
    JOIN categorias cat ON c.catcodigo = cat.catcodigo
    WHERE c.curcodigo = ?;
  `;
  const rows = await runQuery('cursos.findById', sql, [id]);
  return rows[0] || null;
}

async function buscaAulaCursoId(id) {
  const sql = 'SELECT * FROM aula WHERE curcodigo = ?;';
  return runQuery('aula.byCursoId', sql, [id]);
}

async function buscaCursoUsuario(usuario) {
  const sql = `
    SELECT 
      c.curcodigo, c.curnome, c.curdescricao, c.curthumb, 
      cat.catnome AS categoria, c.curhoras, c.curpreco
    FROM cursos c
    JOIN usuario_curso uc ON c.curcodigo = uc.curcodigo
    JOIN categorias cat ON c.catcodigo = cat.catcodigo
    WHERE uc.usucodigo = ?;
  `;
  return runQuery('cursos.byUsuarioId', sql, [usuario]);
}

async function buscaAulaId(id) {
  const sql = 'SELECT * FROM aula WHERE aulaid = ?;';
  const rows = await runQuery('aula.findById', sql, [id]);
  return rows[0] || null;
}

async function buscaCursoAulaId(id) {
  const sql = 'SELECT * FROM cursos WHERE curcodigo = ?;';
  const rows = await runQuery('cursos.findByIdForAula', sql, [id]);
  return rows[0] || null;
}

async function listarAlunosPorCurso() {
  const sql = `
    SELECT 
      c.curnome AS curso,
      COUNT(uc.usucodigo) AS alunos
    FROM cursos c
    LEFT JOIN usuario_curso uc ON uc.curcodigo = c.curcodigo
    GROUP BY c.curcodigo
    ORDER BY c.curcodigo;
  `;
  return runQuery('cursos.alunosPorCurso', sql, []);
}

// Conecta ao iniciar (mantém seu comportamento)
conectarBD();

module.exports = { 
  buscaCursoId, buscaAulaId, buscaCursoAulaId, buscaAulaCursoId, buscaCursoUsuario,
  conectarBD, buscarUsuario, buscarAdmin, CadastroUsuario,
  adminInserirCurso, adminEditarCurso, listarCursos, listarUsuarios,
  query, end, listarReceitaMensal, listarAlunosPorCurso
};
