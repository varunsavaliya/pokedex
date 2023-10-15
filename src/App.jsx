import { Link } from "react-router-dom";
import "./App.css";
import CustomRoutes from "./Routes/CustomRoutes";

function App() {
  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <h1 className="pokedex-header text-dark my-3" ><Link to="/" className="text-dark text-decoration-none"> Pokedex</Link></h1>
        <CustomRoutes />
      </div>
    </>
  );
}

export default App;
