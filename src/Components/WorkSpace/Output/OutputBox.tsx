/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputValuesNavbar } from "./InputNavbar";
import Split from "react-split";
import { useEffect } from "react";

type Props = {
  output: any;
  onChange: (value: string) => void;
  executionTime: string;
};

export default function PlayGround({ output,executionTime }: Props) {
  useEffect(() => {
    const gutterElement:any = document.querySelector('.gutter.gutter-vertical');
    if (gutterElement) {
      gutterElement.style.zIndex = '10';
      gutterElement.style.position = 'relative'
    }
  }, []);
  return (
    <div className="flex flex-col w-full overflow-scroll">
      <Split
        className="h-[calc(100vh-114px)]"
        direction="vertical"
        sizes={[50, 50]}
        minSize={100}
      >
        <div className="top-parent-div" style={{position:"relative"}}>
          <InputValuesNavbar />
        </div>
        <div className="w-full text-green-700 pt-2 pl-2">
          Output:
          <div>
            <pre style={{ color: "GrayText", paddingTop: "6px" }}>{executionTime}</pre>
          </div>
          <div>
            <pre style={{ color: "GrayText", paddingTop: "6px" }}>{output}</pre>
          </div>
        </div>
      </Split>
    </div>
  );
}
