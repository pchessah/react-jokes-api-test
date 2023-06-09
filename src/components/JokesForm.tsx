import { useEffect, useState } from "react";
import { IJoke } from "../interfaces/joke.interface";
import { createNewJoke, updateJoke } from "../services/jokesapi";
import { useNavigate } from "react-router-dom";


interface Props {
  joke: IJoke;
  isUpdateMode: boolean;
}

function JokesForm(props: Props) {
  const { joke, isUpdateMode } = props;
  const navigate = useNavigate();
  const [jokeDetails, setJokeDetails] = useState<IJoke>({} as IJoke);
  const [isSaving, setisSaving] = useState(false);

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

  const setJokeAuthor = (author: string) => {
    const updatedJoke: IJoke = {
      ...jokeDetails,
      Author: author,
    };
    setJokeDetails(updatedJoke);
  };

  const setJokeViews = (views: string) => {
    if (Number(views) < 0) {
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
    setisSaving(true);

    const functionToUse  = isUpdateMode ? updateJoke(jokeDetails) : createNewJoke(jokeDetails)

    return functionToUse?.then((res) => {
      setisSaving(false);
      alert("Joke details saved");
      navigate(`/`);
    });
  };

  const checkFormIsDisabled = () => {
    let isValid =
      !!jokeDetails?.Author &&
      !!jokeDetails?.Body &&
      !!jokeDetails?.Title &&
      !!jokeDetails?.Views;
    return !isValid;
  };

  useEffect(() => {
    if(!!joke){
      setJokeDetails(joke);
    } else {
      const newJokeDetails: IJoke = {
        id: new Date().getTime(),
        Author: null as any,
        Title: null as any,
        Body: null as any,
        CreatedAt: new Date().getTime(),
        Views: null as any
      };
      setJokeDetails(newJokeDetails);
    }
  }, [joke]);

  return (
    <>
      {!isSaving ? (
        <form>
          <section className="field-container">
            <label>Enter Title</label>
            <input
              required
              title="title"
              type="text"
              value={jokeDetails?.Title}
              onChange={(e) => setJokeTitle(e.target.value)}
            />
          </section>

          <section className="field-container">
            <label>Enter Body</label>
            <textarea
              required
              title="body"
              value={jokeDetails?.Body}
              onChange={(e) => setJokeBody(e.target.value)}
            />
          </section>

          <section className="field-container">
            <label>Enter Author</label>
            <input
              required
              title="author"
              value={jokeDetails?.Author}
              onChange={(e) => setJokeAuthor(e.target.value)}
            />
          </section>

          <section className="field-container">
            <label>Enter Views</label>
            <input
              required
              title="views"
              type="number"
              value={jokeDetails?.Views}
              onChange={(e) => setJokeViews(e.target.value)}
            />
          </section>

          <section className="action-row">
            <button className="button-45" role="button">
              Cancel
            </button>

            <button
              className="button-3"
              disabled={checkFormIsDisabled()}
              onClick={saveJokeDetails}
              role="button"
            >
              Save
            </button>
          </section>
        </form>
      ) : (
        <div className="loader">Is Saving...please wait</div>
      )}
    </>
  );
}

export default JokesForm;
