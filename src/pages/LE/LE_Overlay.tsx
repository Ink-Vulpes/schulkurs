import useGlobal, { PageEnum } from "@/utils/useGlobal"
import LE_1 from "./LE_1"
import Button, { Colors } from "@/components/Button"
import LE_2 from "./LE_2"
import LE_3 from "./LE_3"

const LEMap: Record<number, React.JSX.Element> = {
   [1]: <LE_1 />,
   [2]: <LE_2 />,
   [3]: <LE_3 />
}

export const LETitleMap: Record<number, string> = {
   [1]: "Was ist ein Vektor?",
   [2]: "Rechnen mit Vektoren. (1)",
   [3]: "Eine Gerade im dreidimensionalen Raum."
}

export default function LE() {
   const setPage = useGlobal((state) => state.setPage);
   const le = useGlobal((state) => state.LE);
   const title = useGlobal((state) => state.LE_title);

   return <div className="h-full overflow-scroll overflow-x-hidden">
      <div className="flex items-center gap-2">
         <Button title="Zurück" color={Colors.RED} onClick={() => setPage(PageEnum.HOME)} />
         <p className="flex-1 min-w-0 text-center text-2xl font-bold">{title}</p>
      </div>
      <div className="mt-2">
         {LEMap[le]}
      </div>
   </div>
}