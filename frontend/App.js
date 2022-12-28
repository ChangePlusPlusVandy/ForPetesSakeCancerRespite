import { Router } from "react-router-dom";
import CustomRouter from "./src/CustomRouter";
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

const App = () => {
  return (
    <Router history={history}>
      <CustomRouter />
    </Router>
  );
};

export default App;