import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestion from './GPTMovieSuggestion'
import { BG_URL } from '../utils/constant'

const GPTSearch = () => {
  return (
    <div>
      <div className="absolute ">
        <img
          src={BG_URL}
          alt="bg"
        />
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestion />
    </div>
  )
}

export default GPTSearch
