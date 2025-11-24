from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "NASA APOD Explorer API is up and running!"}
