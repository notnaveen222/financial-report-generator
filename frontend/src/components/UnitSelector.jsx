import React from "react";

const UnitSelector = ({ options, selectedUnit, handleUnitChange }) => {
  return (
    <div className="flex gap-4 mb-3">
      {options.map((unit) => (
        <div
          key={unit}
          onClick={() => handleUnitChange(unit)}
          className={`cursor-pointer px-3 py-2 border rounded-lg ${
            selectedUnit === unit
              ? "bg-green-500 text-white"
              : "bg-white text-black"
          }`}
        >
          {unit}
        </div>
      ))}
    </div>
  );
};

export default UnitSelector;
