import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GPTMovieSuggestion = () => {
  const{movieResults, movieNames} = useSelector((store)=>store.gpt)
  
  if(!movieNames) return null;

  return (
    <div className='relative p-4 m-4 text-white bg-gradient-to-r from-black'>
      <div>
      {movieNames.map((movieName, index) => 
      <MovieList key={movieName} title={movieName} movies={movieResults[index]} />)}

      </div>
    </div>
  )
}

export default GPTMovieSuggestion
