import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from "../utils/openai"
import { API_OPTIONS } from '../utils/constant'
import { json } from 'react-router-dom'
import { addGptMovieResult } from '../utils/gptSlice'

const GPTSearchBar = () => {

  const dispatch = useDispatch()
 
  const langKey = useSelector(store => store.config.lang)

  //  // search tmdb API for movies
  const searchMovieTMDB = async(movie)=>{
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS);

    const json = await data.json()
    return json.results;

  }

  const handleGPTSearchClick =async()=>{
    console.log(searchText.current.value);

    const gptQuery = "Act as a movie Recommendation system and suggest some more and movies for the query : " + searchText.current.value+". Only give me names of five movies, comma separated like the example result given ahead. Example result: Gadar, Sholay, Don, Golmal, Koi mil gaya";

    const GPTResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    if(!GPTResults.choices){
      //Error handling
      return "Not able to fetch data"
    }

    console.log(GPTResults.choices?.[0]?.message?.content);

    const GPTMovies = GPTResults.choices?.[0]?.message?.content.split(",");
  
    const promiseArray =GPTMovies.map(movie => searchMovieTMDB(movie)) 

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults)
    dispatch(addGptMovieResult({movieNames: GPTMovies, movieResults:tmdbResults}))
  }

  const searchText = useRef(null);

  return (
    <div className='pt-[10%] relative flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
          <input type='text'
          ref={searchText}
          className='p-4 m-4 col-span-9' placeholder={lang[langKey].gptSearchPlaceholder}/>
          <button className='py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4' onClick={handleGPTSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GPTSearchBar
