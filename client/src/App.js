import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import VendorList from './pages/vendors'; // Add this line

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // Return the headers to the context so HTTP link can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
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
            <Route path="/vendors" element={<VendorList />} /> {/* Add this line */}
            <Route path="*" element={<h1 className="display-2">Wrong page!</h1>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;


