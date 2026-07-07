import { LETitleMap } from "@/pages/LE_Overlay";
import { create } from "zustand";

type GlobalState = {
   page: PageEnum,
   LE: number,
   LE_title: string,
   set_LE: (num: number) => void,
   set_LE_title: (title: string) => void,
   setPage: (page: PageEnum) => void,
}

export enum PageEnum {
   HOME,
   LE
}

const useGlobal = create<GlobalState>((set) => ({
   LE: 1,
   page: PageEnum.HOME,
   LE_title: "",
   set_LE: (num) => set({ page: PageEnum.LE, LE: num, LE_title: LETitleMap[num] }),
   set_LE_title: (title) => set({ LE_title: title }),
   setPage: (page) => set({ page: page }),
}))

export default useGlobal;