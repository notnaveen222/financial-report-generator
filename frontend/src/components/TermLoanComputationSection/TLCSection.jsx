import TextInput from "../TextInput";

const TLCSection = ({ percentageContribution, setPercentageContribution }) => {
  const handleInputChange = (index, field, newValue) => {
    const updatedPercentageContribution = [...percentageContribution.data];
    updatedPercentageContribution[index][field] = newValue;
    setPercentageContribution({
      ...[percentageContribution],
      data: updatedPercentageContribution,
    });
  };
  return (
    <>
      <div className="border border-white text-white rounded-lg px-5 py-2 mx-5 mb-7">
        <div className="text-lg mb-4 underline underline-offset-4">
          % Of Contribution to Margin Money
        </div>
        <div className="flex flex-row flex-wrap w-full">
          {percentageContribution.data.map((data, index) => (
            <div key={index} className="flex flex-wrap items-center">
              <TextInput
                inputType="number"
                placeholder={data.particulars}
                field="percent"
                value={data.percent}
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
            onClick={() => {
              console.log(percentageContribution);
            }}
          >
            Print Data
          </button>
        </div>
      </div>
    </>
  );
};

export default TLCSection;
