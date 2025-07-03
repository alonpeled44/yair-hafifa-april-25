export type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export type NumericPokemonKeys = NumericKeys<Pokemon>;

export type Pokemon = {
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
