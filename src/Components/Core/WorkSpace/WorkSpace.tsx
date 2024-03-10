import React, { useState, createContext } from "react";
import Output from "./Output/OutputBox";
import { Playground } from "./Playground/Playground";

// Define the type for the context value
interface InputValuesContextType {
  inputValue: string;
  executionTime: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setExecutionTime: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const inputValuesContext = createContext<InputValuesContextType>({
  inputValue: "",
  executionTime: "",
  setInputValue: () => {}, // Placeholder function
  setExecutionTime: () => {}, // Placeholder function
});

const WorkSpace: React.FC = () => {
  const [outputValue, setOutputValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [executionTime, setExecutionTime] = useState("");

  const handleRunButtonClick = (
    newOutputValue: string,
    newExecutionTime: string
  ) => {
    setOutputValue(newOutputValue);
    setExecutionTime(newExecutionTime);
  };

  const handleInput = (newInputValue: string) => {
    setInputValue(newInputValue);
  };

  return (
    <div className="flex">
      {/* Provide the correct context value to the Provider */}
      <inputValuesContext.Provider
        value={{ inputValue, setInputValue, executionTime, setExecutionTime }}
      >
        <Playground
          onRunButtonClick={handleRunButtonClick}
          input={inputValue}
        />
        <Output
          onChange={handleInput}
          output={outputValue}
          executionTime={executionTime}
        />
      </inputValuesContext.Provider>
    </div>
  );
};

export default WorkSpace;
export { inputValuesContext };
