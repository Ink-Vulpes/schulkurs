import type { Vec2D } from "./math";

export function vec_add_latex_string(v1: Vec2D, v2: Vec2D): string {
   return `\\begin{pmatrix}
      ${v1[0] < 0 ? `(${v1[0]})` : v1[0]} + ${v2[0] < 0 ? `(${v2[0]})` : v2[0]}\\\\
      ${v1[1] < 0 ? `(${v1[1]})` : v1[1]} + ${v2[1] < 0 ? `(${v2[1]})` : v2[1]}
   \\end{pmatrix}`
}
export function vec_diff_latex_string(v1: Vec2D, v2: Vec2D): string {
   return `\\begin{pmatrix}
      ${v1[0] < 0 ? `(${v1[0]})` : v1[0]} - ${v2[0] < 0 ? `(${v2[0]})` : v2[0]}\\\\
      ${v1[1] < 0 ? `(${v1[1]})` : v1[1]} - ${v2[1] < 0 ? `(${v2[1]})` : v2[1]}
   \\end{pmatrix}`
}