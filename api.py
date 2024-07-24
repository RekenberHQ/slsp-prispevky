from fastapi import FastAPI, Request, HTTPException, Header, Depends
import uvicorn
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, JSON, select, String

DATABASE_URL = "postgresql+asyncpg://postgres:xaq2ecg7zty.WRB8cpd@localhost:5432/postgres"
SECRET_TOKEN = "zhn7jvu7gvx_TUX-upy"

# Create the SQLAlchemy engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)

# Create a Base class for the models
Base = declarative_base()

# Define a model for storing webhook data
class WebhookData(Base):
    __tablename__ = "webhook_data"
    id = Column(Integer, primary_key=True, index=True)
    payload = Column(JSON, nullable=False)
    user_id = Column(String, nullable=False, unique=True)

# Create the database tables
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app = FastAPI()

async def verify_token(x_token: str = Header(...)):
    if x_token != SECRET_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.on_event("startup")
async def on_startup():
    await init_db()

@app.post("/")
async def feathery_webhook(request: Request, token: str = Depends(verify_token)):
    payload = await request.json()
    user_id = payload.get("feathery_user_id")
    if not user_id:
        raise HTTPException(status_code=400, detail="user_id is required")

    async with SessionLocal() as session:
        async with session.begin():
            existing_entry = await session.execute(
                select(WebhookData).filter_by(user_id=user_id)
            )
            existing_entry = existing_entry.scalars().first()
            if existing_entry:
                existing_entry.payload = payload
            else:
                new_entry = WebhookData(user_id=user_id, payload=payload)
                session.add(new_entry)
            await session.commit()
    return {"status": "success"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)