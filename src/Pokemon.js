import axios from 'axios';
import React, {useState} from 'react';

const Pokemon = ({ pokemon }) => {
  const [nextEvolutionData, setNextEvolutionData] = useState(null);
  const [prevEvolutionData, setPrevEvolutionData] = useState(null);
  if (!pokemon) {
    return <p>No Pokemon data available.</p>;
  }
  

  const { name, type, height, weight, prev_evolution, next_evolution } = pokemon;
  const handleNextEvolution = async (nextEvolution) => {
    try {
      const response = await axios.get(`https://jsonmock.hackerrank.com/api/pokemon?id=${nextEvolution.num}`);
      setNextEvolutionData(response.data.data);
    } catch (error) {
      console.error('Error fetching next evolution data:', error);
    }
  };

  const handlePrevEvolution = async (prevEvolution) => {
    try {
      const response = await axios.get(`https://jsonmock.hackerrank.com/api/pokemon?id=${prevEvolution.num}`);
      setPrevEvolutionData(response.data.data);
    } catch (error) {
      console.error('Error fetching previous evolution data:', error);
    }
  };
  return (
    <div>
      <h2>{name}</h2>
      {/* <img src={`https://img.pokemondb.net/sprites/black-white/normal/${name.toLowerCase()}.png`} alt={name} /> */}
      <p>Type: {type ? type.join(', ') : ''}</p>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      {prev_evolution && (
        <div>
          <h3>Previous Evolution:</h3>
          <ul>
          {prev_evolution.map((prevEvo, index)=>(
            <>
            <li key={index}>{prevEvo.name}</li>
            <button onClick={() => handlePrevEvolution(prevEvo)}>Previous Evolution</button></>
          ))}
          {/* {pokemon.prev_evolution && (
            <button onClick={() => console.log('Fetch previous evolution')}>Previous Evolution</button>
          )} */}
          </ul>
        </div>
      )}
      {next_evolution && (
        <div>
          <h3>Next Evolution:</h3>
          <ul>
            {next_evolution.map((nextEvo, index) => (
              <><li key={index}>{nextEvo.name}</li><button onClick={() => handleNextEvolution(nextEvo)}>Next Evolution</button></>
            ))}
            {/* {pokemon.next_evolution && (
            <button onClick={() => console.log('Fetch Next evolution')}>Next Evolution</button> */}
          
          </ul>
        </div>
      )}
      {nextEvolutionData && (
        <div>
          <h4>Next Evolution Data:</h4>
          <p>Name: {nextEvolutionData.name}</p>
          <p>Type: {nextEvolutionData.type ? nextEvolutionData.type.join(', ') : ''}</p>
          <p>Height: {nextEvolutionData.height}</p>
          <p>Weight: {nextEvolutionData.weight}</p>
        </div>
      )}
      {prevEvolutionData && (
        <div>
          <h4>Previous Evolution Data:</h4>
          <p>Name: {prevEvolutionData.name}</p>
          <p>Type: {prevEvolutionData.type ? prevEvolutionData.type.join(', ') : ''}</p>
          <p>Height: {prevEvolutionData.height}</p>
          <p>Weight: {prevEvolutionData.weight}</p>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
