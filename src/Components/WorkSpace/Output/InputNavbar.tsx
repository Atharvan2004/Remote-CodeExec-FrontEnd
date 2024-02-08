import { useContext } from "react";
import { inputValuesContext } from "../WorkSpace";


function InputValuesNavbar() {

  const {setInputValue} = useContext(inputValuesContext)
  function handleChange(event:any){
    setInputValue(event.target.value||"")
  }

  return (
    <div>
      <div className="flex justify-between h-11 w-full items-center pt-2 bg-slate-200 text-green-700">
        <div
          className={
            "bg-white rounded-t-[5px] px-5 py-[10px] text-s cursor-pointer"
          }
        >
          Inputs 
        </div>
        <button className="bg-white rounded-md  px-4 py-[8px] mr-4 mb-2 text-xs cursor-pointer text-green-700 border-2 border-slate-300">
          Clear
        </button>
      </div>
      <div className="inputValues div">
        <textarea onChange={handleChange}></textarea>
      </div>
    </div>
  );
}

export {InputValuesNavbar};
