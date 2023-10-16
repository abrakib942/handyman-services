import SummaryCard from "./SummaryCard";

const SummarySection = () => {
  const summaries = [
    {
      id: 1,

      number: 12340,
      text: "HAPPY CLIENTS",
    },
    {
      id: 2,

      number: 3455,
      text: "COMPLETED PROJECTS",
    },
    {
      id: 3,

      number: 2356,
      text: "COMPLETED PROJECTS",
    },
    {
      id: 4,

      number: 893,
      text: "HANDYMAN",
    },
  ];

  return (
    <div className="mb-16 px-10 md:px-20 bg-[#E3F1FF] py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaries?.map((summary) => (
          <SummaryCard key={summary.id} summary={summary}></SummaryCard>
        ))}
      </div>
    </div>
  );
};

export default SummarySection;
