import React, { useEffect, useState } from "react";
import { getJokes, getJokesByPaginate } from "../services/jokesapi";
import { IJoke } from "../interfaces/joke.interface";

interface Props {}

function JokesTable(props: Props) {
  const {} = props;
  const [jokes, setJokes] = useState<IJoke[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);

  const getJokesBypagenumber = () => {
    getJokesByPaginate(pageNumber, pageSize)?.then(async (res) => {
      const a = await res.json();
      const converted = a.map((joke: IJoke) => {
        return { ...joke, CreatedAt: new Date(joke.CreatedAt).toDateString() };
      });
      setJokes(converted);
    });
  };

  const changePageSize = (event: any) => {
    setPageSize(Number(event.target.value));
  };

  const changePageNumber = ( action:'prev' | 'next') => {
    if(pageNumber === 1 && action === 'prev'){
      return;
    }

    if(action === 'next'){
      const newPageNumber = pageNumber+1;
      setPageNumber(newPageNumber);
    };

    if(action === "prev"){
      const newPageNumber = pageNumber - 1;
      setPageNumber(newPageNumber);
    };

  };

  useEffect(() => {
    getJokesBypagenumber();
  }, [pageSize, pageNumber]); 

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Author</td>
            <td>Created at</td>
            <td>Views</td>
          </tr>
        </thead>
        <tbody>
          {jokes &&
            jokes.map((joke) => {
              return (
                <tr key={joke.id}>
                  <td>{joke.Title}</td>
                  <td>{joke.Author} </td>
                  <td>{joke.CreatedAt}</td>
                  <td>{joke.Views}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="action-row">
        <button onClick={() => changePageNumber('prev')} disabled={pageNumber === 1}> Previous </button>
        <select
          onChange={changePageSize}
          value={pageSize}
          title="pages"
          id="pages"
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <button disabled={jokes.length < pageSize} onClick={() => changePageNumber('next')}> Next </button>
      </div>
    </>
  );
}

export default JokesTable;
