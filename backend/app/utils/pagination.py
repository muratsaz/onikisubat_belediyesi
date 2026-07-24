from typing import Any, Dict, List, Optional


def paginate(
    items: List[Any],
    page: int = 1,
    page_size: int = 10
) -> Dict[str, Any]:
    total = len(items)
    start = (page - 1) * page_size
    end = start + page_size
    return {
        "items": items[start:end],
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": (total + page_size - 1) // page_size,
    }


def get_pagination_params(
    page: Optional[int] = 1,
    page_size: Optional[int] = 10,
) -> Dict[str, int]:
    return {
        "page": max(page, 1),
        "page_size": max(min(page_size, 100), 1),
    }
