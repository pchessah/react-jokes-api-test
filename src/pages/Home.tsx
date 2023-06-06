import React from "react";
import JokesTable from "../components/JokesTable";

interface Props {}

function Home(props: Props) {
  const {} = props;

  return (
    <>
      <div className="container">
        <h1>Ready to laugh? 😆</h1>
        <section className="jokes-table-container">
          <JokesTable />
        </section>
      </div>
    </>
  );
}

export default Home;
