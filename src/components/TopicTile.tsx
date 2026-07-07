import useGlobal from "@/utils/useGlobal";

export type Props = {
   title: string,
   color: Colors,
   desc: string,
   LE: number
}
export enum Colors {
   RED,
   BLUE,
   GREEN
}

const colorMapBG: Record<Colors, string> = {
   [Colors.RED]: "bg-red-300",
   [Colors.BLUE]: "bg-blue-300",
   [Colors.GREEN]: "bg-green-300"
}


export default function TopicTile(props: Props) {
   const setLE = useGlobal((state) => (state.set_LE));

   return <div
      className={colorMapBG[props.color] + " h-fit w-60 aspect-square rounded-xl cursor-pointer p-3"}
      onClick={() => (setLE(props.LE))}
   >
      <p className="text-lg font-bold">{props.title}</p>
      <p className="mt-2">{props.desc}</p>
   </div>
}