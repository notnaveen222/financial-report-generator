import { useState } from "react";

export default function useStateForm() {
  const [landData, setLandData] = useState({
    data: [
      {
        particulars: "",
        area: "",
        cost: "",
      },
    ],
    units: {
      area: "Sq-Ft",
      cost: "Rs Lakhs",
    },
  });
  const [buildingData, setBuildingData] = useState({
    data: [
      {
        particulars: "",
        area: "",
        cost: "",
      },
    ],
    units: {
      area: "Sq-Ft",
      cost: "Rs Lakhs",
    },
  });
  const [equipmentData, setEquipmentData] = useState({
    data: [
      {
        particulars: "",
        cost: "",
      },
    ],
  });
  const [furnitureData, setFurnitureData] = useState({
    data: [
      {
        particulars: "",
        cost: "",
      },
    ],
  });
  const [electricData, setElectricData] = useState({
    data: [
      {
        particulars: "",
        cost: "",
      },
    ],
  });
  const [otherAssetsData, setOtherAssetsData] = useState({
    data: [
      {
        particulars: "",
        cost: "",
      },
    ],
  });
  const [preOperativeExpenseData, setPreOperativeExpenseData] = useState({
    data: [
      {
        particulars: "",
        cost: "",
      },
    ],
  });

  return {
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
  };
}
