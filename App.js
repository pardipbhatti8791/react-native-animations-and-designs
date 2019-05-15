import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";

const initialState = {
  action: "closeMenu"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLOSE_MENU":
      return { action: "closeMenu" };
      break;
    case "OPEN_MENU":
      return { action: "openMenu" };
      break;
    default:
      return state;
  }
};

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}

export default App;
