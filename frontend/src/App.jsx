import { useState } from "react";
import "./App.css";
import LandSection from "./components/LandSection/LandSection";
import BuildingSection from "./components/BuildingSection/BuildingSection";
import useStateForm from "./hooks/useStateForm";
import EquipmentSection from "./components/EquipmentsSection/EquipmentSection";
import FurnitureSection from "./components/FurnitureSection/FurnitureSection";
import ElectricalSection from "./components/Electrical&OtherAssetsSection/ElectricalSection";
import OtherAssetsSection from "./components/Electrical&OtherAssetsSection/OtherAssetsSection";
import PreOperativeSection from "./components/PreOperativeSection/PreOperativeSection";

function App() {
  const {
    landData,
    setLandData,
    buildingData,
    setBuildingData,
    equipmentData,
    setEquipmentData,
    furnitureData,
    setFurnitureData,
    electricData,
    setElectricData,
    otherAssetsData,
    setOtherAssetsData,
    preOperativeExpenseData,
    setPreOperativeExpenseData,
  } = useStateForm();
  const handleTempSubmit = async () => {
    const payload = {
      landData: landData,
      buildingData: buildingData,
      equipmentData: equipmentData,
      furnitureData: furnitureData,
      electricData: electricData,
      otherAssetsData: otherAssetsData,
      preOperativeExpenseData: preOperativeExpenseData,
      msg: "payload",
    };
    console.log(payload);
    try {
      const response = await fetch(
        "https://financial-report-generator-backend.vercel.app/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "final_report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };
  // const handleDataSubmit = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/generate-report", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "final_report.xlsx");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Error generating report:", error);
  //   }
  // };
  // const formatTriple = (data) =>
  //   data.map((item) => [
  //     item.particulars,
  //     parseFloat(item.area),
  //     parseFloat(item.cost),
  //   ]);

  // const formatDouble = (data) =>
  //   data.map((item) => [item.particulars, parseFloat(item.cost)]);
  // const payload = {
  //   ssa_data: formatTriple(landData.data),
  //   ssb_data: formatTriple(buildingData.data),
  //   ssc_data: formatDouble(equipmentData.data),
  //   ssc1_data: formatDouble(furnitureData.data),
  //   ssc2_data: formatDouble(electricData.data),
  //   ssc3_data: formatDouble(otherAssetsData.data),
  //   ssd_data: formatDouble(preOperativeExpenseData.data),
  // };
  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/generate-report", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "final_report.xlsx");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Error generating report:", error);
  //   }
  // };

  return (
    <>
      <div className="text-white mb-10 text-2xl h-16 flex items-center px-10 border-b">
        Report Input
      </div>
      <div className=" text-white px-5 py-2 mx-5">
        {/* have to handle Delete row, Empty Row */}
        <LandSection landData={landData} setLandData={setLandData} />
        <BuildingSection
          buildingData={buildingData}
          setBuildingData={setBuildingData}
        />
        <EquipmentSection
          equipmentData={equipmentData}
          setEquipmentData={setEquipmentData}
        />
        <FurnitureSection
          furnitureData={furnitureData}
          setFurnitureData={setFurnitureData}
        />
        <ElectricalSection
          electricData={electricData}
          setElectricData={setElectricData}
        />
        <OtherAssetsSection
          otherAssetsData={otherAssetsData}
          setOtherAssetsData={setOtherAssetsData}
        />
        <PreOperativeSection
          preOperativeExpenseData={preOperativeExpenseData}
          setPreOperativeExpenseData={setPreOperativeExpenseData}
        />
        <div className="flex w-full justify-end">
          <button
            className="cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in border border-white px-3 py-2 rounded-lg mr-5 mb-10"
            onClick={handleTempSubmit}
          >
            Submit Data
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

function Input() {
  return (
    <input
      className=" no-spinner border rounded-lg h-10 px-3 border-white focus:ring-1 transition-all duration-150 ring-0 focus:ring-white focus:ring-offset-1 focus:outline-none my-2 mx-2"
      placeholder={placeholder}
      type={inputType}
      value={value}
      step="0.01"
      onChange={(e) => onChange(field, e.target.value)}
    />
  );
}
