import logging
from logging.handlers import RotatingFileHandler
from pathlib import Path


LOG_DIR = Path("./logs")
LOG_DIR.mkdir(parents=True, exist_ok=True)

logger = logging.getLogger("onikisubat")
logger.setLevel(logging.INFO)

file_handler = RotatingFileHandler(
    LOG_DIR / "app.log",
    maxBytes=10 * 1024 * 1024,
    backupCount=5,
    encoding="utf-8"
)
file_handler.setFormatter(
    logging.Formatter(
        "%(asctime)s - %(levelname)s - %(name)s - %(message)s"
    )
)
logger.addHandler(file_handler)


def setup_logging():
    if not logger.handlers:
        logger.addHandler(file_handler)
    return logger
