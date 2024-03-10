import React, { useState, createContext } from "react";
import Output from "./Output/RoomOutputBox";
import { RoomPlayground } from "./Playground/RoomPlayground";

// Define the type for the context value
interface CodeValuesContextType {
  inputValue: string;
  executionTime: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setExecutionTime: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const CodeValuesContext = createContext<CodeValuesContextType>({
  inputValue: "",
  executionTime: "",
  setInputValue: () => {}, // Placeholder function
  setExecutionTime: () => {}, // Placeholder function
});

const RoomWorkSpace: React.FC = () => {
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
      <CodeValuesContext.Provider
        value={{ inputValue, setInputValue, executionTime, setExecutionTime }}
      >
        <RoomPlayground
          onRunButtonClick={handleRunButtonClick}
          input={inputValue}
        />
        <Output
          onChange={handleInput}
          output={outputValue}
          executionTime={executionTime}
        />
      </CodeValuesContext.Provider>
    </div>
  );
};

export default RoomWorkSpace;
export { CodeValuesContext };
