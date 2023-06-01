import { Card, CardMedia, CardHeader, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';

interface PokedexCardProps {
  pokemon: PokemonDetail;
}

const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const history = useHistory();

  function handleClick() {
    history.push(`/pokemon/${pokemon.name}`);
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'grass':
        return '#AED581';
      case 'fire':
        return '#FF8A65';
      case 'water':
        return '#4FC3F7';
      case 'electric':
        return '#FFD54F';
      case 'bug':
        return '#C6DC67';
      case 'normal':
        return '#BDBDBD';
      case 'poison':
        return '#CE93D8';
      case 'ground':
        return '#E0BB6B';
      case 'rock':
        return '#D4C086';
      case 'fighting':
        return '#D16E54';
      case 'psychic':
        return '#FF80AB';
      case 'ghost':
        return '#9B6FA6';
      case 'ice':
        return '#80DEEA';
      case 'dragon':
        return '#8C6AFF';
      case 'fairy':
        return '#FF9E80';
      case 'steel':
        return '#B0BEC5';
      case 'dark':
        return '#707070';
      default:
        return '#777';
    }
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: getTypeColor(pokemon.types[0].type.name),
  };

  const cardHeaderTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  const cardHeaderSubheaderStyle: React.CSSProperties = {
    fontSize: '14px',
  };

  return (
    <Card sx={cardStyle}>
      <CardMedia
        component="img"
        alt={pokemon.name}
        height="140"
        image={pokemon.sprites.front_default}
        title={pokemon.name}
        onClick={handleClick}
        style={{ objectFit: 'cover' }} // Adicione essa propriedade para mostrar a imagem por inteira
      />
      <CardHeader
        disableTypography
        title={
          <Typography variant="subtitle1" style={cardHeaderTitleStyle}>
            {pokemon.name}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" style={cardHeaderSubheaderStyle}>
            {pokemon.types.map((type) => type.type.name).join(', ')}
          </Typography>
        }
      />
    </Card>
  );
};

export default PokedexCard;