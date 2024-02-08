import React, { useState, createContext } from "react";
import Output from "./Output/OutputBox";
import { InputBox } from "./Playground/Playground";

// Define the type for the context value
interface InputValuesContextType {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const inputValuesContext = createContext<InputValuesContextType>({
  inputValue: "",
  setInputValue: () => {} // Placeholder function
});

const WorkSpace: React.FC = () => {
  const [outputValue, setOutputValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleRunButtonClick = (newOutputValue: string) => {
    setOutputValue(newOutputValue);
  };

  const handleInput = (newInputValue: string) => {
    setInputValue(newInputValue);
  };

  return (
    <div className="flex">
      {/* Provide the correct context value to the Provider */}
      <inputValuesContext.Provider value={{ inputValue, setInputValue }}>
        <InputBox onRunButtonClick={handleRunButtonClick} input={inputValue} />
        <Output onChange={handleInput} output={outputValue} />
      </inputValuesContext.Provider>
    </div>
  );
};

export default WorkSpace;
export { inputValuesContext };
