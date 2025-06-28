const express = require('express');
const router = express.Router();
const banco = require('../banco')
// Middleware para proteção das rotas admin
function verLogin(req, res, next) {
  if (!global.adminEmail || global.adminEmail === "") {
    return res.redirect('/admin/');
  }
  next();
}

// GET /admin - Página login
router.get('/', (req, res) => {
  res.render('admin/loginadm', { erro: null });
});

// POST /admin/login - Autenticação admin
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const admin = await global.banco.buscarAdmin({ email, senha });
    if (admin && admin.admcodigo) {
      global.adminCodigo = admin.admcodigo;
      global.adminEmail = admin.admemail;
      return res.redirect('/admin/dashboard');
    } else {
      return res.render('admin/loginadm', { erro: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro no login admin:', error);
    return res.render('admin/loginadm', { erro: 'Erro interno no servidor' });
  }
});
/*
// GET /admin/dashboard
router.get('/dashboard', verLogin, async (req, res) => {
  try {
     const conn = await global.banco.conectarBD();
    // Total de cursos
    const [cursos] = await conn.query("SELECT COUNT(*) AS total FROM cursos");
    const totalCursos = cursos[0].total;
    // Total de usuários
    const [alunos] = await conn.query("SELECT COUNT(*) AS total FROM usuarios");
    const totalAlunos = alunos[0].total;
    // Receita total
    const [receita] = await conn.query("SELECT SUM(total) as total FROM receita_curso");
    const receitaTotal = receita[0].total;
    // Alunos por curso
    const cursosAlunos = await global.banco.listarAlunosPorCurso();

    const studentsLabels = cursosAlunos.map(c => c.curso);
    const studentsDatasets = [{
      label: 'Alunos',
      data: cursosAlunos.map(c => c.alunos),
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4
    }];

    res.render('admin/dashboard', {
      title: 'Dashboard Administrativo - EduStream',
      admin: { name: global.adminEmail },
      user: global.adminEmail,
      totalCursos,
      totalAlunos,
      receitaTotal,
      comparativo: { cursos: 25, alunos: 30, receita: 12 },
      studentsLabels: JSON.stringify(studentsLabels),
      studentsDatasets: JSON.stringify(studentsDatasets)
    });

  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
    res.render('admin/dashboard', {
      title: 'Dashboard Administrativo - EduStream',
      admin: { name: global.adminEmail },
      user: global.adminEmail,
      totalCursos: 0,
      totalAlunos: 0,
      receitaTotal: 'R$ 0,00',
      comparativo: { cursos: 0, alunos: 0, receita: 0 },
      studentsLabels: '[]',
      studentsDatasets: '[]'
    });
  }
});

*/
router.get('/dashboard', verLogin, async (req, res) => {
  try {
    const conn = await global.banco.conectarBD();

    // Total de cursos
    const [cursos] = await conn.query("SELECT COUNT(*) AS total FROM cursos");
    const totalCursos = cursos[0].total;

    // Total de usuários
    const [alunos] = await conn.query("SELECT COUNT(*) AS total FROM usuarios");
    const totalAlunos = alunos[0].total;

    // Receita total
    const [receita] = await conn.query("SELECT SUM(total) as total FROM receita_curso");
    const receitaTotal = receita[0].total || 0;

    // Alunos por curso
    const cursosAlunos = await global.banco.listarAlunosPorCurso();
    const labelsAlunos = cursosAlunos.map(c => c.curso);
    const dataAlunos = cursosAlunos.map(c => c.alunos);

    // Cursos mais vendidos pela receita
    const [receitaCursos] = await conn.query(`
      SELECT c.curnome AS curso, SUM(rc.total) AS receita
      FROM receita_curso rc
      JOIN cursos c ON c.curcodigo = rc.curcodigo
      GROUP BY c.curcodigo
      ORDER BY receita DESC
    `);
    const labelsReceita = receitaCursos.map(r => r.curso);
    const dataReceita = receitaCursos.map(r => parseFloat(r.receita));

    // Busca feedbacks
    const [feedbacks] = await conn.query(`
      SELECT id, tipo, mensagem
      FROM feedback
      ORDER BY tipo, id
    `);

    res.render('admin/dashboard', {
      title: 'Dashboard Administrativo - EduStream',
      admin: { name: global.adminEmail },
      user: global.adminEmail,
      totalCursos,
      totalAlunos,
      receitaTotal: receitaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      comparativo: { cursos: 25, alunos: 30, receita: 12 },
      labelsAlunos: JSON.stringify(labelsAlunos),
      dataAlunos: JSON.stringify(dataAlunos),
      labelsReceita: JSON.stringify(labelsReceita),
      dataReceita: JSON.stringify(dataReceita),
      feedbacks // manda array direto para iterar no EJS
    });

  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
    res.render('admin/dashboard', {
      title: 'Dashboard Administrativo - EduStream',
      admin: { name: global.adminEmail },
      user: global.adminEmail,
      totalCursos: 0,
      totalAlunos: 0,
      receitaTotal: 'R$ 0,00',
      comparativo: { cursos: 0, alunos: 0, receita: 0 },
      labelsAlunos: '[]',
      dataAlunos: '[]',
      labelsReceita: '[]',
      dataReceita: '[]',
      feedbacks: []
    });
  }
});


