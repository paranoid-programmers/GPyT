import logging

logger = logging.getLogger(__name__)
handler = logging.StreamHandler()
handler.setFormatter(
    fmt=logging.Formatter(
        "[%(asctime)s][%(levelname)s][%(filename)s:%(lineno)d][%(funcName)s]: %(message)s"
    )
)
handler.setLevel(logging.DEBUG)
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)
