// EstimatedRevenueSection.jsx
import React, { useState, useEffect } from "react";
import TextInput from "../TextInput";

//note
//add debounce for operations performed on derived value

const EstimatedRevenueSection = ({
  estimatedRevenueData,
  setEstimatedRevenueData,
}) => {
  const handleChange = (index, field, value) => {
    const updated = [...estimatedRevenueData.data];
    updated[index][field] = value;
    setEstimatedRevenueData({ ...estimatedRevenueData, data: updated });
  };

  const handleAddNormal = () => {
    setEstimatedRevenueData({
      ...estimatedRevenueData,
      data: [
        ...estimatedRevenueData.data,
        { name: "", uom: "", value: "", isDerived: false },
      ],
    });
  };

  const handleAddDerived = () => {
    setEstimatedRevenueData({
      ...estimatedRevenueData,
      data: [
        ...estimatedRevenueData.data,
        {
          name: "",
          uom: "",
          dependsOn: [],
          operation: "",
          isDerived: true,
        },
      ],
    });
  };

  useEffect(() => {
    const newData = estimatedRevenueData.data.map((item) => {
      if (!item.isDerived) return item;

      try {
        const depValues = item.dependsOn
          ?.map((depName) => {
            const dep = estimatedRevenueData.data.find(
              (d) => !d.isDerived && d.name.trim() === depName
            );
            return parseFloat(dep?.value || 0);
          })
          .filter((v) => !isNaN(v));

        if (!depValues || depValues.length === 0) {
          return { ...item, value: "" };
        }

        let result = depValues.reduce((acc, val) => acc * val, 1);

        if (item.operation?.trim()) {
          result = Function("x", `return x ${item.operation}`)(result);
        }

        // Only update if value actually changed
        if (item.value !== result.toFixed(2)) {
          return { ...item, value: result.toFixed(2) };
        }

        return item;
      } catch (err) {
        console.warn("Calculation error:", err);
        return { ...item, value: "" };
      }
    });

    // Only update state if anything changed
    const dataChanged =
      JSON.stringify(newData) !== JSON.stringify(estimatedRevenueData.data);
    if (dataChanged) {
      setEstimatedRevenueData({ data: newData });
    }
  }, [
    // Watch only relevant values
    estimatedRevenueData.data.map((i) => i.value).join(","),
    estimatedRevenueData.data.map((i) => i.dependsOn?.join(",")).join(";"),
    estimatedRevenueData.data.map((i) => i.operation).join(","),
  ]);
  return (
    <div className="border border-white text-white rounded-lg px-5 py-2 mx-5 mb-7">
      <div className="text-lg mb-4 underline underline-offset-4">
        Estimated Revenue Inputs
      </div>
      <div className="flex flex-col w-full">
        {estimatedRevenueData.data.map((item, index) => (
          <div key={index} className="flex flex-wrap items-center">
            <TextInput
              inputType="text"
              placeholder="Name"
              field="name"
              value={item.name}
              onChange={(field, value) => handleChange(index, field, value)}
            />
            <TextInput
              inputType="text"
              placeholder="UOM"
              field="uom"
              value={item.uom}
              onChange={(field, value) => handleChange(index, field, value)}
            />
            {!item.isDerived ? (
              <TextInput
                inputType="number"
                placeholder="Value"
                field="value"
                value={item.value}
                onChange={(field, value) => handleChange(index, field, value)}
              />
            ) : (
              <>
                <select
                  multiple
                  value={item.dependsOn || []}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "dependsOn",
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                  className="border rounded-lg px-3 py-2 my-2 mx-2 text-black"
                >
                  {estimatedRevenueData.data
                    .filter(
                      (input) => !input.isDerived && input.name.trim() !== ""
                    )
                    .map((input, i) => (
                      <option key={i} value={input.name}>
                        {input.name}
                      </option>
                    ))}
                </select>
                <TextInput
                  inputType="text"
                  placeholder="Operation (e.g. /100)"
                  field="operation"
                  value={item.operation}
                  onChange={(field, value) => handleChange(index, field, value)}
                />
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex mt-4 mb-4 ml-2">
        <button
          className="cursor-pointer border border-white px-3 py-2 rounded-lg mr-4"
          onClick={handleAddNormal}
        >
          + Add Normal Input
        </button>
        <button
          className="cursor-pointer border border-white px-3 py-2 rounded-lg mr-4"
          onClick={handleAddDerived}
        >
          + Add Derived Input
        </button>
        <button
          className="cursor-pointer border border-white px-3 py-2 rounded-lg mr-4"
          onClick={() => {
            console.log(estimatedRevenueData);
          }}
        >
          Print Data
        </button>
      </div>
    </div>
  );
};

export default EstimatedRevenueSection;