router.get('/gerenciamento_curso', verLogin, async (req, res) => {
  try {
    const receitas = await global.banco.listarReceitaMensal();
    const labelsLinha = receitas.map(r => r.curso);
    const dataLinha = receitas.map(r => parseFloat(r.total));

    const cursos = await global.banco.listarCursos();
    const labelsPizza = cursos.map(c => c.titulo);
    const dataPizza = cursos.map(c => c.alunos);

    res.render('admin/gerenciamento_curso', {
      title: 'Gerenciamento de cursos - EduStream',
      admNome: global.adminEmail,
      cursos,
      labelsPizza: JSON.stringify(labelsPizza),
      dataPizza: JSON.stringify(dataPizza),
      labelsLinha: JSON.stringify(labelsLinha),
      dataLinha: JSON.stringify(dataLinha)
    });

  } catch (error) {
    console.error('Erro ao carregar cursos:', error);
    res.render('admin/gerenciamento_curso', {
      title: 'Gerenciamento de cursos - EduStream',
      admNome: global.adminEmail,
      cursos: [],
      labelsPizza: '[]',
      dataPizza: '[]',
      labelsLinha: '[]',
      dataLinha: '[]'
    });
  }
});


 
// Gerenciamento de usuários
router.get('/gerenciamento_usuario', verLogin, async (req, res) => {
  const conn = await global.banco.conectarBD();

  // busca só o admin logado
  const [adminData] = await conn.query("SELECT admfoto FROM admins WHERE admemail = ?", [global.adminEmail]);
  const admin = adminData[0];

  try {
    const usuarios = await global.banco.listarUsuarios();
    res.render('admin/gerenciamento_usuario', {
      title: 'Gerenciamento de usuário - EduStream',
      admNome: global.adminEmail,
      user: { name: global.adminEmail },
      users: usuarios,
      totalUsers: usuarios.length,
      admin
    });
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    res.render('admin/gerenciamento_usuario', {
      title: 'Gerenciamento de usuário - EduStream',
      admNome: global.adminEmail,
      user: { name: global.adminEmail },
      users: [],
      totalUsers: 0,
      erro: 'Erro ao carregar usuários',
      admin
    });
  }
});

 
// Novo curso - formulário
router.get('/cursos_novo', verLogin, (req, res) => {
  res.render('admin/cursos_novo');
});
 
// POST salvar curso completo (curso + info extra)
router.post('/cadastro_curso_aula', verLogin, async (req, res) => {
  try {
    const {
      nome,
      descricao,
      categoria,
      horas,
      preco
    } = req.body;
 
    await global.banco.adminInserirCurso(nome, descricao, categoria, horas, preco);
 
    // Aqui você pode salvar instrutor, links etc. se quiser
 
    res.redirect('/admin/cadastro_curso_aula?sucesso=1');
  } catch (erro) {
    console.error('Erro ao salvar curso:', erro);
    res.status(500).send('Erro ao salvar o curso.');
  }
});

// GET sair
router.get('/sair', verLogin, (req, res) => {
  delete global.adminCodigo;
  delete global.adminEmail;
  res.redirect('/admin');
});

// POST criar usuário
router.post('/usuarios', verLogin, async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ success: false, message: 'Email e senha são obrigatórios' });
    }

    await global.banco.inserirUsuario(email, senha);

    res.json({ success: true, message: 'Usuário criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// PUT atualizar usuário
router.put('/usuarios/:id', verLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    await global.banco.atualizarUsuario(id, email);

    res.json({ success: true, message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// DELETE deletar usuário
router.delete('/usuarios/:id', verLogin, async (req, res) => {
  try {
    const { id } = req.params;
    await global.banco.deletarUsuario(id);
    res.json({ success: true, message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

module.exports = router;
