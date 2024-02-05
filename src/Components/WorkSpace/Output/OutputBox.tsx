import OutputNavbar from "./InputNavbar";
import Split from "react-split";
import React from 'react';

type Props = {
  output: any;
  onChange: (value: string) => void;
};

export default function PlayGround({ output, onChange }: Props) {
  
  async function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log(event.target.value)
   await onChange(event.target.value || "s");
  }

  return (
    <div className="flex flex-col w-full">
      <OutputNavbar />
      <Split
        className="h-[calc(100vh-114px)]"
        direction="vertical"
        sizes={[60, 40]}
      >
        <div className="">
          
        </div>
        <div className="w-full text-green-700 pt-2 ml-2">
          Output:
         <div>
         <pre style={{color:"GrayText"}}>{output}</pre>
         </div>
        </div>
      </Split>
    </div>
  );
}
