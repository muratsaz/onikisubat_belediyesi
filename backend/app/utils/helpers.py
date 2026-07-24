from datetime import datetime
from pathlib import Path
from typing import Any, Dict


def get_timestamp() -> str:
    return datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")


def ensure_directory(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def format_response(data: Any, meta: Dict[str, Any] = None) -> Dict[str, Any]:
    response = {
        "data": data,
        "timestamp": get_timestamp(),
    }
    if meta is not None:
        response["meta"] = meta
    return response
