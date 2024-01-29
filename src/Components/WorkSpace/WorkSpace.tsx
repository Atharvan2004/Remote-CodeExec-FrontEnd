import { useState } from "react";
import Output from "./Output/OutputBox";
import {InputBox} from "./Playground/Playground";

type Props = {};

function WorkSpace({}: Props) {
  const [outputValue, setOutputValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleRunButtonClick = (newOutputValue:any) => {
    setOutputValue(newOutputValue);
  };
  const handleInput = (newInputValue:any) => {
    setInputValue(newInputValue);
  };
  return (
    <div className="flex ">
        <InputBox onRunButtonClick={handleRunButtonClick} input={inputValue}/>
        <Output onChange={handleInput} output={outputValue} />
    </div>
  );
}

export default WorkSpace;
