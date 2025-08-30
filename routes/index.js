var express = require('express');
var router = express.Router();
const db = require('../banco');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas imagens JPG ou PNG são permitidas!'));
    }
  }
});

// Função para definir usuário global
function setGlobalUsuario(usuario) {
  if (usuario && usuario.usucodigo && usuario.usuemail) {
    global.usuarioCodigo = usuario.usucodigo;
    global.usuarioEmail = usuario.usuemail;
  } else {
    global.usuarioCodigo = null;
    global.usuarioEmail = null;
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET Menu
// GET Menu
router.get('/menu', async (req, res) => {
  try {
    const cursos = await db.query('SELECT * FROM cursos');
    const categorias = await db.query('SELECT * FROM categorias');
    const filtros = await db.query('SELECT * FROM filtros ORDER BY filtnome');

    res.render('menu', {
      usuarioCodigo: global.usuarioCodigo,
      usuarioEmail: global.usuarioEmail,
      title: 'Menu - EduStream',
      cursos: Array.isArray(cursos) ? cursos : [],
      categorias: Array.isArray(categorias) ? categorias : [],
      filtros: Array.isArray(filtros) ? filtros : [],
    });

  } catch (err) {
    console.error('Erro ao carregar cursos, categorias ou filtros:', err);
    res.status(500).send('Erro ao carregar dados.');
  }
});



// GET cadastro
router.get('/cadastro', (req, res) => {
  res.render('cadastro', {
    mensagem: undefined,
    sucesso: false
  });
});

router.get("/curso/:id", async function (req, res) {
  const id = req.params.id;
  const curso = await global.banco.buscaCursoId(id);
  const aulas = await global.banco.buscaAulaCursoId(id);
  console.log(curso);
  console.log(aulas);
  console.log('[DEBUG - TIPO DE AULAS]', typeof aulas); // deve ser 'object'
  console.log('[DEBUG - É ARRAY?]', Array.isArray(aulas)); // deve ser true
  console.log('[DEBUG - AULAS]', aulas); // veja a estrutura
  res.render('cursos', { curso, aulas });
});
 
// GET Meus Cursos
router.get('/meus_cursos', async function (req, res) {
  verificarLogin(res);
  const usuario = String(global.usuarioCodigo);
  console.log(usuario);
  const cursos = await global.banco.buscaCursoUsuario(usuario);
  console.log(cursos);
  res.render('meus_cursos', { cursos });
});
// GET Aulas
router.get('/aula/:id', async function (req, res) {
  verificarLogin(res);

  const usuario = String(global.usuarioCodigo);
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    console.error('ID da aula inválido:', req.params.id);
    return res.redirect('/menu'); // redireciona se não for número
  }

  console.log('Id do usuario: ', usuario);
  console.log('Id da aula: ', id);

  const aula = await global.banco.buscaAulaId(id);

  if (!aula) {
    return res.redirect('/menu');
  }

  const curso = await global.banco.buscaCursoAulaId(aula.curcodigo);
  let aulas = await global.banco.buscaAulaCursoId(aula.curcodigo);

  if (!Array.isArray(aulas)) aulas = [];

  res.render('aula', {
    aula,
    curso,
    aulas,
    titulo: `EduStream - ${aula.titulo}`
  });
});



// GET Aulas Salvas
router.get('/aulas_salvas/:usucodigo', async (req, res) => {
  verificarLogin(res);
  if (!global.usuarioEmail || global.usuarioEmail == "") return;

  const usucodigo = req.params.usucodigo;

  if (usucodigo !== String(global.usuarioCodigo)) {
    return res.status(403).send('Acesso negado. Você só pode ver suas próprias aulas salvas.');
  }

  try {
    const aulas = await db.query(`
  SELECT 
    a.aulaid,
    a.titulo,
    a.thumb_url,
    COALESCE(p.status, 'nao iniciado') AS status
  FROM aula a
  JOIN progresso p ON a.aulaid = p.id_aula
  WHERE p.id_usuario = ?
  ORDER BY a.aulaid;
`, [usucodigo]);


    res.render('aulas_salvas', { aulas, usuarioCodigo: usucodigo });

  } catch (error) {
    console.error('Erro ao carregar aulas salvas:', error);
    res.status(500).send('Erro ao carregar aulas salvas.');
  }
});



// POST Cadastro 
router.post('/cadastro', async function(req, res, next){
  const email = req.body.email;
  const senha = req.body.senha;

  if (!email || !senha) {
    return res.render('cadastro', {
      mensagem: "Todos os campos devem ser preenchidos",
      sucesso: false
    });
  }
  
  await global.banco.CadastroUsuario(email, senha);
  return res.render('cadastro', {
    mensagem: "Usuário cadastrado com sucesso.",
    sucesso: true
  });
});

// POST Login
router.post('/login', async function(req, res, next){
  const email = req.body.email ;
  const senha = req.body.senha;

  const usuario = await global.banco.buscarUsuario({email,senha});

  if (usuario && usuario.usucodigo) {
    setGlobalUsuario(usuario);
    res.redirect('/menu');  
  } else {
    res.redirect('/');
  }
});


/**
 * Funções diversas
 */
function verificarLogin(res)
{
  if (!global.usuarioEmail || global.usuarioEmail == "")
    res.redirect('/');
}

module.exports = router;
