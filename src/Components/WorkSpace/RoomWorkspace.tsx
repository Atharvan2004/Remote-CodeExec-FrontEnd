import React, { useState, createContext } from "react";
import Output from "./Output/OutputBox";
import { RoomPlayground } from "./Playground/RoomPlayground";

// Define the type for the context value
interface CodeValuesContextType {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const CodeValuesContext = createContext<CodeValuesContextType>({
  inputValue: "",
  setInputValue: () => {}, // Placeholder function
});

const RoomWorkSpace: React.FC = () => {
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
      <CodeValuesContext.Provider value={{ inputValue, setInputValue}}>
        <RoomPlayground onRunButtonClick={handleRunButtonClick} input={inputValue} />
        <Output onChange={handleInput} output={outputValue} />
      </CodeValuesContext.Provider>
    </div>
  );
};

export default RoomWorkSpace;
export { CodeValuesContext };
