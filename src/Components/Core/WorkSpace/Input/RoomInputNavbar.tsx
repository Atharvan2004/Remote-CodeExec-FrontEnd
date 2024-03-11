/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { CodeValuesContext } from "../RoomWorkspace";

function InputValuesNavbar() {
  const { inputValue, setInputValue } = useContext(CodeValuesContext);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value || "");
  }

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <>
      <div className="flex justify-between w-full items-center pt-2 bg-slate-200 text-green-700">
        <div
          className={
            "bg-white rounded-t-[5px] px-5 py-[10px] text-s cursor-pointer"
          }
        >
          Inputs
        </div>
        <button
          onClick={handleClear}
          className="bg-white rounded-md px-4 py-[8px] mr-4 mb-2 text-xs cursor-pointer text-green-700 border-2 border-slate-300"
        >
          Clear
        </button>
      </div>
      <div
        className=" w-full"
        style={{ zIndex: "0", position: "absolute", height: "95%" }}
      >
        <textarea
          value={inputValue}
          onChange={handleChange}
          className="w-full p-2 h-full"
          style={{
            resize: "none",
            zIndex: "0",
            outline: "none",
            height: "calc(100% - 40px)",
          }}
        ></textarea>
      </div>
    </>
  );
}

export { InputValuesNavbar };
