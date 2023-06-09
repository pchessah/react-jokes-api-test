import { useCheckAuthorization } from "..";
import JokesTable from "../components/JokesTable";
import { tokenIsValid } from "../services/localStorage.api";
import Login from "./Login";

interface Props {}

function Home(props: Props) {
  const {} = props;
  const isAuthenticated = useCheckAuthorization(tokenIsValid());

  return (
    <>
      {isAuthenticated ? (
        <div className="container">
          <>
            <section className="jokes-table-container">
              <JokesTable />
            </section>
          </>
        </div>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
}

export default Home;
