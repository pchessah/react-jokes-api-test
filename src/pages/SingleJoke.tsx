import React from 'react'
import JokesForm from '../components/JokesForm'

interface Props {}

function SingleJoke(props: Props) {
  const {} = props

  return (
    <>
    <div className='container'>
      <h1>Create/Edit Joke</h1>
      <section className='joke-form-container'>
        <JokesForm />
      </section>
    </div>
    
    </>
    
  )
}

export default SingleJoke
