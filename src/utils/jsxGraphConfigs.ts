export const DefaultBoard: Partial<JXG.BoardAttributes> = {
   boundingBox: [-1, 5, 5, -1],
   axis: true
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