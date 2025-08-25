var createError = require("http-errors");
var express = require("express");
const multer = require("multer");
var path = require("path");
var cookieParser = require("cookie-parser");
const logger = require("./utils/logger"); // <<-- nosso logger

var indexRouter = require("./routes/index");
var adminsRouter = require("./routes/admin");
var videoRouter = require("./routes/video");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Apenas imagens JPG ou PNG são permitidas!"));
    }
  },
});
app.use("/uploads", express.static("public/uploads"));

app.use("/", indexRouter);
app.use("/admin", adminsRouter);
app.use("/video", videoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  logger.warn(`404 - Rota não encontrada: ${req.originalUrl}`);
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  logger.error("Erro capturado: %o", err);

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

// Rota para forçar erro
app.get("/forcar-erro", (req, res, next) => {
  try {
    // algo que vai dar erro
    throw new Error("Erro proposital para teste de log 🚨");
  } catch (err) {
    next(err); // envia para o middleware de erro
  }
});

logger.info("EduStream iniciado com sucesso!");

module.exports = app;
