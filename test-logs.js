const { logger, logtail } = require("./utils/logger");

logger.info("Servidor iniciado com sucesso!");
logger.error("Erro simulado para teste", { code: 500, context: "startup" });

(async () => {
  await logtail.flush();
  process.exit(0);
})();
