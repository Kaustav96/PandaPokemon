import React, { useState } from 'react';
import Pokemon from './Pokemon';
import axios from 'axios';

const PokemonDetails = () => {
  const [pokemonId, setPokemonId] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  const handleInputChange = (event) => {
    setPokemonId(event.target.value);
  };

  const handleNextEvolution = async () => {
    if (pokemon && pokemon.next_evolution && pokemon.next_evolution.length > 0) {
      const nextEvolutionId = pokemon.next_evolution[0].num;
      try {
        const data = await fetchData(nextEvolutionId);
        setPokemon(data);
        setError('');
      } catch (error) {
        setPokemon(null);
        setError(error.message);
      }
    }
  };

  const handlePrevEvolution = async () => {
    if (pokemon && pokemon.prev_evolution && pokemon.prev_evolution.length > 0) {
      const prevEvolutionId = pokemon.prev_evolution[0].num;
      try {
        const data = await fetchData(prevEvolutionId);
        setPokemon(data);
        setError('');
      } catch (error) {
        setPokemon(null);
        setError(error.message);
      }
    }
  };
  const fetchData = async () => {
    if (pokemonId >= 1 && pokemonId <= 151) {
      try {
        const response = await axios.get(`https://jsonmock.hackerrank.com/api/pokemon?id=${pokemonId}`);
        setPokemonData(response.data);
        console.log(pokemonData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      alert('Pokemon ID must be between 1 and 151');
    }
  };

  return (
    <div>
      <h1>Pokemon Details</h1>
      <div>
        <input type="number" value={pokemonId} onChange={handleInputChange} />
        <button onClick={fetchData}>Fetch Pokemon</button>
      </div>
      {pokemonData && <Pokemon pokemon={pokemonData.data} 
      onNextEvolution={handleNextEvolution} onPrevEvolution={handlePrevEvolution}/>}
    </div>
  );
};

export default PokemonDetails;
