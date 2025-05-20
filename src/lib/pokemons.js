import line241 from "@/assets/images/line241.jpg";
import line241Back from "@/assets/images/line241-back.png";

export const pokemons = Array.from({ length: 45 }, (_, index) => ({
  id: index,
  name: "kav 241",
  type: ["Normal"],
  height: 1.78,
  weight: 15,
  frontViewImageUrl: line241.src,
  backViewImageUrl: line241.src,
  frontShinyViewImageUrl: line241Back.src,
  backShinyViewImageUrl: line241Back.src,
}));
