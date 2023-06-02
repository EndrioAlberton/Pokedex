import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail';
import { listPokemons, ListPokemonsInterface } from '../pokemon/services/listPokemons';
import PokedexCard from './components/PokedexCard';

const PageWrapper = styled.div`
  background-image: url('https://secure.static.tumblr.com/f6a18ac56651ce4f9ca7e0230706a0b6/s5i5nyy/dyXn37osa/tumblr_static_pokemon-clouds_00384079.png');
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
`;

const PokedexContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchForm = styled.form`
  display: flex;
  margin-bottom: 20px;

  input[type='text'] {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Pokedex: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemons, setPokemons] = useState<ListPokemonsInterface | null>(null);
  const [searchResults, setSearchResults] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response: ListPokemonsInterface = await listPokemons(1, 151); // Buscar apenas os 151 Pokémon da primeira geração
        setPokemons(response);
      } catch (error) {
        console.error('Erro ao buscar os Pokémon', error);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearch = () => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    try {
      const filteredPokemons = pokemons?.results.filter((pokemon) =>
        pokemon.name.includes(searchTerm.toLowerCase())
      ) || [];
      setSearchResults(filteredPokemons);
    } catch (error) {
      console.error('Erro ao buscar os Pokémon', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, pokemons]);

  return (
    <PageWrapper>
      <PokedexContainer>
        <SearchForm>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome do Pokémon"
          />
        </SearchForm>

        {searchTerm ? (
          searchResults.length > 0 ? (
            <Grid container spacing={2}>
              {searchResults.map((pokemon) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={pokemon.name}>
                  <PokedexCard pokemon={pokemon} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>Nenhum Pokémon encontrado.</p>
          )
        ) : (
          pokemons ? (
            <Grid container spacing={2}>
              {pokemons.results.map((pokemon) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={pokemon.name}>
                  <PokedexCard pokemon={pokemon} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>Carregando...</p>
          )
        )}
      </PokedexContainer>
    </PageWrapper>
  );
};

export default Pokedex;