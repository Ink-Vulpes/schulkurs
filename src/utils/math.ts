import { Board, Point, View3D, type Arrow, type Line3D, type Point3D } from "jsxgraph";
import { DefaultArrow2D, DefaultArrow3D, PointNoTitle, PointNoTitle3D } from "./jsxGraphConfigs";
export type VecT<N extends number, T extends number = number, R extends T[] = []> =
   R["length"] extends N ? R : VecT<N, T, [T, ...R]>;
export enum RelativPoint {
   StartPoint,
   EndPoint,
}

/**
 * Represents a mathematical vector with a fixed compile-time dimension.
 *
 * This class provides operations for vector arithmetic, LaTeX formatting,
 * and JSXGraph rendering helpers for two-dimensional vectors.
 *
 * @typeParam N The vector dimension (for example, 2 for 2D vectors).
 */
export class Vector<N extends number> {
   public v: VecT<N>;
   /**
    * Creates a new vector with fixed dimension N.
    * @param v The numeric components of the vector in coordinate order.
    */
   constructor(v: VecT<N>) {
      this.v = v as VecT<N>;
   }
   /**
    * Computes the Euclidean length (magnitude) of the vector.
    * @returns The non-negative vector length.
    */
   amount(): number {
      return Math.sqrt((this.v as Array<number>).reduce((a, n) => (a + (n ** 2))))
   }
   /**
    * Creates the additive inverse of this vector.
    * @returns A new vector where each component is multiplied by -1.
    */
   not(): Vector<N> {
      return new Vector(((this.v as Array<number>).map((n) => (-n))) as VecT<N>);
   }
   /**
    * Adds another vector to this vector component-wise.
    * @param v The vector that is added to this vector.
    * @returns A new vector containing the component-wise sum.
    */
   add(v: Vector<N>): Vector<N> {
      return new Vector((this.v as Array<number>).map((n, i) => (n + ((v.v as Array<number>)[i] ?? 0))) as VecT<N>)
   }
   /**
    * Subtracts another vector from this vector component-wise.
    * @param v The vector that is subtracted from this vector.
    * @returns A new vector containing the component-wise difference.
    */
   diff(v: Vector<N>): Vector<N> {
      return new Vector((this.v as Array<number>).map((n, i) => (n - ((v.v as Array<number>)[i] ?? 0))) as VecT<N>)
   }
   add_to_3d_view(this: Vector<3>, board: Board, view: View3D, conf?: {
      relativ_p?: [RelativPoint, (Vector<3> | Point3D)],
      arrow_conf?: JXG.Line3DAttributes,
      point_conf?: JXG.Point3DAttributes | [JXG.Point3DAttributes, JXG.Point3DAttributes],
      update_state?: {
         set_start_p?: (vec: Vector<3>) => void;
         set_vec?: (vec: Vector<3>) => void;
      }
   }): {
      start_p: Point3D,
      end_p: Point3D,
      arrow: Line3D
   } {
      let start_p: Point3D;
      let end_p: Point3D;

      if (Array.isArray(conf?.relativ_p)) {
         switch (conf.relativ_p[0]) {
            case RelativPoint.StartPoint:
               if (conf?.relativ_p[1] instanceof Vector) {
                  if (Array.isArray(conf.point_conf)) {
                     start_p = view.create("point3d", conf.relativ_p[1].v, conf.point_conf[0]);
                     end_p = view.create("point3d", conf.relativ_p[1].add(this).v, conf.point_conf[1]);
                  } else {
                     start_p = view.create("point3d", conf.relativ_p[1].v, conf.point_conf ? conf.point_conf : PointNoTitle3D);
                     end_p = view.create("point3d", conf.relativ_p[1].add(this).v, conf.point_conf ? conf.point_conf : PointNoTitle3D);
                  }
               } else {
                  start_p = conf.relativ_p[1];
                  if (Array.isArray(conf.point_conf)) end_p = view.create("point3d", vector_from_point(start_p).add(this).v, conf.point_conf[1])
                  else end_p = view.create("point3d", vector_from_point(start_p).add(this).v, conf.point_conf ? conf.point_conf : PointNoTitle3D);

               }
               break
            case RelativPoint.EndPoint:
               if (conf.relativ_p[1] instanceof Vector) {
                  if (Array.isArray(conf.point_conf)) {
                     end_p = view.create("point3d", conf.relativ_p[1].v, conf.point_conf[0]),
                        start_p = view.create("point3d", conf.relativ_p[1].diff(this).v, conf.point_conf[1])
                  } else {
                     end_p = view.create("point3d", conf.relativ_p[1].v, conf.point_conf ? conf.point_conf : PointNoTitle3D);
                     start_p = view.create("point3d", conf.relativ_p[1].diff(this).v, conf.point_conf ? conf.point_conf : PointNoTitle3D);
                  }
               } else {
                  end_p = conf.relativ_p[1]
                  if (Array.isArray(conf.point_conf)) start_p = view.create("point3d", vector_from_point(end_p).diff(this).v, conf.point_conf[0])
                  else start_p = view.create("point3d", vector_from_point(end_p).diff(this).v, conf.point_conf ? conf.point_conf : PointNoTitle3D);
               }
               break
         }
      } else {
         if (Array.isArray(conf?.point_conf)) {
            start_p = view.create("point3d", [0, 0, 0], conf.point_conf[0]);
            end_p = view.create("point3d", vector_from_point(start_p).add(this).v, conf.point_conf[1]);
         } else {
            start_p = view.create("point3d", [0, 0, 0], conf?.point_conf ? conf.point_conf : PointNoTitle3D);
            end_p = view.create("point3d", vector_from_point(start_p).add(this).v, conf?.point_conf ? conf.point_conf : PointNoTitle3D);
         }
      }


      const arrow = view.create("line3d", [start_p, end_p], {
         ...DefaultArrow3D,
         ...conf?.arrow_conf
      })

      function update_state() {
         if (conf?.update_state?.set_start_p) conf?.update_state?.set_start_p(vector_from_point(start_p));
         if (conf?.update_state?.set_vec) conf?.update_state?.set_vec(vector_from_arrow_3d(arrow));
      }

      if (conf?.update_state) {
         board.on("update", update_state)
      }

      return { start_p, end_p, arrow }
   }
   /**
    * Draws this 2D vector as an arrow on a JSXGraph board. Can only used with Vector<2>!
    * @param board The JSXGraph board where the vector should be rendered.
    * @param conf Optional rendering and interaction configuration.
    * @param conf.relativ_p Optional starting point specification as [RelativPoint, Vector<2> | Point]. Determines if the vector starts (StartPoint) or ends (EndPoint) at the given point.
    * @param conf.arrow_conf Optional JSXGraph arrow attributes for styling the arrow.
    * @param conf.point_conf Optional JSXGraph point attributes for styling points. Can be a single config or [start_config, end_config].
    * @param conf.update_state Optional callbacks triggered when start or end points are dragged. Provides set_start_p and set_vec callbacks.
    * @returns An object containing the created start point, end point, and arrow.
    */
   add_to_board(this: Vector<2>, board: Board, conf?: {
      relativ_p?: [RelativPoint, (Vector<2> | Point)],
      arrow_conf?: JXG.ArrowAttributes,
      point_conf?: JXG.PointAttributes | [JXG.PointAttributes, JXG.PointAttributes],
      update_state?: {
         set_start_p?: (vec: Vector<2>) => void;
         set_vec?: (vec: Vector<2>) => void;
      }
   }): {
      start_p: Point,
      end_p: Point,
      arrow: Arrow
   } {
      var start_p: Point;
      var end_p: Point;

      if (Array.isArray(conf?.relativ_p)) {
         switch (conf.relativ_p[0]) {
            case RelativPoint.StartPoint:
               if (conf?.relativ_p[1] instanceof Vector) {
                  if (Array.isArray(conf.point_conf)) {
                     start_p = board.create("point", conf.relativ_p[1].v, conf.point_conf[0]);
                     end_p = board.create("point", conf.relativ_p[1].add(this).v, conf.point_conf[1]);
                  } else {
                     start_p = board.create("point", conf.relativ_p[1].v, conf.point_conf ? conf.point_conf : PointNoTitle);
                     end_p = board.create("point", conf.relativ_p[1].add(this).v, conf.point_conf ? conf.point_conf : PointNoTitle);
                  }
               } else {
                  start_p = conf.relativ_p[1];
                  if (Array.isArray(conf.point_conf)) end_p = board.create("point", vector_from_point(start_p).add(this).v, conf.point_conf[1])
                  else end_p = board.create("point", vector_from_point(start_p).add(this).v, conf.point_conf ? conf.point_conf : PointNoTitle);

               }
               break
            case RelativPoint.EndPoint:
               if (conf.relativ_p[1] instanceof Vector) {
                  if (Array.isArray(conf.point_conf)) {
                     end_p = board.create("point", conf.relativ_p[1].v, conf.point_conf[0]),
                        start_p = board.create("point", conf.relativ_p[1].diff(this).v, conf.point_conf[1])
                  } else {
                     end_p = board.create("point", conf.relativ_p[1].v, conf.point_conf ? conf.point_conf : PointNoTitle);
                     start_p = board.create("point", conf.relativ_p[1].diff(this).v, conf.point_conf ? conf.point_conf : PointNoTitle);
                  }
               } else {
                  end_p = conf.relativ_p[1]
                  if (Array.isArray(conf.point_conf)) start_p = board.create("point", vector_from_point(end_p).diff(this).v, conf.point_conf[0])
                  else start_p = board.create("point", vector_from_point(end_p).diff(this).v, conf.point_conf ? conf.point_conf : PointNoTitle);
               }
               break
         }
      } else {
         if (Array.isArray(conf?.point_conf)) {
            start_p = board.create("point", [0, 0], conf.point_conf[0]);
            end_p = board.create("point", vector_from_point(start_p).add(this).v, conf.point_conf[1]);
         } else {
            start_p = board.create("point", [0, 0], conf?.point_conf ? conf.point_conf : PointNoTitle);
            end_p = board.create("point", vector_from_point(start_p).add(this).v, conf?.point_conf ? conf.point_conf : PointNoTitle);
         }
      }

      const arrow = board.create("arrow", [start_p, end_p], conf?.arrow_conf ? conf.arrow_conf : DefaultArrow2D);

      function update_state() {
         if (conf?.update_state?.set_start_p) conf?.update_state?.set_start_p(vector_from_point(start_p));
         if (conf?.update_state?.set_vec) conf?.update_state?.set_vec(vector_from_arrow_2d(arrow));
      }

      if (conf?.update_state) {
         start_p.on("drag", update_state);
         end_p.on("drag", update_state);
      }

      return { start_p, end_p, arrow }
   }
   /**
    * Builds a LaTeX column vector string that shows component-wise addition with another vector.
    * @param v The vector that is added to this vector in the displayed expression.
    * @returns A LaTeX string representing the symbolic addition per component.
    */
   add_with_to_latex_vec(v: Vector<N>): string {
      return `\\begin{pmatrix}
         ${(this.v as Array<number>)
            .map((e, i) => (`${e} + ${((v.v as Array<number>)[i] ?? 0) < 0 ? `(${(v.v as Array<number>)[i]})` : (v.v as Array<number>)[i]}`))
            .join("\\\\")
         }
      \\end{pmatrix}`
   }
   /**
    * Builds a LaTeX column vector string that shows component-wise subtraction with another vector.
    * @param v The vector that is subtracted from this vector in the displayed expression.
    * @returns A LaTeX string representing the symbolic subtraction per component.
    */
   diff_with_to_latex_vec(v: Vector<N>): string {
      return `\\begin{pmatrix}
         ${(this.v as Array<number>)
            .map((e, i) => (`${e} - ${((v.v as Array<number>)[i] ?? 0) < 0 ? `(${(v.v as Array<number>)[i]})` : (v.v as Array<number>)[i]}`))
            .join("\\\\")
         }
      \\end{pmatrix}`
   }
   /**
    * Builds the LaTeX formula for the Euclidean norm of this vector.
    * @returns A LaTeX string containing a square-root expression over squared components.
    */
   amount_to_latex(): string {
      return `\\sqrt{${(this.v as Array<number>)
         .map((e) => (`${e}^2`))
         .join("+")
         }}`
   }
   /**
    * Converts this vector to a LaTeX column vector representation.
    * @returns A LaTeX string containing the vector as a pmatrix.
    */
   to_latex_vec(): string {
      return `\\begin{pmatrix} ${(this.v as Array<number>).join("\\\\")} \\end{pmatrix}`
   }
   /**
    * Converts this vector to a labeled point string in LaTeX-style notation.
    * @param name The point label placed before the coordinates.
    * @returns A string formatted like name=(x|y|...).
    */
   to_latex_point(name: string): string {
      return `${name}=(${(this.v as Array<number>).join("|")})`
   }
   /**
    * Adds a constant 2D vector field based on this vector to a JSXGraph board.
    * @param board The JSXGraph board where the vector field is created.
    * @param config Optional span configuration for x and y directions.
    * @param config.span_x Horizontal span with start, end, and number of iterations.
    * @param config.span_y Vertical span with start, end, and number of iterations.
    * @returns The created JSXGraph vector field object.
    */
   add_vector_field_to_board(this: Vector<2>, board: Board, config?: Partial<{
      span_x: {
         start: number,
         end: number,
         iterations: number,
      },
      span_y: {
         start: number,
         end: number,
         iterations: number,
      }
   }>): any {
      return board.create("vectorfield", [
         this.v,
         [
            config?.span_x?.start ? config.span_x.start : 0,
            config?.span_x?.iterations ? config.span_x.iterations : 4,
            config?.span_x?.end ? config.span_x.end : 5
         ],
         [
            config?.span_y?.start ? config.span_y.start : 0,
            config?.span_y?.iterations ? config.span_y.iterations : 4,
            config?.span_y?.end ? config.span_y.end : 5
         ]
      ])
   }
}
export function vector_from_point(point: Point): Vector<2>;
export function vector_from_point(point: Point3D): Vector<3>;
export function vector_from_point(point: Point | Point3D): Vector<2> | Vector<3> {
   if (point instanceof Point) return new Vector<2>([point.X(), point.Y()]);
   return new Vector<3>([point.X(), point.Y(), point.Z()])
}

export function vector_from_arrow_2d(arrow: Arrow): Vector<2> {
   return vector_from_point(arrow.point2).diff(vector_from_point(arrow.point1))
}
export function vector_from_arrow_3d(arrow: Line3D): Vector<3> {
   return vector_from_point(arrow.point2 as unknown as Point3D).diff(vector_from_point(arrow.point1 as unknown as Point3D))
}