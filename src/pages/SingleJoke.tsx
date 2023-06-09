import React, { useEffect, useState } from 'react'
import JokesForm from '../components/JokesForm'
import { useParams } from 'react-router-dom';
import { getJokeById } from '../services/jokesapi';
import { IJoke } from '../interfaces/joke.interface';
import { useCheckAuthorization } from '..';
import { tokenIsValid } from '../services/localStorage.api';
import Login from './Login';

interface Props {}

function SingleJoke(props: Props) {
  const {} = props
  const { jokeId } = useParams();

  const [joke ,setJoke] = useState<IJoke>(null as any);
  const isAuthenticated = useCheckAuthorization(tokenIsValid());
  
  const getSingleJokeDetails = () => {
    if(jokeId){
      return getJokeById(Number(jokeId))?.then(async (res) =>{
        const joke = await res.json();
        setJoke(joke);
      });
    };
  };

  useEffect(() => {
    getSingleJokeDetails();
  }, [jokeId])

  return (
    <>
    { isAuthenticated ? (
       <div className='container'>
       <h1>{joke ? "Edit Joke" : "Create Joke"}</h1>
       <section className='joke-form-container'>
         <JokesForm isUpdateMode={!!joke} joke={joke} />
       </section>
     </div>
    ) : (<> <Login/> </>)}
   
    
    </>
    
  )
}

export default SingleJoke
