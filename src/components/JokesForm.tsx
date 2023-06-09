import { useEffect, useState } from "react";
import { IJoke } from "../interfaces/joke.interface";
import { updateJoke } from "../services/jokesapi";

interface Props {
  joke: IJoke;
}

function JokesForm(props: Props) {
  const { joke } = props;
  const [jokeDetails, setJokeDetails] = useState<IJoke>({} as IJoke);
  const [ errorObject, setErrorObject] = useState({} as any)

  const setJokeTitle = (title: string) => {
    const updatedJoke: IJoke = {
      ...jokeDetails,
      Title: title,
    };
    setJokeDetails(updatedJoke);
  };

  const setJokeBody = (body: string) => {
    const updatedJoke: IJoke = {
      ...jokeDetails,
      Body: body,
    };
    setJokeDetails(updatedJoke);
  };

  const setJokeAuthor= (author: string) => {
    const updatedJoke: IJoke = {
      ...jokeDetails,
      Author: author,
    };
    setJokeDetails(updatedJoke);
  };

  const setJokeViews = (views: string) => {
    if(Number(views) < 0 ){
      alert("Views must be a 0 and above.");
      return;
    }
    const updatedJoke: IJoke = {
      ...jokeDetails,
      Views: Number(views),
    };
    setJokeDetails(updatedJoke);
  };

  const saveJokeDetails = () => {
    debugger
    
    // return updateJoke(jokeDetails)?.then(res => {
    //   debugger
    // });
  };


  const checkFormIsDisabled = () => {

  let isValid = ((!!(jokeDetails?.Author) && !!(jokeDetails?.Body ))
               &&(!!(jokeDetails?.Title) && !!(jokeDetails?.Views)));
   return !isValid ;

  }

  useEffect(() => {
    setJokeDetails(joke)
  }, [joke]);

  return (
    <>
      <form>
        <section className="field-container">
          <label>Enter Title</label>
          <input
           className={errorObject.title ? "error" :  ""}
            required
            title="title"
            type="text"
            value={jokeDetails.Title}
            onChange={(e) => setJokeTitle(e.target.value)}
          />
        </section>

        <section className="field-container">
          <label>Enter Body</label>
          <textarea
           className={errorObject.body ? "error" :  ""}
            required
            title="body"
            value={jokeDetails.Body}
            onChange={(e) => setJokeBody(e.target.value)}
          />
        </section>

        <section className="field-container">
          <label>Enter Author</label>
          <input  className={errorObject.author ? "error" :  ""}
            required
            title="author"
            value={jokeDetails.Author}
            onChange={(e) => setJokeAuthor(e.target.value)}
          />
        </section>

        <section className="field-container">
          <label>Enter Views</label>
          <input
          className={errorObject.views ? "error" :  ""}
            required
            title="views"
            type="number"
            value={jokeDetails.Views}
            onChange={(e) => setJokeViews(e.target.value)}
          />
        </section>

        <section className="action-row">
          <button className="button-45" role="button" >
            Cancel
          </button>

          <button className="button-3" disabled={checkFormIsDisabled()} onClick={saveJokeDetails} role="button">
            Save
          </button>
        </section>
      </form>
    </>
  );
}

export default JokesForm;
