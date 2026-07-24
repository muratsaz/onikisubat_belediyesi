from typing import Any, Dict


def success_response(data: Any, message: str = "İşlem başarılı.") -> Dict[str, Any]:
    return {
        "success": True,
        "message": message,
        "data": data,
    }


def error_response(message: str, errors: Any = None) -> Dict[str, Any]:
    payload = {
        "success": False,
        "message": message,
    }
    if errors is not None:
        payload["errors"] = errors
    return payload
