import TopicTile, { Colors } from "@/components/TopicTile";

export default function Home() {

   return <>
      <p className="text-center text-2xl font-bold">Analytische Geometrie</p>
      <div className="grid-cols-3 flex justify-center mt-4 space-x-2">
         <TopicTile title="Was ist ein Vektor?" color={Colors.BLUE} desc="Hier wird erläutert was ein Vektor ist." LE={1} />
         <TopicTile title="Rechnen mit Vektoren. (1)" color={Colors.RED} desc="Hier werden die Grundlegenden Rechenoperationen mit Vektoren erläutert." LE={2} />
      </div>
   </>
}