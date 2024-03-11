/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { InputValuesNavbar } from "../Input/RoomInputNavbar";
import Split from "react-split";

type Props = {
  output: any;
  onChange: (value: string) => void;
  executionTime: string;
};

export default function PlayGround({ output, executionTime }: Props) {
  useEffect(() => {
    const gutterElement:any = document.querySelector('.gutter.gutter-vertical');
    if (gutterElement) {
      gutterElement.style.zIndex = '10';
      gutterElement.style.position = 'relative'
    }
  }, []);
  return (
    <div className="flex flex-col w-full">
      <Split
        className="h-[calc(100vh-70px)]"
        direction="vertical"
        sizes={[50, 50]}
        minSize={100}
      >
        <div className="top-parent-div" style={{position:"relative"}}>
          <InputValuesNavbar  />
        </div>
        <div className="w-full text-green-700 pt-2 pl-2 overflow-scroll">
          Output:
          <div>
            <pre style={{ color: "Red", paddingTop: "6px" }}>{executionTime}</pre>
          </div>
          <div>
            <pre style={{ color: "GrayText", paddingTop: "4px" }}>{output}</pre>
          </div>
        </div>
      </Split>
    </div>
  );
}
