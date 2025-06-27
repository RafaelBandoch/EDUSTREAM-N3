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

async function buscarUsuario(usuario) {
  const conn = await conectarBD();
  const sql = "SELECT * FROM usuarios WHERE usuemail=? AND ususenha=?;";
  const [usuarioEcontrado] = await conn.query(sql, [usuario.email, usuario.senha]);
  return usuarioEcontrado && usuarioEcontrado.length > 0 ? usuarioEcontrado[0] : {};
}

async function buscarAdmin(usuario) {
  const conn = await conectarBD();
  const sql = "SELECT * FROM admins WHERE admemail=? AND admsenha=?;";
  const [usuarioEcontrado] = await conn.query(sql, [usuario.email, usuario.senha]);
  return usuarioEcontrado && usuarioEcontrado.length > 0 ? usuarioEcontrado[0] : {};
}

async function CadastroUsuario(email, senha, nome, foto) {
const conexao = await conectarBD();
const sql = 'INSERT INTO usuarios (usuemail, ususenha, usunome, usufoto) VALUES (?, ?, ?, ?);';
conexao.query(sql, [email, senha, nome, foto]);
}

async function adminInserirCurso(nome, descricao, categoria, horas, preco) {
  const conn = await conectarBD()
  const sql = "INSERT INTO cursos (curnome, curdescricao, curcategoria, curhoras, curpreco) VALUES (?,?,?,?,?);"
  await conn.query(sql, [nome, descricao, categoria, horas, preco])
}
 
async function adminEditarCurso(id, nome, descricao, categoria, horas, preco) {
  const conn = await conectarBD();
  const sql = "UPDATE cursos SET curnome = ?, curdescricao = ?, curcategoria = ?, curhoras = ?, curpreco = ?WHERE id = ?;";
  await conn.query(sql, [nome, descricao, categoria, horas, preco, id]);
}


async function query(sql, params) {
  const conn = await conectarBD();
  return conn.query(sql, params);
}

async function end() {
  if (conexao) {
    await conexao.end();
    console.log('Conexão com MySQL encerrada.');
    conexao = null;
  }
}


async function listarCursos() {
  const conn = await conectarBD()
 
  try {
    const [results] = await conn.query("SELECT * FROM cursos ORDER BY created_at DESC")
 
    // Formatar dados para o template
    const cursosFormatados = results.map((curso) => ({
      titulo: curso.curnome,
      status: "ATIVO", // Você pode adicionar um campo status na tabela
      statusClass: "active",
      alunos: Math.floor(Math.random() * 500) + 50, // Simular número de alunos
      preco: `R$ ${curso.curpreco.toFixed(2).replace(".", ",")}`,
    }))
 
    return cursosFormatados
  } catch (error) {
    console.error("Erro ao listar cursos:", error)
    return []
  }
}
 
async function listarUsuarios() {
  const conn = await conectarBD();

  try {
    const [results] = await conn.query("SELECT * FROM usuarios");

    if (!results || results.length === 0) {
      return [];
    }

    const usuariosFormatados = results.map((usuario) => ({
      id: usuario.usucodigo,
      name: usuario.usuname || "Usuário sem nome",
      email: usuario.usuemail || "email@exemplo.com",
      access: ["exportação de dados"], // valor padrão já que não existe campo tipo
      lastSeen: "23 Mar, 2025",        // valor fixo de exemplo
      dateAdded: "30 Jan, 2022"        // valor fixo de exemplo
    }));

    return usuariosFormatados;
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return [];
  }
}

async function buscaCursoId(id) {
  const conexao = await conectarBD();
  const sql = `
    SELECT c.*, cat.catnome AS categoria
    FROM cursos c
    JOIN categorias cat ON c.catcodigo = cat.catcodigo
    WHERE c.curcodigo = ?;
  `;
  const [resultado] = await conexao.query(sql, id);
  return resultado[0]; // retorna só um curso
}


async function buscaAulaCursoId(id) {
  const conexao = await conectarBD();
  const sql = `select * from aula where curcodigo = ?;`
  const [aulas] = await conexao.query(sql, id);
  return aulas;
}
 
async function buscaCursoUsuario(usuario) {
  const conexao = await conectarBD();
  const sql = `SELECT 
  c.curcodigo, c.curnome, c.curdescricao, cat.catnome AS categoria, c.curhoras, c.curpreco
FROM cursos c
JOIN usuario_curso uc ON c.curcodigo = uc.curcodigo
JOIN categorias cat ON c.catcodigo = cat.catcodigo
WHERE uc.usucodigo = ?;`;
  const [cursos] = await conexao.query(sql, usuario);
  return cursos;
}

async function buscaAulaId(id) {
const conexao = await conectarBD();
const sql = 'select * from aula where aulaid = ?;'
const [aula] = await conexao.query(sql, id);
return aula[0];
}

async function buscaCursoAulaId(id) {
const conexao = await conectarBD();
const sql ='select * from cursos where curcodigo =?;';
const [curso] = await conexao.query(sql, id);
return curso[0];
}

// Conecta ao iniciar
conectarBD();

module.exports = { buscaCursoId, buscaAulaId, buscaCursoAulaId, buscaAulaCursoId, buscaCursoUsuario, conectarBD, 
  buscarUsuario, buscarAdmin, CadastroUsuario, adminInserirCurso, adminEditarCurso, listarCursos, listarUsuarios, 
  query, end,  };
