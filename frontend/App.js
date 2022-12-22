import { BrowserRouter } from "react-router-dom";
import Router from "./src/Router";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;