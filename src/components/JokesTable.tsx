import React, { useEffect, useState } from "react";
import { getJokes, getJokesByPaginate } from "../services/jokesapi";
import { IJoke } from "../interfaces/joke.interface";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { removeToken, tokenIsValid } from "../services/localStorage.api";

interface Props {}

function JokesTable(props: Props) {
  const {} = props;
  const navigate = useNavigate();

  //State
  const [jokes, setJokes] = useState<IJoke[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortByViews, setSortByViews] = useState<"asc" | "desc" | "nosort">(
    "nosort"
  );
  const [sortByDate, setSortByDate] = useState<"asc" | "desc" | "nosort">(
    "nosort"
  );

  //Helper functions
  const getJokesBypagenumber = () => {
    getJokesByPaginate(pageNumber, pageSize)?.then(async (res) => {
      const a = await res.json();
      const converted = a.map((joke: IJoke) => {
        return {
          ...joke,
          CreatedAt: moment(joke.CreatedAt).format("DD MMM YY"),
        };
      });
      // .filter((j:IJoke) => {

      //   //Remove values that do not have all properties
      //   if(Object.values(j).length === 6 ){
      //     return j
      //   }
      // });
      setJokes(converted);
    });
  };

  const changePageSize = (event: any) => {
    setPageSize(Number(event.target.value));
  };

  const changePageNumber = (action: "prev" | "next") => {
    if (pageNumber === 1 && action === "prev") {
      return;
    };

    if (jokes.length < pageSize && action === "next") {
      return;
    };

    if (action === "next") {
      const newPageNumber = pageNumber + 1;
      setPageNumber(newPageNumber);
    };

    if (action === "prev") {
      const newPageNumber = pageNumber - 1;
      setPageNumber(newPageNumber);
    };

    setSortByViews("nosort");
  };

  const onChangeSortByViews = () => {
    switch (sortByViews) {
      case "nosort":
        setSortByViews("asc");
        const ascending = jokes.sort((a, b) => a.Views - b.Views);
        setJokes(ascending);
        break;
      case "asc":
        setSortByViews("desc");
        const descending = jokes.sort((a, b) => b.Views - a.Views);
        setJokes(descending);
        break;
      case "desc":
        setSortByViews("nosort");
        setPageNumber(pageNumber);
        setPageSize(pageSize);
        break;
      default:
        break;
    }
  };

  const goToJoke = (id: number) => {
    navigate(`joke/${id}`);
  };

  const goToCreateJoke = () => {
    navigate(`joke/create`);
  }

  const logout = () => {
    removeToken();
    if(tokenIsValid()){
      return;
    } else {
      navigate("/");  
    };
  };

  const onChangeDateSort = () => {
    switch (sortByDate) {
      case "nosort":
        setSortByDate("asc");
        const ascending = jokes.sort((a, b) => {
          return moment(a.CreatedAt).valueOf() - moment(b.CreatedAt).valueOf();
        });
        setJokes(ascending);
        break;
      case "asc":
        setSortByDate("desc");
        const descending = jokes.sort(
          (a, b) =>
            moment(b.CreatedAt).valueOf() - moment(a.CreatedAt).valueOf()
        );
        setJokes(descending);
        break;
      case "desc":
        setSortByDate("nosort");
        setPageNumber(pageNumber);
        setPageSize(pageSize);
        break;
      default:
        break;
    }
  };

  const getViewsClass = (views: number) => {
    if (views >= 0 && views <= 25) {
      return "tomato";
    } else if (views >= 26 && views <= 50) {
      return "orange";
    } else if (views >= 50 && views <= 75) {
      return "yellow";
    } else if (views >= 76 && views <= 100) {
      return "green";
    } else {
      return "black";
    }
  };

  useEffect(() => {
    getJokesBypagenumber();
  }, [pageSize, pageNumber]);

  return (
    <>
      <div className="action-row">
        <button className="button-3" onClick={goToCreateJoke}>Create Joke</button>
        <button className="button-45" onClick={logout}>Logout</button>

      </div>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Author</td>
            <td className="views-header">
              <span>Created at</span>
              {sortByDate === "desc" ? (
                <div onClick={onChangeDateSort}>🔽</div>
              ) : sortByDate === "asc" ? (
                <div onClick={onChangeDateSort}>🔼</div>
              ) : (
                <div onClick={onChangeDateSort}>≈</div>
              )}
            </td>
            <td className="views-header">
              <span>Views</span>
              {sortByViews === "desc" ? (
                <div onClick={onChangeSortByViews}>🔽</div>
              ) : sortByViews === "asc" ? (
                <div onClick={onChangeSortByViews}>🔼</div>
              ) : (
                <div onClick={onChangeSortByViews}>≈</div>
              )}
            </td>
          </tr>
        </thead>
        <tbody>
          {jokes &&
            jokes.map((joke) => {
              return (
                <tr key={joke.id}>
                  <td onClick={() => goToJoke(joke.id)} className="title">
                    {joke.Title}
                  </td>
                  <td>{joke.Author} </td>
                  <td>{joke.CreatedAt}</td>
                  <td className={getViewsClass(joke.Views)}>{joke.Views}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="action-row">
        <button className="button-8" role="button"
          onClick={() => changePageNumber("prev")}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <select
          onChange={changePageSize}
          value={pageSize}
          title="pages"
          id="pages"
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <button className="button-8" role="button"
          disabled={jokes.length < pageSize}
          onClick={() => changePageNumber("next")}
        >
          Next
        </button>
      </div>

    
    </>
  );
}

export default JokesTable;
