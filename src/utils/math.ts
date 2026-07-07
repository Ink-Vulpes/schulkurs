import { Board, Point, type Arrow } from "jsxgraph";

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
export function arrow_to_vec2d(arrow: Arrow): Vec2D {
   return v2d_diff(point_to_v2d(arrow.point2), point_to_v2d(arrow.point1));
}