import clsx from "clsx";

const CustomChip = ({ label }: any) => {
  const getColors = (status: any) => {
    switch (status) {
      case "pending":
        return "bg-[#FFD192]";
      case "confirmed":
        return "bg-[#91FE87]";
      case "cancelled":
        return "bg-[#FF7875]";

      default:
        return "bg-[#91FE87]";
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div
        className={clsx(
          getColors(label),
          "py-1 rounded-2xl font-semibold px-[12px] min-w-[70px] text-center"
        )}
      >
        {label}
      </div>
    </div>
  );
};

export default CustomChip;
