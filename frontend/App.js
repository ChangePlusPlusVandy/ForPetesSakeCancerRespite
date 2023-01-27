import { NativeRouter } from "react-router-native";
import CustomRouter from "./src/CustomRouter";

const App = () => {
  return (
    <NativeRouter>
      <CustomRouter />
    </NativeRouter>
  );
};

export default App;