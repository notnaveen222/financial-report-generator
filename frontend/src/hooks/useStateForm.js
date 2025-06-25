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
  // Term Loan Computation Data
  const [percentageContribution, setPercentageContribution] = useState({
    data: [
      {
        particulars: "Land",
        percent: "",
      },
      {
        particulars: "Building",
        percent: "",
      },
      {
        particulars: "Plant & Equipments",
        percent: "",
      },
      {
        particulars: "Furniture & Fittings",
        percent: "",
      },
      {
        particulars: "Electrical Fittings",
        percent: "",
      },
      {
        particulars: "Other Fixed Assets",
        percent: "",
      },
      {
        particulars: "Preoperative Assets",
        percent: "",
      },
    ],
  });
  const [constructionPeriodData, setConstructionPeriodData] = useState({
    interest: "",
    cod: "",
    withdrawnPecentage: {},
  });

  const [estimatedRevenueData, setEstimatedRevenueData] = useState({
    data: [
      {
        //derived data has operations + derived from inside the dict
        name: "",
        uom: "",
        value: "",
        isDerived: false,
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
    percentageContribution,
    setPercentageContribution,
    constructionPeriodData,
    setConstructionPeriodData,
    estimatedRevenueData,
    setEstimatedRevenueData,
  };
}
