import { Card, CardMedia, CardHeader, Typography, Badge } from '@mui/material';
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
      case 'flying':
        return '#C5CAE9';
      case 'dark':
        return '#707070';
      default:
        return '#777';
    }
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getTypeTranslation = (type: string) => {
    switch (type) {
      case 'grass':
        return 'Grama';
      case 'fire':
        return 'Fogo';
      case 'water':
        return 'Água';
      case 'electric':
        return 'Elétrico';
      case 'bug':
        return 'Inseto';
      case 'normal':
        return 'Normal';
      case 'poison':
        return 'Veneno';
      case 'ground':
        return 'Terra';
      case 'rock':
        return 'Pedra';
      case 'fighting':
        return 'Lutador';
      case 'psychic':
        return 'Psíquico';
      case 'ghost':
        return 'Fantasma';
      case 'ice':
        return 'Gelo';
      case 'dragon':
        return 'Dragão';
      case 'fairy':
        return 'Fada';
      case 'steel':
        return 'Metálico';
      case 'flying':
        return 'Voador';
      case 'dark':
        return 'Sombrio';
      default:
        return 'Desconhecido';
    }
  };

  const cardStyle: React.CSSProperties = {
    background: `linear-gradient(to bottom, ${getTypeColor(pokemon.types[0].type.name)}, rgba(255, 255, 255, 0))`,
    width: '150px',
    margin: '0 auto',
  };

  const cardHeaderTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    border: '1px solid #000',
    borderRadius: '10px',
    padding: '5px',
  };

  const cardHeaderSubheaderStyle: React.CSSProperties = {
    fontSize: '14px',
    textAlign: 'center',
  };

  const badgeStyle: React.CSSProperties = {
    backgroundColor: getTypeColor(pokemon.types[0].type.name),
    color: '#fff',
    marginRight: '3px',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
  };

  return (
    <Card sx={cardStyle}>
      <CardHeader
        title={
          <Typography variant="subtitle1" align="center" style={cardHeaderTitleStyle}>
            {capitalizeFirstLetter(pokemon.name)} #{pokemon.id}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        alt={pokemon.name}
        height="140"
        image={pokemon.sprites.front_default}
        title={pokemon.name}
        onClick={handleClick}
        style={{ objectFit: 'cover' }}
      />
    <CardHeader
      subheader={
        <Typography variant="subtitle2" style={cardHeaderSubheaderStyle}>
          {pokemon.types.map((type, index) => (
            <Badge
              key={type.type.name}
              style={{
                ...badgeStyle,
                backgroundColor: getTypeColor(type.type.name),
              }}
              variant="standard"
              color="primary"
            >
              {getTypeTranslation(type.type.name)}
            </Badge>
          ))}
        </Typography>
      }
    />
    </Card>
  );
};

export default PokedexCard;