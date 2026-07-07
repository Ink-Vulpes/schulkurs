import type { Point } from "jsxgraph";

export type Vec2D = [number, number];
export function v2d_amount(v: Vec2D): number {
   return Math.sqrt(v[0] ** 2 + v[1] ** 2)
}
export function v2d_not(v: Vec2D): Vec2D {
   return [-v[0], -v[1]]
}
export function v2d_add(v1: Vec2D, v2: Vec2D): Vec2D {
   return [v1[0] + v2[0], v1[1] + v2[1]]
}
export function v2d_diff(v1: Vec2D, v2: Vec2D): Vec2D {
   return [v1[0] - v2[0], v1[1] - v2[1]]
}
export function point_to_v2d(point: Point): Vec2D {
   return [point.X(), point.Y()]
}