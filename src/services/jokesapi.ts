import { IJoke } from "../interfaces/joke.interface";

const ENDPOINT_URL = "https://retoolapi.dev/zu9TVE/jokes";

export const getJokes = () => {
  try {
    return fetch(ENDPOINT_URL);
  } catch (error) {
    console.error(error);
  }
};

export const postJokes = () => {};

export const updateJoke = (jokeDetails: IJoke) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jokeDetails),
  };

  try {
    return fetch(`${ENDPOINT_URL}/${jokeDetails.id}`, requestOptions);
  } catch (error) {
    console.error("There was an error!", error);
  };
};

export const patch = (id: number) => {};

export const deleteJoke = (id: number) => {};

export const getJokesByFilter = (filter: any) => {};

export const getJokesByPaginate = (page: number, limit: number) => {
  const append = `?\_page=${page}&\_limit=${limit}`;
  try {
    return fetch(ENDPOINT_URL + append);
  } catch (error) {
    console.error(error);
  }
};

export const getJokeById = (id: number) => {
  try {
    return fetch(`${ENDPOINT_URL}/${id}`);
  } catch (error) {
    console.error(error);
  }
};
