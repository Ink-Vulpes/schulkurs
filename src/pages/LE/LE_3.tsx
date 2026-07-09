import { create3DBoard, DefaultBoard, PointNoTitle3D } from "@/utils/jsxGraphConfigs";
import { RelativPoint, Vector, vector_from_arrow_3d, vector_from_point, type VecT } from "@/utils/math";
import { JSXGraph } from "jsxgraph";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export default function LE_3() {

   const [para_point_v, set_para_point_v] = useState(new Vector<3>([5, 5, 5]));
   const [para_dir_v, set_para_dir_v] = useState(new Vector<3>([1, 0, 0]));

   useEffect(() => {
      const { view, board } = create3DBoard("box_1", new Vector<2>([0, 10]));
      const { end_p: end_p_point } = para_point_v.add_to_3d_view(board, view, {
         arrow_conf: {
            color: "red",
         },
         point_conf: [{ visible: false }, PointNoTitle3D],
         update_state: {
            set_vec: set_para_point_v
         }
      });
      const { arrow } = para_dir_v.add_to_3d_view(board, view, {
         relativ_p: [RelativPoint.StartPoint, end_p_point],
         arrow_conf: {
            color: "blue",
         },
         update_state: {
            set_vec: set_para_dir_v
         }
      });
      view.create("line3d", [end_p_point, arrow, [Infinity, -Infinity]])
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
                  `$a=\\vec{v}=${para_point_v.to_latex_vec()}+p\\cdot${para_dir_v.to_latex_vec()}$ 
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