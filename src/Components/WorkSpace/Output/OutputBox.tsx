import OutputNavbar from "./InputNavbar";
import Split from "react-split";
type Props = {};

export default function PlayGround({}: Props) {
  return (
    <div className="flex flex-col  w-full">
      <OutputNavbar />
      <Split
        className=" h-[calc(100vh-114px)]"
        direction="vertical"
        sizes={[60, 40]}
      >
      <div className=""></div>
        <div className="w-full text-green-700 pt-2 ml-2">
          {/* <textarea wrap="off" autoComplete="off" autoCapitalize="off" spellCheck="false" className="bg-gray-200">

          </textarea> */}
          Output:
          
        </div>
      </Split>
    </div>
  );
}
