import axios from "axios";
import { PokemonDetail } from "../interfaces/PokemonDetail";
import { getPokemonDetails } from "./getPokemonDetails";

export interface PokemonListInterface {
  name: string;
  url: string;
}

export interface ListPokemonsInterface {
  totalPages: any;
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDetail[];
}

export async function listPokemons(page: number, pageSize: number): Promise<ListPokemonsInterface> {
  const endpoint = `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * pageSize}&limit=${pageSize}`;

  const response = await axios.get<ListPokemonsInterface>(endpoint);

  const promiseArr = response.data.results.map(async (pokemon) => getPokemonDetails(pokemon.name));

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const resultsPromise = await Promise.all(promiseArr);

  return {
    ...response.data,
    results: resultsPromise
  };
}