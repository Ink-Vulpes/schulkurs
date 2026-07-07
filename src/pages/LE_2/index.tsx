import { point_to_v2d, v2d_add, v2d_amount, v2d_diff, v2d_not, type Vec2D } from "@/utils/math";
import { JSXGraph } from "jsxgraph";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export default function LE_2() {
   const [add_v1, set_add_v1] = useState<Vec2D>([3, 3]);
   const [add_v2, set_add_v2] = useState<Vec2D>([1, -1]);
   const [diff_v1, set_diff_v1] = useState<Vec2D>([3, 3]);
   const [diff_v2, set_diff_v2] = useState<Vec2D>([1, 2]);
   const [b_v, set_b_v] = useState<Vec2D>([2, 3]);

   useEffect(() => {
      const board = JSXGraph.initBoard("box_1", {
         boundingBox: [-1, 5, 5, -1],
         axis: true
      });
      const end_p1 = board.create("point", add_v1, {
         fillOpacity: 0,
         strokeOpacity: 0,
         snapToGrid: true,
         withLabel: false
      });
      const end_p2 = board.create("point", v2d_add(add_v1, add_v2), {
         fillOpacity: 0,
         strokeOpacity: 0,
         snapToGrid: true,
         withLabel: false
      });

      board.create("arrow", [[0, 0], end_p1], {
         fixed: true,
         name: 'a',
         withLabel: true,
         label: {
            parse: false,
            position: 'top',
            offset: [10, 10]
         }
      });
      board.create("arrow", [end_p1, end_p2], {
         fixed: true,
         name: 'b',
         withLabel: true,
         label: {
            parse: false,
            position: 'top',
            offset: [10, 10]
         }
      })
      board.create("arrow", [[0, 0], end_p2], {
         fixed: true,
         name: 'a+b',
         strokeColor: '#FF0000',
         highlightStrokeColor: '#FF0000',
         withLabel: true,
         label: {
            parse: false,
            position: 'top',
            offset: [10, 10]
         }
      })
      board.on("update", (e) => {
         const new_end_p1 = point_to_v2d(end_p1);
         const new_end_p2 = point_to_v2d(end_p2);
         if (new_end_p1 != add_v1) set_add_v1(new_end_p1);
         if (new_end_p2 != v2d_add(new_end_p1, add_v2)) set_add_v2(v2d_diff(new_end_p2, new_end_p1));
      })
   }, []);
   useEffect(() => {
      const board = JSXGraph.initBoard("box_2", {
         boundingBox: [-1, 5, 5, -1],
         axis: true
      });
      const end_p1 = board.create("point", diff_v1, {
         fillOpacity: 0,
         strokeOpacity: 0,
         snapToGrid: true,
         withLabel: false
      });
      const end_p2 = board.create("point", v2d_diff(diff_v1, diff_v2), {
         fillOpacity: 0,
         strokeOpacity: 0,
         snapToGrid: true,
         withLabel: false
      });
      board.create("arrow", [[0, 0], end_p1], {
         fixed: true,
         name: 'a',
         withLabel: true,
         label: {
            parse: false,
            position: 'top',
            offset: [10, 10]
         }
      });
      board.create("arrow", [end_p2, end_p1], {
         fixed: true,
         name: 'b',
         withLabel: true,
         label: {
            parse: false,
            position: 'top',
            offset: [10, 10]
         }
      })
      board.create("arrow", [[0, 0], end_p2], {
         fixed: true,
         name: 'a-b',
         strokeColor: '#FF0000',
         highlightStrokeColor: '#FF0000',
         withLabel: true,
         label: {
            parse: false,
            position: 'top',
            offset: [10, 10]
         }
      })
      board.on("update", (e) => {
         const new_end_p1 = point_to_v2d(end_p1);
         const new_end_p2 = point_to_v2d(end_p2);
         if (new_end_p1 != diff_v1) set_diff_v1(new_end_p1);
         if (new_end_p2 != v2d_add(v2d_not(new_end_p1), add_v2)) set_diff_v2(v2d_not(v2d_diff(new_end_p2, new_end_p1)));
      })
   }, [])
   useEffect(() => {
      const board = JSXGraph.initBoard("box_3", {
         boundingBox: [-1, 5, 5, -1],
         axis: true
      });
      const end_p = board.create("point", b_v, {
         fillOpacity: 0,
         strokeOpacity: 0,
         snapToGrid: true,
         withLabel: false
      })
      board.create("arrow", [[0, 0], end_p], {
         fixed: true,
         name: 'v',
         withLabel: true,
         label: {
            parse: false,
            position: 'top',
            offset: [10, 10]
         }
      });
      board.on("update", (e) => {
         const new_end_p = point_to_v2d(end_p);
         if (new_end_p != b_v) set_b_v(new_end_p);
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
                     $\\vec{b}=\\begin{pmatrix}${add_v2[0]}\\\\${add_v2[1]}\\end{pmatrix}$
                  am Endpunkt des anderen Vektors
                     $\\vec{a}=\\begin{pmatrix}${add_v1[0]}\\\\${add_v1[1]}\\end{pmatrix}$.
                  Nun der neu entstandene Vektor zwischen den Startpunkt von $\\vec{a}$ zum Endpunkt des $\\vec{b}$ ist
                  die Summe der beiden Vektoren 
                  $ \\vec{a}+\\vec{b}=
                     \\begin{pmatrix}
                        ${add_v1[0]}+${add_v2[0]}\\\\
                        ${add_v1[1]}+${add_v2[1]}
                     \\end{pmatrix}=
                     \\begin{pmatrix}
                        ${add_v1[0] + add_v2[0]}\\\\
                        ${add_v1[1] + add_v2[1]}
                     \\end{pmatrix}
                  $.`
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
                     $\\vec{b}=\\begin{pmatrix}${diff_v2[0]}\\\\${diff_v2[1]}\\end{pmatrix}$
                  am Endpunkt des anderen Vektors
                     $\\vec{a}=\\begin{pmatrix}${diff_v1[0]}\\\\${diff_v1[1]}\\end{pmatrix}$.
                  Nun der neue entstandene Vektor zwischen den Startpunkt von $\\vec{a}$ zum Startpunkt des $\\vec{b}$ ist
                  die Differenz der beiden Vektoren 
                  $ \\vec{a}-\\vec{b}=
                     \\begin{pmatrix}
                        ${diff_v1[0]}-${diff_v2[0]}\\\\
                        ${diff_v1[1]}-${diff_v2[1]}
                     \\end{pmatrix}=
                     \\begin{pmatrix}
                        ${diff_v1[0] - diff_v2[0]}\\\\
                        ${diff_v1[1] - diff_v2[1]}
                     \\end{pmatrix}
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
                  `Um die Länge eines Vektors $\\vec{v}=\\begin{pmatrix}${b_v[0]}\\\\${b_v[1]}\\end{pmatrix}$ zu bestimmen nutzt man den Betrag, der wie folgt berechnet wird:
                  $$|\\vec{v}|=\\sqrt{${b_v[0]}^2 + ${b_v[1]}^2}=${v2d_amount(b_v)}$$`
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