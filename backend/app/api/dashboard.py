from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import require_admin
from app.database.database import get_db
from app.schemas.dashboard import DashboardResponse
from app.services.dashboard_service import get_dashboard_data

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/", response_model=DashboardResponse)
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return get_dashboard_data(db)