export type props = {
   title: string,
   color: Colors,
   onClick?: () => any
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

export default function Button(props: props) {

   return <div className={colorMapBG[props.color] + " p-2 w-fit rounded-xl cursor-pointer"} onClick={props.onClick}>
      <p>{props.title}</p>
   </div>
}