import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import VendorList from "./pages/vendors";
import Profile from "./pages/Profile";
import MyServices from "./pages/MyServices";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="*" element={<VendorList />} />{" "}
            <Route path="/myservices/:profileId" element={<MyServices />} />{" "}
            <Route path="/profiles/:profileId" element={<Profile />} />{" "}
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
