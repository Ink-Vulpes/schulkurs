import Callout, { CalloutTyp } from "@/components/Callout";
import { JSXGraph } from "jsxgraph";
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { RelativPoint, Vector, vector_from_arrow, vector_from_point as vector_from_point } from "@/utils/math";
import { ArrowColorRed, ArrowWithLabel, DefaultBoard, DefaultPoint, PointNoTitle } from "@/utils/jsxGraphConfigs";

export default function LE_1() {
   const [b1_start_p, set_b1_start_p] = useState(new Vector<2>([1, 1]));
   const [b1_vec, set_b1_vec] = useState(new Vector<2>([2, 3]));
   const [b2_start_p, set_b2_start_p] = useState(new Vector<2>([2, 2]))
   const [b2_vec, set_b2_vec] = useState(new Vector<2>([1, 2]))


   useEffect(() => {
      const board = JSXGraph.initBoard("box_1", DefaultBoard);

      const { start_p: start_p, end_p: end_p, arrow: arrow } = b1_vec.add_to_board(board, {
         relativ_p: [RelativPoint.StartPoint, b1_start_p],
         point_conf: DefaultPoint,
         arrow_conf: {
            name: "\\(\\overrightarrow{AB}\\)",
            ...ArrowWithLabel
         },
         update_state: {
            set_start_p: set_b1_start_p,
            set_vec: set_b1_vec
         }
      })

      const vf1 = b1_vec.add_vector_field_to_board(board);

      function vf1_update() {
         vf1.setF(vector_from_arrow(arrow).v)
      }

      start_p.on("drag", vf1_update);
      end_p.on("drag", vf1_update);
   }, [])

   useEffect(() => {
      const board = JSXGraph.initBoard("box_2", DefaultBoard)
      const { start_p: start_p, end_p: v1_end_p, arrow: v1_arrow } = b2_vec.add_to_board(board, {
         relativ_p: [RelativPoint.StartPoint, b2_start_p],
         arrow_conf: {
            name: "\\(\\vec{v}\\)",
            ...ArrowWithLabel
         },
         update_state: {
            set_start_p: set_b2_start_p,
            set_vec: set_b2_vec
         }
      });
      const { end_p: v2_end_p } = b2_vec.not().add_to_board(board, {
         arrow_conf: {
            name: "\\(-\\vec{v}\\)",
            ...ArrowWithLabel,
            ...ArrowColorRed
         },
         point_conf: {
            visible: false
         },
         relativ_p: [RelativPoint.StartPoint, start_p]
      })

      function v2_update() {
         v2_end_p.moveTo(vector_from_point(start_p).diff(vector_from_arrow(v1_arrow)).v)
      }
      start_p.on("drag", v2_update);
      v1_end_p.on("drag", v2_update);
   }, [])

   return <div>
      <Callout type={CalloutTyp.DEF}>
         <p>Unter einem Vektor versteht man die Menge aller zueinander paralleler, gleich lange und gleich gerichtete Pfeile.</p>
      </Callout>
      <p className="mt-2 font-bold text-red-950">Was bedeutet das?</p>

      <div className="flex gap-2 min-w-0 flex-1">
         <div className="w-2/3">
            <ReactMarkdown
               remarkPlugins={[remarkMath]}
               rehypePlugins={[rehypeKatex]}
            >
               {
                  `Einfach gesagt, beschreibt ein Vektor die räumliche Beziehung zweier Punkte zueinander. Um diese Beziehung Grafisch darzustellen
                  nutzt man ein Pfeil. Bei der rechten Darstellung, beschreibt der Vektor
                  \$\\overrightarrow{AB}=${b1_vec.to_latex_vec()}\$
                  die Beziehung zwischen den Punkten \$${b1_start_p.to_latex_point("A")}\$ zu \$${b1_start_p.add(b1_vec).to_latex_point("B")}\$.
                  `
               }
            </ReactMarkdown>
         </div>
         <div className="w-1/3">
            <div id="box_1" className="ml-auto w-100 aspect-square" />
            <p className="font-light text-red-900 float-right w-100">Anmerkung: Die Grafik ist interaktiv. Sie können die Punkte und den Vektor mit Drag-and-Drop verschieben.</p>
         </div>

      </div>
      <p className="mt-10 font-bold text-red-950">Schreibweiße</p>
      <ReactMarkdown
         remarkPlugins={[remarkMath]}
         rehypePlugins={[rehypeKatex]}
      >
         {
            `Ein Vektor steht in runden Klammer, wobei die Zahlen untereinander, ohne ein Strich, geschrieben werden. Die Zahlen beschreiben, um wie viele 
            Längen Einheiten auf einer Achse verschoben wird. Hierbei die Anzahl der Zahlen von der Dimension ab, in der der Vektor liegt. In zwei Dimensionen
            wird ein Vektor mit zwei Zahlen dargestellt und in drei mit vier usw. Die Zuordnung der Zahlen zur jeweilige Achse ist wiegvogt (zwei Dimensionen):
            $$ \\vec{v}=\\begin{pmatrix}x\\\\y\\end{pmatrix}$$
            oder bei drei Dimensionen:
            $$ \\vec{v}=\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix}$$
            `

         }
      </ReactMarkdown>

      <p className="mt-10 font-bold text-red-950">Sonderform: Nullvektor</p>
      <ReactMarkdown
         remarkPlugins={[remarkMath]}
         rehypePlugins={[rehypeKatex]}
      >
         {
            `Wenn ein Punkt sich selbst abbildet heißt er Nullvektor \$\\vec{o}\$.`
         }
      </ReactMarkdown>

      <p className="mt-10 font-bold text-red-950">Sonderform: Gegenvektor</p>
      <div className="flex gap-2 min-w-0 flex-1">
         <div className="w-2/3">
            <ReactMarkdown
               remarkPlugins={[remarkMath]}
               rehypePlugins={[rehypeKatex]}
            >
               {
                  `Sind zwei Vektoren gleich lang, parallel aber entgegengesetzt gerichtet, so heißen sie Gegenvektor. In der Grafik ist
                  von den Vektor $\\vec{v}=${b2_vec.to_latex_vec()}$, Gegenvektor $-\\vec{v}=${b2_vec.not().to_latex_vec()}$.
                  `
               }
            </ReactMarkdown>
         </div>
         <div className="w-1/3">
            <div id="box_2" className="ml-auto w-100 aspect-square" />
         </div>
      </div>
   </div>
}