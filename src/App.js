import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import Main from "./component/Main";

function App() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
      {/* <PersistGate persistor={persister}> */}
      <BrowserRouter>
        <Main />
        <Routes>
          <Route exact path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
      {/* </PersistGate> */}
      {/* </Provider> */}
    </div>
  );
}

export default App;
