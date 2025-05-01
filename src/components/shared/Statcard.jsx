import { BsThreeDotsVertical } from "react-icons/bs";
import Spinner from "../shared/Spinner"

const StatCard = ({ title, value, bgColor, icon, loading }) => {
  return (
    <div className="h-full">
      <div
        className="h-full rounded-lg shadow-md p-6 relative"
        style={{ backgroundColor: bgColor }}
      >
        <div className="absolute top-2 right-2">
          <button className="p-1 hover:bg-black hover:bg-opacity-10 rounded-full">
            <BsThreeDotsVertical />
          </button>
        </div>
        <div className="flex items-center opacity-70 uppercase font-medium tracking-wider text-sm">
          {icon}
          <span className="ml-2">{title}</span>
        </div>
        <div className="text-5xl font-light mt-4">
            {loading ? <Spinner/> : value}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
