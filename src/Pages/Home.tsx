import Navbar from "../Components/Navbars/Navbar";
import WorkSpace from "../Components/WorkSpace/WorkSpace";

type Props = {};

export default function Home({}: Props) {
  return (
    <div>
      <Navbar/>
      <WorkSpace />
    </div>
  );
}
