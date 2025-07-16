import { Theme } from "../lib/enums";

export type Digimon = {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: string[];
  frontViewImageUrl: string;
  backViewImageUrl: string;
  frontShinyViewImageUrl: string;
  backShinyViewImageUrl: string;
};

export type User = {
  id: number;
  username: string;
  password: string;
  theme: Theme;
  fontSize: string;
};
