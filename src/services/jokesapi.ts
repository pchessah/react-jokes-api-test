const ENDPOINT_URL = "https://retoolapi.dev/zu9TVE/jokes"

export const getJokes = () => {
  try {
    return fetch(ENDPOINT_URL)
    
  } catch (error) {
    console.error(error);
  }

}

export const postJokes = () => {

}

export const putJoke = (id:number) =>{

}

export const patch = (id:number) =>{
  
}

export const deleteJoke = (id:number) =>{
  
}

export const getJokesByFilter = (filter:any) =>{

}


export const getJokesByPaginate = (page:number, limit:number) =>{
  const append = `?\_page=${page}&\_limit=${limit}`;
  try {
    return fetch(ENDPOINT_URL + append)
  } catch (error) {
    console.error(error);
  }

}



export const getJokeById = (id:number) => {

}