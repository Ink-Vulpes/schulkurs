import { JSXGraph } from "jsxgraph"
import type { Vector } from "./math"

export const DefaultBoard: Partial<JXG.BoardAttributes> = {
   boundingBox: [-1, 5, 5, -1],
   axis: true
}
export function create3DBoard(element_id: string, box: Vector<2>): { board: JXG.Board, view: JXG.View3D } {
   const board = JSXGraph.initBoard(element_id, {
      boundingbox: [-8, 8, 8, -8],
      keepAspectRatio: false,
      axis: false,
      pan: { enabled: false }
   })
   const view = board.create("view3d", [[-6, -3], [8, 8], [box.v, box.v, box.v]], {
      axesPosition: 'none'
   }) as JXG.View3D
   return { board, view }
}
export const DefaultPoint: JXG.PointAttributes = {
   size: 1,
   color: "red",
   snapToGrid: true,
}
export const PointNoTitle: JXG.PointAttributes = {
   size: 1,
   snapToGrid: true,
   withLabel: false,
   color: "black",
}
export const DefaultArrow: JXG.ArrowAttributes = {
   fixed: false,
}
export const ArrowWithLabel: Record<string, unknown> = {
   fixed: true,
   withLabel: true,
   label: {
      parse: false,
      useMathJax: true,
      position: 'top',
      offset: [10, 10]
   }
}
export const ArrowColorRed: JXG.ArrowAttributes = {
   strokeColor: '#FF0000',
   highlightStrokeColor: '#FF0000',
}