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

    // Receita mensal - removida porque não há tabela pagamentos
    const receitaMensal = 0;

    res.render('admin/dashboard', {
      title: 'Dashboard Administrativo - EduStream',
      admin: { name: global.adminEmail },
      user: global.adminEmail,
      totalCursos,
      totalAlunos,
      receitaMensal,
      comparativo: {
        cursos: 25,
        alunos: 30,
        receita: 0 // ajustar conforme necessidade
      }
    });

  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
    res.render('admin/dashboard', {
      title: 'Dashboard Administrativo - EduStream',
      admin: { name: global.adminEmail },
      user: global.adminEmail,
      totalCursos: 0,
      totalAlunos: 0,
      receitaMensal: 0,
      comparativo: {
        cursos: 0,
        alunos: 0,
        receita: 0
      },
      erro: 'Erro ao carregar dados do dashboard'
    });
  }
});

// Gerenciamento de cursos
router.get('/gerenciamento_curso', verLogin, (req, res) => {
  res.render('admin/gerenciamento_curso', {
    admNome: global.adminEmail
  });
});
 
// Gerenciamento de usuários
router.get('/gerenciamento_usuario', verLogin, async (req, res) => {
  try {
    const usuarios = await global.banco.listarUsuarios();
    res.render('admin/gerenciamento_usuario', {
      title: 'Gerenciamento de usuário - EduStream',
      admNome: global.adminEmail,
      user: { name: global.adminEmail },
      users: usuarios,
      totalUsers: usuarios.length
    });
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    res.render('admin/gerenciamento_usuario', {
      title: 'Gerenciamento de usuário - EduStream',
      admNome: global.adminEmail,
      user: { name: global.adminEmail },
      users: [],
      totalUsers: 0,
      erro: 'Erro ao carregar usuários'
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
