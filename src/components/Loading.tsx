import React from 'react'
import "./loading.css"

interface LoadingProps  {
  isLoading:boolean
}
const Error: React.FC = () => {
  return <h2 className='error'>
    Ups!, Something went wrong, try again later...
  </h2>
}
const Loading:React.FC<LoadingProps> = ({isLoading}:LoadingProps) => {
  return(
  isLoading === true ? <h2 className='loading'>Loading...</h2> : <Error />
  )
}

export default Loading