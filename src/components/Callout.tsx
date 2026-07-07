import type { ReactNode } from "react";

export enum CalloutTyp {
   DEF,
}

export type config = {
   title: string,
   title_color: string,
   primary_color: string,
   secondary_color: string,
}

export type props = {
   type: CalloutTyp;
   children: ReactNode;
   costume_config?: Partial<config>,
}

const TypConfigMap: Record<CalloutTyp, config> = {
   [CalloutTyp.DEF]: {
      title: "Definition",
      title_color: "#9f0712",
      primary_color: "#ffc9c9",
      secondary_color: "#ff6467"
   },
}

export default function Callout({ type, children, costume_config }: props) {
   const config = TypConfigMap[type];
   return <div
      className="rounded-xl"
      style={{
         backgroundColor: config.primary_color
      }}

   >
      <p className="p-2 text-xl font-bold rounded-t-xl" style={{ backgroundColor: config.secondary_color, color: config.title_color }}>
         {config.title}
      </p>
      <div className="p-2">
         {children}
      </div>
   </div>;
}