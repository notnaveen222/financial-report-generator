import TextInput from "../TextInput";

const LandSection = ({ landData, setLandData }) => {
  const handleInputChange = (index, field, newValue) => {
    const updatedLandData = [...landData.data];
    updatedLandData[index][field] = newValue;

    setLandData({ ...landData, data: updatedLandData });
  };
  const handleAdd = () => {
    setLandData({
      ...landData,
      data: [...landData.data, { particulars: "", area: "", cost: "" }],
    });
  };
  return (
    <>
      <div className="border border-white text-white rounded-lg px-5 py-2 mx-5 mb-7">
        <div className="text-lg mb-4 underline underline-offset-4">
          Land Data Input
        </div>
        <div className="flex flex-col w-full">
          {landData.data.map((data, index) => (
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
                placeholder="Area"
                field="area"
                value={data.area}
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
              console.log(landData);
            }}
          >
            Print Data
          </button>
        </div>
      </div>
    </>
  );
};

export default LandSection;
