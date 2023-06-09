import { useCheckAuthorization } from "..";
import { setToken, tokenIsValid } from "../services/localStorage.api";
import { redirect, useNavigate } from "react-router-dom";

interface Props {}

function Login(props: Props) {
  const {} = props;
  const navigate = useNavigate();

  const isAuthenticated = useCheckAuthorization(tokenIsValid())

  if(isAuthenticated){
    navigate("/all-jokes");
  };

  const login = () => {
    setToken();
    if (tokenIsValid()) {
      navigate("/all-jokes");
    }
  };

  return (
    <div className="container">
      <h1>Ready to laugh? 😆</h1>
      <button onClick={login} className="button-3">
        Log In
      </button>
    </div>
  );
}

export default Login;
