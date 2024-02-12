/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputValuesNavbar } from "./InputNavbar";
import Split from "react-split";

type Props = {
  output: any;
  onChange: (value: string) => void;
};

export default function PlayGround({ output }: Props) {
  return (
    <div className="flex flex-col w-full">
      <Split
        className="h-[calc(100vh-114px)]"
        direction="vertical"
        sizes={[50, 50]}
        minSize={100}
      >
        <div className="">
          <InputValuesNavbar />
        </div>
        <div className="w-full text-green-700 pt-2 pl-2">
          Output:
          <div>
            <pre style={{ color: "GrayText", paddingTop: "4px" }}>{output}</pre>
          </div>
        </div>
      </Split>
    </div>
  );
}
