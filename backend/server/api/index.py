from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Dict, List, Any
from vercel_fastapi import VercelFastAPI
import sys
import os

# Ensure the parent directory is in sys.path for imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from sheet_utils.main import generate_excel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DataModel(BaseModel):
    ssa_data: List[List[Any]]
    ssb_data: List[List[Any]]
    ssc_data: List[List[Any]]
    ssc1_data: List[List[Any]]
    ssc2_data: List[List[Any]]
    ssc3_data: List[List[Any]]
    ssd_data: List[List[Any]]

class LandItem(BaseModel):
    particulars: str
    area: str
    cost: str

class LandUnits(BaseModel):
    area: str
    cost: str

class LandData(BaseModel):
    data: List[LandItem]
    units: LandUnits

class ItemWithArea(BaseModel):
    particulars: str
    area: str
    cost: str

class ItemWithoutArea(BaseModel):
    particulars: str
    cost: str

class Units(BaseModel):
    area: str
    cost: str

class WithUnits(BaseModel):
    data: List[ItemWithArea]
    units: Units

class WithoutUnits(BaseModel):
    data: List[ItemWithoutArea]

class Payload(BaseModel):
    landData: WithUnits
    buildingData: WithUnits
    equipmentData: WithoutUnits
    furnitureData: WithoutUnits
    electricData: WithoutUnits
    otherAssetsData: WithoutUnits
    preOperativeExpenseData: WithoutUnits
    msg: str

@app.get("/")
def root():
    return {"message": "Welcome to root backend dir"}

@app.post("/generate-report")
def generate_report(data: DataModel):
    print(data)

@app.post("/generate")
def gen_rep(payload: Payload):
    payload_dict = payload.dict()
    file_path = generate_excel(payload_dict)
    return FileResponse(
        path=file_path,
        filename="final_report.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

# Wrap the app for Vercel
app = VercelFastAPI(app) 