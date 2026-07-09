import { create3DBoard, DefaultBoard } from "@/utils/jsxGraphConfigs";
import { Vector, type VecT } from "@/utils/math";
import { JSXGraph } from "jsxgraph";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export default function LE_3() {

   useEffect(() => {
      const { board, view } = create3DBoard("box_1", [0, 10]);
      const p1 = view.create("point3d", [[]])
   }, [])

   return <div>
      <p>In der Geometrie ist eine Gerade ein unendlich dünne Linie, die in beiden Richtungen keine Begrenzung hat. Sie kann in mehreren Formen dargestellt werden.</p>
      <p className="mt-2 font-bold text-red-950">Parameterform.</p>
      <div className="flex gap-2 min-w-0 flex-1">
         <div className="w-2/3">
            <ReactMarkdown
               remarkPlugins={[remarkMath]}
               rehypePlugins={[rehypeKatex]}
            >
               {
                  `
                  
                  `
               }
            </ReactMarkdown>
         </div>
         <div className="w-1/3">
            <div id="box_1" className="ml-auto w-100 aspect-square" />
         </div>
      </div>
   </div>
}