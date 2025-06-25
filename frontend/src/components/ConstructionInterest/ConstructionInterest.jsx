import React from "react";
import TextInput from "../TextInput";
import { getMonthsByFinancialYear } from "../../utils/dataUtils";

const ConstructionInterest = ({
  constructionPeriodData,
  setConstructionPeriodData,
}) => {
  const handleFieldInput = (field, value) => {
    setConstructionPeriodData({
      ...constructionPeriodData,
      [field]: value,
    });
  };

  const handleWithdrawnChange = (year, month, value) => {
    setConstructionPeriodData((prev) => {
      const updated = { ...prev.withdrawnPercentage };
      if (!updated[year]) updated[year] = {};
      updated[year][month] = value;
      return {
        ...prev,
        withdrawnPercentage: updated,
      };
    });
  };

  const monthsByFY = constructionPeriodData.cod
    ? getMonthsByFinancialYear(constructionPeriodData.cod)
    : {};

  return (
    <div className="border border-white text-white rounded-lg px-5 py-4 mx-5 mb-7">
      <div className="text-lg mb-4 underline underline-offset-4">
        Interest During Construction Period
      </div>

      <div className="flex flex-row w-full">
        <div className="w-2/3 flex items-center gap-x-10">
          <div>
            <TextInput
              placeholder="Interest Rate"
              inputType="number"
              field="interest"
              value={constructionPeriodData.interest || ""}
              onChange={handleFieldInput}
            />
          </div>
          <div className="flex border border-white rounded-lg px-3 py-2 gap-x-2 items-center">
            <div className="text-white">COD Date:</div>
            <TextInput
              placeholder="COD Date"
              inputType="date"
              field="cod"
              value={constructionPeriodData.cod || ""}
              onChange={handleFieldInput}
            />
          </div>
        </div>
      </div>

      {constructionPeriodData.cod && (
        <div className="mt-6 text-white">
          <div className="text-lg mb-5">
            Enter the money withdrawn per month in that respective financial
            year
          </div>
          {Object.entries(monthsByFY).map(([year, months]) => (
            <div key={year} className="mb-6">
              <div className="font-semibold mb-2">{year}</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {months.map((month) => (
                  <TextInput
                    key={`${year}-${month}`}
                    placeholder={`${month} ${year}`}
                    inputType="number"
                    field={`${year}-${month}`} // used just for identification; not stored
                    value={
                      constructionPeriodData.withdrawnPercentage?.[year]?.[
                        month
                      ] || ""
                    }
                    onChange={(f, value) =>
                      handleWithdrawnChange(year, month, value)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex mt-4 mb-4 ml-2">
        <button
          className="cursor-pointer border border-white px-3 py-2 rounded-lg mr-4"
          onClick={() => {
            console.log(constructionPeriodData);
          }}
        >
          Print Data
        </button>
      </div>
    </div>
  );
};

export default ConstructionInterest;
