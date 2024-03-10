/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputValuesNavbar } from "../Input/InputNavbar";
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
        className="h-[calc(100vh-75px)]"
        direction="vertical"
        sizes={[50, 50]}
        minSize={100}
      >
        <div style={{position:"relative"}}>
          <InputValuesNavbar />
        </div>
        <div className="w-full  text-green-700 pt-3 pl-2 pr-2 overflow-scroll">
          Output:
          <div>
            <pre style={{ color: "Blue", paddingTop: "6px" }}>{executionTime}</pre>
          </div>
          <div>
            <pre style={{ color: "GrayText", paddingTop: "6px", whiteSpace: "pre-wrap"  }}>{output}</pre>
          </div>
        </div>
      </Split>
    </div>
  );
}
