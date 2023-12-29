import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[15%] px-12 absolute bg-gradient-to-r from-black'>
      <h1 className='text-4xl font-bold w-full text-white'>{title}</h1>
      <p className='py-6 text-lg w-1/4 text-white'>{overview}</p>
      <div>
        <button className='bg-gray-500 text-white p-4 px-16 text-xl font-bold bg-opacity-50 rounded-lg'>Play</button>
        <button className='bg-gray-500 text-white m-2 p-4 px-10 text-xl font-bold bg-opacity-50 rounded-lg'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle