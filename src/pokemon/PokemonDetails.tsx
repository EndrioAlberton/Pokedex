import { AppBar, Toolbar, Typography, Container, Button, LinearProgress, Box, IconButton, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { getPokemonDetails } from './services/getPokemonDetails';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/system';
import axios from 'axios';

const StyledAppBar = styled(AppBar)`
  background-color: #fff;
  color: #000;
`;

const StyledButton = styled(Button)`
  color: #000;
`;

const StyledContainer = styled(Container)`
  padding-top: 20px;
  text-align: center;
`;

const StyledImage = styled('img')`
  width: 100%;
  max-width: 400px;
`;

interface PokemonDetailsProps {}

interface PokemonQueryParams {
  name: string;
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const history = useHistory();
  const { name } = useParams<PokemonQueryParams>();

  const { data, isRefetching, isLoading } = useQuery(`pokemon-${name}`, () => getPokemonDetails(name), {
    cacheTime: 1000 * 60 * 60,
    staleTime: 20000,
  });

  useEffect(() => {
    const showAlert = () => {
      alert("Página está indisponível pois ainda está em construção");
      history.goBack();
    };

    showAlert();
  }, [history]);


  const selectedPokemonDetails = data;

  const [evolutionDetails, setEvolutionDetails] = useState(null);
  const [evolutionChainName, setEvolutionChainName] = useState<string | null>(null);
  const [evolutionStones, setEvolutionStones] = useState<string[]>([]);


  useEffect(() => {
    const fetchEvolutionDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemonDetails?.id}`);
        const evolutionChainUrl = response.data?.evolution_chain?.url;
        const responseChain = await axios.get(evolutionChainUrl);
        const evolutionChain = responseChain.data?.chain;

        const getEvolutionStones = (chain: any) => {
          if (chain?.species.name === selectedPokemonDetails?.species.name) {
            chain?.evolves_to.forEach((evolution: any) => {
              if (evolution?.evolution_details[0]?.item) {
                setEvolutionStones((prevStones) => [
                  ...prevStones,
                  evolution.evolution_details[0].item.name,
                ]);
              }
            });
          } else if (chain?.evolves_to) {
            chain.evolves_to.forEach((evolution: any) => {
              if (evolution?.evolution_details[0]?.item) {
                setEvolutionStones((prevStones) => [
                  ...prevStones,
                  evolution.evolution_details[0].item.name,
                ]);
              }
              getEvolutionStones(evolution);
            });
          } else {
            const chainName = evolutionStones.length > 0 ? evolutionStones.join(', ') : 'Nenhuma';
            setEvolutionChainName(chainName);
          }
        };

        getEvolutionStones(evolutionChain);

        console.log(evolutionStones);
      } catch (error) {
        console.error('Error fetching evolution details:', error);
      }
    };

    if (selectedPokemonDetails) {
      fetchEvolutionDetails();
    }
  }, [selectedPokemonDetails]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <StyledButton onClick={history.goBack} startIcon={<ArrowBackIcon />}>
            Voltar
          </StyledButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectedPokemonDetails?.name}
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <IconButton color="inherit">
              {/* Adicione um ícone aqui */}
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
      {isRefetching && <LinearProgress />}

      <StyledContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <StyledImage alt='' src={selectedPokemonDetails?.sprites.front_default} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h2'>{selectedPokemonDetails?.species.name}</Typography>

            <Typography variant="subtitle1" sx={{ marginTop: '10px' }}>
              Elemento: {selectedPokemonDetails?.types.map((type) => type.type.name).join(' / ')}
            </Typography>

            <Typography variant="subtitle1">
              Habilidades: {selectedPokemonDetails?.abilities.map((ability) => ability.ability.name).join(', ')}
            </Typography>

            <Typography variant="subtitle1">
              Boost: {selectedPokemonDetails?.held_items.map((item) => item.item.name).join(' ou ')}
            </Typography>

            <Typography variant="subtitle1">
              Materia: {selectedPokemonDetails?.held_items.map((item) => item.item.name).join(' ou ')}
            </Typography>

            <Typography variant="subtitle1">
              Pedra de Evolução: {evolutionStones.length > 0 ? evolutionStones.join(' ou ') : 'Nenhuma'}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ marginTop: '20px' }}>
          Evoluções
        </Typography>

        <Typography variant="h6" sx={{ marginTop: '20px' }}>
          Descrição
        </Typography>

        <Typography variant="h6" sx={{ marginTop: '20px' }}>
          Movimentos
        </Typography>
      </StyledContainer>
    </>
  );
};

export default PokemonDetails;