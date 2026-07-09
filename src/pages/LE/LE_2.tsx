import { ArrowColorRed, ArrowWithLabel, DefaultBoard, PointNoTitle } from "@/utils/jsxGraphConfigs";
import { RelativPoint, Vector, vector_from_point } from "@/utils/math";
import { JSXGraph } from "jsxgraph";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export default function LE_2() {
   const [add_v1, set_add_v1] = useState(new Vector<2>([3, 3]));
   const [add_v2, set_add_v2] = useState(new Vector<2>([1, -1]));
   const [diff_v1, set_diff_v1] = useState(new Vector<2>([3, 3]));
   const [diff_v2, set_diff_v2] = useState(new Vector<2>([1, 2]));
   const [b_v, set_b_v] = useState(new Vector<2>([2, 3]));

   useEffect(() => {
      const board = JSXGraph.initBoard("box_1", DefaultBoard);
      const { end_p: end_pv1, start_p: start_pv1 } = add_v1.add_to_board(board, {
         point_conf: [{ visible: false }, PointNoTitle],
         arrow_conf: {
            ...ArrowWithLabel,
            name: "\\(\\vec{a}\\)"
         },
         update_state: {
            set_vec: set_add_v1
         }
      })
      const { end_p: end_pv2 } = add_v2.add_to_board(board, {
         relativ_p: [RelativPoint.StartPoint, end_pv1],
         arrow_conf: {
            ...ArrowWithLabel,
            name: "\\(\\vec{b}\\)"
         },
         update_state: {
            set_vec: set_add_v2
         }
      })
      board.create("arrow", [start_pv1, end_pv2], {
         ...ArrowColorRed,
         ...ArrowWithLabel,
         name: "\\(\\vec{a}+\\vec{b}\\)"
      })
   }, []);
   useEffect(() => {
      const board = JSXGraph.initBoard("box_2", DefaultBoard);
      const { end_p: end_pv1, start_p: start_pv1 } = diff_v1.add_to_board(board, {
         point_conf: [{ visible: false }, PointNoTitle],
         arrow_conf: {
            ...ArrowWithLabel,
            name: "\\(\\vec{a}\\)"
         },
         update_state: {
            set_vec: set_diff_v1
         }
      })
      const { start_p: start_pv2 } = diff_v2.add_to_board(board, {
         relativ_p: [RelativPoint.EndPoint, end_pv1],
         arrow_conf: {
            ...ArrowWithLabel,
            name: "\\(\\vec{b}\\)"
         },
         update_state: {
            set_vec: set_diff_v2
         }
      })
      board.create("arrow", [start_pv1, start_pv2], {
         ...ArrowColorRed,
         ...ArrowWithLabel,
         name: "\\(\\vec{a}-\\vec{b}\\)"
      })
   }, [])
   useEffect(() => {
      const board = JSXGraph.initBoard("box_3", DefaultBoard);
      b_v.add_to_board(board, {
         point_conf: [{ visible: false }, PointNoTitle],
         arrow_conf: {
            ...ArrowWithLabel,
            name: "\\(\\vec{v}\\)"
         },
         update_state: {
            set_vec: set_b_v
         }
      })
   }, [])

   return <div>
      <p className="mt-2 font-bold text-red-950">Addition von Vektoren.</p>
      <div className="flex gap-2 min-w-0 flex-1">
         <div className="w-2/3">
            <ReactMarkdown
               remarkPlugins={[remarkMath]}
               rehypePlugins={[rehypeKatex]}
            >
               {
                  `Um die Addition von zwei Vektoren vorstellen zu können, liegt man den Startpunkt von ein Vektor 
                     $\\vec{b}=${add_v2.to_latex_vec()}$
                  am Endpunkt des anderen Vektors
                     $\\vec{a}=${add_v1.to_latex_vec()} $.
                  Nun der neu entstandene Vektor zwischen den Startpunkt von $\\vec{a}$ zum Endpunkt des $\\vec{b}$ ist
                  die Summe der beiden Vektoren $\\vec{a}+\\vec{b}=${add_v1.add_with_to_latex_vec(add_v2)}=${add_v1.add(add_v2).to_latex_vec()}$.`
               }
            </ReactMarkdown>
         </div>
         <div className="w-1/3">
            <div id="box_1" className="ml-auto w-100 aspect-square" />
            <p className="font-light text-red-900 float-right w-100">Anmerkung: Die Grafik ist interaktiv. Sie können die Punkte und den Vektor mit Drag-and-Drop verschieben.</p>
         </div>
      </div>
      <p className="mt-2 font-bold text-red-950">Differenz von Vektoren.</p>
      <div className="flex gap-2 min-w-0 flex-1">
         <div className="w-2/3">
            <ReactMarkdown
               remarkPlugins={[remarkMath]}
               rehypePlugins={[rehypeKatex]}
            >
               {
                  `Um die Differenz zweier Vektoren vorstellen zu können, liegt man den Endpunkt von ein Vektor 
                     $\\vec{b}=${diff_v2.to_latex_vec()}$
                  am Endpunkt des anderen Vektors
                     $\\vec{a}=${diff_v1.to_latex_vec()}$.
                  Nun der neue entstandene Vektor zwischen den Startpunkt von $\\vec{a}$ zum Startpunkt des $\\vec{b}$ ist
                  die Differenz der beiden Vektoren 
                  $ \\vec{a}-\\vec{b}= ${diff_v1.diff_with_to_latex_vec(diff_v2)} = ${diff_v1.diff(diff_v2).to_latex_vec()}
                  $.`
               }
            </ReactMarkdown>
         </div>
         <div className="w-1/3">
            <div id="box_2" className="ml-auto w-100 aspect-square" />
            <p className="font-light text-red-900 float-right w-100">Anmerkung: Die Grafik ist interaktiv. Sie können die Punkte und den Vektor mit Drag-and-Drop verschieben.</p>
         </div>
      </div>
      <p className="mt-2 font-bold text-red-950">Der Betrag eines Vektors.</p>
      <div className="flex gap-2 min-w-0 flex-1">
         <div className="w-2/3">
            <ReactMarkdown
               remarkPlugins={[remarkMath]}
               rehypePlugins={[rehypeKatex]}
            >
               {
                  `Um die Länge eines Vektors $\\vec{v}=${b_v.to_latex_vec()}$ zu bestimmen nutzt man den Betrag, der wie folgt berechnet wird:
                  $$|\\vec{v}|=${b_v.amount_to_latex()}$$`
               }
            </ReactMarkdown>
         </div>
         <div className="w-1/3">
            <div id="box_3" className="ml-auto w-100 aspect-square" />
            <p className="font-light text-red-900 float-right w-100">Anmerkung: Die Grafik ist interaktiv. Sie können die Punkte und den Vektor mit Drag-and-Drop verschieben.</p>
         </div>
      </div>
   </div>
}