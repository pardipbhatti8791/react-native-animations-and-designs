import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";

import AppNavigator from "./navigator/AppNavigator";

const httpLink = createHttpLink({
  uri: "http://www.gbcoders.com:1337/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    credentials: "include"
    // headers: {
    //   ...headers,
    //   authorization: `Bearer dgdg`
    // }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const initialState = {
  action: "closeMenu",
  name: "Stranger",
  avatar: "https://cl.ly/c2077ba6f3de/download/avatar-default.jpg"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLOSE_MENU":
      return { ...state, action: "closeMenu" };
    case "OPEN_MENU":
      return { ...state, action: "openMenu" };
    case "UPDATE_NAME":
      return { ...state, name: action.name };
    case "UPDATE_AVATAR":
      return { ...state, avatar: action.avatar };
    case "OPEN_LOGIN":
      return { ...state, action: "openLogin" };
    case "CLOSE_LOGIN":
      return { ...state, action: "closeLogin" };
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
