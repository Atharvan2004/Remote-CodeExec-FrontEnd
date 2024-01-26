import Output from "./Output/OutputBox";
import InputBox from "./Playground/Playground";

type Props = {};

function WorkSpace({}: Props) {
  return (
    <div className="flex ">
        <InputBox/>
        <Output/>
    </div>
  );
}

export default WorkSpace;