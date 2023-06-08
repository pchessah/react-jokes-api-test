import React, { useEffect, useState } from "react";
import { getJokes, getJokesByPaginate } from "../services/jokesapi";
import { IJoke } from "../interfaces/joke.interface";
import moment from "moment";

interface Props {}

function JokesTable(props: Props) {
  const {} = props;
  const [jokes, setJokes] = useState<IJoke[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortByViews, setSortByViews] = useState<"asc" | "desc" | "nosort">(
    "nosort"
  );
  const [sortByDate, setSortByDate] = useState<"asc" | "desc" | "nosort">(
    "nosort"
  );

  const getJokesBypagenumber = () => {
    getJokesByPaginate(pageNumber, pageSize)?.then(async (res) => {
      const a = await res.json();
      const converted = a.map((joke: IJoke) => {
        return {
          ...joke,
          CreatedAt: moment(joke.CreatedAt).format("Do MMM YY"),
        };
      });
      setJokes(converted);
    });
  };

  const changePageSize = (event: any) => {
    setPageSize(Number(event.target.value));
  };

  const changePageNumber = (action: "prev" | "next") => {
    if (pageNumber === 1 && action === "prev") {
      return;
    }

    if (jokes.length < pageSize && action === "next") {
      return;
    }

    if (action === "next") {
      const newPageNumber = pageNumber + 1;
      setPageNumber(newPageNumber);
    }

    if (action === "prev") {
      const newPageNumber = pageNumber - 1;
      setPageNumber(newPageNumber);
    }

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

  const onChangeDateSort = () => {
    switch (sortByDate) {
      case "nosort":
        setSortByDate("asc");
        const ascending = jokes.sort(
          (a, b) =>
            new Date(a.CreatedAt).valueOf() - new Date(b.CreatedAt).valueOf()
        );
        setJokes(ascending);
        break;
      case "asc":
        setSortByDate("desc");
        const descending = jokes.sort(
          (a, b) =>
            new Date(b.CreatedAt).valueOf() - new Date(a.CreatedAt).valueOf()
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
        <button
          onClick={() => changePageNumber("prev")}
          disabled={pageNumber === 1}
        >
          {" "}
          Previous{" "}
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
        <button
          disabled={jokes.length < pageSize}
          onClick={() => changePageNumber("next")}
        >
          {" "}
          Next{" "}
        </button>
      </div>
    </>
  );
}

export default JokesTable;
