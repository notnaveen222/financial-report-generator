import TextInput from "../TextInput";
const OtherAssetsSection = ({ otherAssetsData, setOtherAssetsData }) => {
  const handleInputChange = (index, field, newValue) => {
    const updatedOtherAssetsData = [...otherAssetsData.data];
    updatedOtherAssetsData[index][field] = newValue;
    setOtherAssetsData({
      ...otherAssetsData,
      data: updatedOtherAssetsData,
    });
  };
  const handleAdd = () => {
    setOtherAssetsData({
      ...otherAssetsData,
      data: [...otherAssetsData.data, { particulars: "", cost: "" }],
    });
  };
  return (
    <>
      <div className="border border-white text-white rounded-lg px-5 py-2 mx-5 mb-7">
        <div className="text-lg mb-4 underline underline-offset-4">
          Other Assets Data Input
        </div>
        <div className="flex flex-col w-full">
          {otherAssetsData.data.map((data, index) => (
            <div key={index} className="flex flex-wrap items-center">
              <TextInput
                inputType="text"
                placeholder="Particulars"
                field="particulars"
                value={data.particulars}
                onChange={(field, value) =>
                  handleInputChange(index, field, value)
                }
              />
              <TextInput
                inputType="number"
                placeholder="Cost"
                field="cost"
                value={data.cost}
                onChange={(field, value) =>
                  handleInputChange(index, field, value)
                }
              />
            </div>
          ))}
        </div>
        <div className="flex mt-4 mb-4 ml-2">
          <button
            className="cursor-pointer border border-white px-3 py-2 rounded-lg mr-4"
            onClick={handleAdd}
          >
            {" "}
            + Add More
          </button>
          <button
            className="cursor-pointer border border-white px-3 py-2 rounded-lg mr-4"
            onClick={() => {
              console.log(otherAssetsData);
            }}
          >
            Print Data
          </button>
        </div>
      </div>
    </>
  );
};

export default OtherAssetsSection;
