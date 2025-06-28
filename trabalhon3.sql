-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: edustream
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `admcodigo` int(11) NOT NULL AUTO_INCREMENT,
  `admemail` varchar(50) DEFAULT NULL,
  `admsenha` varchar(255) NOT NULL,
  `admfoto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admcodigo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'fulano@gmail.com','123','ai-generated.jpg');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aula`
--

DROP TABLE IF EXISTS `aula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aula` (
  `aulaid` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `descricao` varchar(500) DEFAULT NULL,
  `video_url` varchar(200) DEFAULT NULL,
  `duracao` int(11) DEFAULT NULL,
  `thumb_url` varchar(100) DEFAULT NULL,
  `curcodigo` int(11) DEFAULT NULL,
  PRIMARY KEY (`aulaid`),
  KEY `curcodigo` (`curcodigo`),
  CONSTRAINT `aula_ibfk_1` FOREIGN KEY (`curcodigo`) REFERENCES `cursos` (`curcodigo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aula`
--

LOCK TABLES `aula` WRITE;
/*!40000 ALTER TABLE `aula` DISABLE KEYS */;
INSERT INTO `aula` VALUES (1,'Banco de Dados MySQL','Fundamentos de MySQL: criacao de tabelas, consultas SQL e relacionamentos entre tabelas.','videoteste.mp4',2000,'node.png',1),(2,'Introducao ao Node.js','Aula introdutoria','videoteste.mp4',30,'node.png',1),(3,'Express Basico','Configuracao do Express','videoteste.mp4',45,'node.png',3),(4,'EJS e Templates','Uso do EJS para views','videoteste.mp4',40,'node.png',5),(5,'MySQL com Node.js','Integracao com MySQL','videoteste.mp4',50,'node.png',4),(6,'Rotas e Middlewares','Manipulando rotas','videoteste.mp4',35,'node.png',3),(7,'Autenticacao','Login e sessoes','videoteste.mp4',60,'node.png',2);
/*!40000 ALTER TABLE `aula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `catcodigo` int(11) NOT NULL AUTO_INCREMENT,
  `catnome` varchar(100) NOT NULL,
  PRIMARY KEY (`catcodigo`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Design'),(2,'Programacao'),(3,'Audiovisual'),(4,'Games'),(5,'Marketing'),(6,'Software'),(7,'Front End'),(8,'Game Design'),(9,'Gestao');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cursos` (
  `curcodigo` int(11) NOT NULL AUTO_INCREMENT,
  `curnome` varchar(255) NOT NULL,
  `curdescricao` varchar(500) DEFAULT NULL,
  `curhoras` int(11) DEFAULT NULL,
  `curpreco` decimal(10,2) DEFAULT NULL,
  `catcodigo` int(11) DEFAULT NULL,
  `curthumb` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`curcodigo`),
  KEY `fk_cursos_categorias` (`catcodigo`),
  CONSTRAINT `fk_cursos_categorias` FOREIGN KEY (`catcodigo`) REFERENCES `categorias` (`catcodigo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,'JavaScript Basico','Curso introdutorio de JavaScript',40,199.90,2,'programacao.jpg'),(2,'React Avancado','Curso avancado de React',60,299.90,2,'node.png'),(3,'Node.js Completo','Curso completo de Node.js',80,399.90,2,'software.png'),(4,'Design UI/UX','Curso de Design de Interface',50,249.90,1,'node.png'),(5,'Python do zero ao pro','Curso completo de Python',70,350.00,2,'fundo_programacao.png'),(6,'CSS e HTML Basico','Fundamentos de desenvolvimento web',30,150.00,2,'node.png');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` enum('positive','negative') NOT NULL,
  `mensagem` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,'positive','Aulas bem explicadas e diretas'),(2,'positive','Professor atencioso e responde rapido'),(3,'negative','Poucos exemplos praticos no curso'),(4,'negative','Audio poderia ser mais claro');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filtros`
--

DROP TABLE IF EXISTS `filtros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `filtros` (
  `filtcodigo` int(11) NOT NULL AUTO_INCREMENT,
  `filtnome` varchar(100) NOT NULL,
  PRIMARY KEY (`filtcodigo`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filtros`
--

LOCK TABLES `filtros` WRITE;
/*!40000 ALTER TABLE `filtros` DISABLE KEYS */;
INSERT INTO `filtros` VALUES (1,'Business'),(2,'Social Media'),(3,'Analise de Dados'),(4,'Desenvolvedor'),(5,'Desenvolvimento de Jogos'),(6,'Desenvolvimento de Web'),(7,'Desenvolvimento de Software'),(8,'Fotografia');
/*!40000 ALTER TABLE `filtros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progresso`
--

DROP TABLE IF EXISTS `progresso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `progresso` (
  `proid` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `id_aula` int(11) DEFAULT NULL,
  `status` enum('concluido','em andamento','nao iniciado') DEFAULT NULL,
  `minutos_assistidos` int(11) DEFAULT NULL,
  PRIMARY KEY (`proid`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_aula` (`id_aula`),
  CONSTRAINT `progresso_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`usucodigo`),
  CONSTRAINT `progresso_ibfk_2` FOREIGN KEY (`id_aula`) REFERENCES `aula` (`aulaid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progresso`
--

LOCK TABLES `progresso` WRITE;
/*!40000 ALTER TABLE `progresso` DISABLE KEYS */;
INSERT INTO `progresso` VALUES (1,33,1,'em andamento',15),(2,33,1,'concluido',30),(3,33,2,'em andamento',20),(4,33,4,'nao iniciado',0),(5,2,3,'em andamento',30),(6,2,4,'em andamento',30),(9,41,1,'concluido',2000),(11,41,3,'em andamento',20);
/*!40000 ALTER TABLE `progresso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receita_curso`
--

DROP TABLE IF EXISTS `receita_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receita_curso` (
  `curcodigo` int(11) NOT NULL,
  `total` decimal(10,2) DEFAULT 0.00,
  PRIMARY KEY (`curcodigo`),
  CONSTRAINT `receita_curso_ibfk_1` FOREIGN KEY (`curcodigo`) REFERENCES `cursos` (`curcodigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receita_curso`
--

LOCK TABLES `receita_curso` WRITE;
/*!40000 ALTER TABLE `receita_curso` DISABLE KEYS */;
INSERT INTO `receita_curso` VALUES (1,399.80),(2,899.70),(3,799.80),(4,499.80),(5,700.00),(6,300.00);
/*!40000 ALTER TABLE `receita_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_curso`
--

DROP TABLE IF EXISTS `usuario_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario_curso` (
  `usucodigo` int(11) NOT NULL,
  `curcodigo` int(11) NOT NULL,
  PRIMARY KEY (`usucodigo`,`curcodigo`),
  KEY `curcodigo` (`curcodigo`),
  CONSTRAINT `usuario_curso_ibfk_1` FOREIGN KEY (`usucodigo`) REFERENCES `usuarios` (`usucodigo`),
  CONSTRAINT `usuario_curso_ibfk_2` FOREIGN KEY (`curcodigo`) REFERENCES `cursos` (`curcodigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_curso`
--

LOCK TABLES `usuario_curso` WRITE;
/*!40000 ALTER TABLE `usuario_curso` DISABLE KEYS */;
INSERT INTO `usuario_curso` VALUES (2,1),(2,3),(2,5),(3,2),(3,4),(25,1),(25,2),(25,3),(25,6),(33,2),(33,4),(33,5),(33,6);
/*!40000 ALTER TABLE `usuario_curso` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger trg_bloquear_matricula_repetida before insert on usuario_curso for each row if exists (select 1 from usuario_curso where usucodigo = new.usucodigo and curcodigo = new.curcodigo) then signal sqlstate '45000' set message_text = 'usuario ja matriculado neste curso';  
end if */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `usucodigo` int(11) NOT NULL AUTO_INCREMENT,
  `usuemail` varchar(50) DEFAULT NULL,
  `ususenha` varchar(255) NOT NULL,
  `usufoto` varchar(255) DEFAULT NULL,
  `usunome` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`usucodigo`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'joao@gmail.com','123','ai-generated.jpg',NULL),(3,'teste@gmail.com','123','ai-generated.jpg',NULL),(25,'rafael@gmail.com','123','ai-generated.jpg',NULL),(33,'fulano@gmail.com','123','ai-generated.jpg',NULL),(41,'email@email.com','123','ai-generated.jpg','nome'),(42,'jao@gmail.com','123','ai-generated.jpg','meu nome');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `view1_progressos`
--

DROP TABLE IF EXISTS `view1_progressos`;
/*!50001 DROP VIEW IF EXISTS `view1_progressos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `view1_progressos` AS SELECT
 1 AS `usucodigo`,
  1 AS `usuemail`,
  1 AS `curnome`,
  1 AS `total_minutos` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `view2_usuarios_por_categoria`
--

DROP TABLE IF EXISTS `view2_usuarios_por_categoria`;
/*!50001 DROP VIEW IF EXISTS `view2_usuarios_por_categoria`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `view2_usuarios_por_categoria` AS SELECT
 1 AS `catnome`,
  1 AS `total_usuarios` */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `view1_progressos`
--

/*!50001 DROP VIEW IF EXISTS `view1_progressos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view1_progressos` AS select `u`.`usucodigo` AS `usucodigo`,`u`.`usuemail` AS `usuemail`,`c`.`curnome` AS `curnome`,sum(`p`.`minutos_assistidos`) AS `total_minutos` from (((`usuarios` `u` join `progresso` `p` on(`u`.`usucodigo` = `p`.`id_usuario`)) join `aula` `a` on(`p`.`id_aula` = `a`.`aulaid`)) join `cursos` `c` on(`a`.`curcodigo` = `c`.`curcodigo`)) group by `u`.`usucodigo`,`c`.`curcodigo` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view2_usuarios_por_categoria`
--

/*!50001 DROP VIEW IF EXISTS `view2_usuarios_por_categoria`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view2_usuarios_por_categoria` AS select `cat`.`catnome` AS `catnome`,count(distinct `uc`.`usucodigo`) AS `total_usuarios` from ((`categorias` `cat` join `cursos` `c` on(`c`.`catcodigo` = `cat`.`catcodigo`)) join `usuario_curso` `uc` on(`uc`.`curcodigo` = `c`.`curcodigo`)) group by `cat`.`catcodigo` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-28 17:39:33
