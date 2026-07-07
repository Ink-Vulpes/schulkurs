import Callout, { CalloutTyp } from "@/components/Callout";
import { JSXGraph } from "jsxgraph";
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { arrow_to_vec2d, point_to_v2d, v2d_add, v2d_not, type Vec2D } from "@/utils/math";
import { ArrowColorRed, ArrowWithLabel, DefaultBoard, DefaultPoint, PointNoTitle } from "@/utils/jsxGraphConfigs";

export default function LE_1() {
   const [pa_pos, set_pa_pos] = useState<Vec2D>([1, 1]);
   const [pb_pos, set_pb_pos] = useState<Vec2D>([2, 3]);


   useEffect(() => {
      const board = JSXGraph.initBoard("box_1", DefaultBoard);

      const p1 = board.create('point', pa_pos, DefaultPoint);
      const p2 = board.create('point', pb_pos, DefaultPoint);

      const a1 = board.create('arrow', [p1, p2]);
      const vf1 = board.create('vectorfield', [
         arrow_to_vec2d(a1),
         [0, 4, 5],
         [0, 4, 5]
      ]) as any;


      const update_fn1 = () => {
         const new_pa_pos: Vec2D = point_to_v2d(p1);
         const new_pb_pos: Vec2D = point_to_v2d(p2);
         if (new_pa_pos != pa_pos) set_pa_pos(new_pa_pos);
         if (new_pb_pos != pa_pos) set_pb_pos(new_pb_pos);
      }

      const update_fn2 = () => {
         vf1.setF(arrow_to_vec2d(a1))
         update_fn1()
      }

      p1.on("drag", update_fn2);
      p2.on("drag", update_fn2);
      a1.on("drag", update_fn1);

   }, [])

   useEffect(() => {
      const board = JSXGraph.initBoard("box_2", DefaultBoard)

      const p1 = board.create("point", [2, 2], PointNoTitle);
      const p2 = board.create("point", [3, 3], PointNoTitle);

      const a1 = board.create("arrow", [p1, p2], {
         name: "v",
         ...ArrowWithLabel,
      });

      const p3 = board.create("point", v2d_add(v2d_not(arrow_to_vec2d(a1)), point_to_v2d(p1)), {
         visible: false
      });
      const a2 = board.create("arrow", [p1, p3], {
         name: "!v",
         ...ArrowWithLabel,
         ...ArrowColorRed
      })

      const drag_event = () => {
         p3.moveTo(v2d_add(v2d_not(arrow_to_vec2d(a1)), point_to_v2d(p1)));
      };

      p1.on("drag", drag_event);
      p2.on("drag", drag_event);
   }, [])

   const vec_ab_raw = `\\overrightarrow{AB}=\\begin{pmatrix}${pb_pos[0] - pa_pos[0]}\\\\${pb_pos[1] - pa_pos[1]}\\end{pmatrix}`;

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
                  \$${vec_ab_raw}\$
                  die Beziehung zwischen den Punkten \$A(${pa_pos[0]}|${pa_pos[1]})\$ zu \$B(${pb_pos[0]}|${pb_pos[1]})\$.
                  Es ist wichtig zu wissen, dass sich ein Vektor nur auf der Lagebeziehung der Punkte bezieht, nicht auf die Lage der Punkte allgemein.
                  Was bedeutet, dass die Punkte beliebig liegen können, solange die Lagebeziehung gleich bleibt, bleibt auch der Vektor gleich.
                  Um das zu zeigen, können sie die einer der Punkt in der Grafik verschieben, somit verändern sie auch die Lagebeziehung und damit auch
                  den Vektor $\\overrightarrow{AB}$. Aber wenn sie nun den Vektor verschieben ändern sie nur die Lage der beiden Punkte, jedoch bleibt die
                  Lagebeziehung der Punkt gleich und auch der Vektor.
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
                  `Sind zwei Vektoren gleich lang, parallel aber entgegengesetzt gerichtet, so heißen sie Gegenvektor.`
               }
            </ReactMarkdown>
         </div>
         <div className="w-1/3">
            <div id="box_2" className="ml-auto w-100 aspect-square" />
         </div>
      </div>
   </div>
}