import { RotatingLines } from "react-loader-spinner";

function Loader({ text }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-[450px] flex flex-col items-center gap-4 mt-20">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p className="text-slate-700">{text || "Please waiting"}</p>
      </div>
    </div>
  );
}

export default Loader;
