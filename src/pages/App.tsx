import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import SingleJoke from "./SingleJoke";
import Login from "./Login";

interface Props {}

const router = createBrowserRouter([
  {
    path: "all-jokes",
    element: <Home />,
  },
  {
    path: "all-jokes/joke/:jokeId",
    element: <SingleJoke />,
  },
  {
    path: "all-jokes/joke/create",
    element: <SingleJoke />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);

function App(props: Props) {
  const {} = props;
  const [theme, setTheme] = useState("light");

  const toggleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`app ${theme}`}>
      <button className="button-32" role="button" onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
