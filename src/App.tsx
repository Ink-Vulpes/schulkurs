import "./index.css";
import Home from "./pages/Home";
import LE_Overlay from "./pages/LE/LE_Overlay";
import useGlobal, { PageEnum } from "./utils/useGlobal";

export const PageMap: Record<PageEnum, React.JSX.Element> = {
   [PageEnum.HOME]: <Home />,
   [PageEnum.LE]: <LE_Overlay />
}

export function App() {
   const page = useGlobal((state) => state.page);

   return (
      <div className="m-[2vh] p-8 bg-[#dadada] h-[96vh] rounded-xl drop-shadow-2xl">
         {PageMap[page]}
      </div>
   );
}

export default App;

