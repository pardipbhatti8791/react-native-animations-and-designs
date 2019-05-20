import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { InMemoryCache } from "apollo-boost";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import AppNavigator from "./navigator/AppNavigator";

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = "dsfdsfsdf";
  // return the headers to the context so httpLink can read them
  return {
    credentials: "include",
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "nope"
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const initialState = {
  action: "closeMenu",
  name: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLOSE_MENU":
      return { action: "closeMenu" };
    case "OPEN_MENU":
      return { action: "openMenu" };
    case "UPDATE_NAME":
      return { name: action.name };
    default:
      return state;
  }
};

const store = createStore(reducer);

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
