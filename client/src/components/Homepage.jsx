import React, { useState } from 'react';
import Navbar from './Navbar';
import Landingpage from './Landingpage';
import LoginForm from '../pages/LoginForm';
import SignupForm from '../pages/SignupForm';
import Vendors from '../pages/Vendors';
import ProfilePage from './ProfilePage';
import SearchResults from './SearchResults';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
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

export default function Homepage(param) {
  const [currentPage, setCurrentPage] = useState('Home');
  const [currentCity, setCurrentCity] = useState('');

  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Landingpage />;
    }
    if (currentPage === 'Login') {
      return <LoginForm />;
    }
    if (currentPage === 'SignUp') {
      return <SignupForm />;
    }
    if (currentPage === 'Profile') {
      return <ProfilePage />;
    }
    if (currentPage === 'Vendors') {
      return <Vendors />;
    }
  };

  const searchForCity = (currentCity) => {
    return <SearchResults currentCity={currentCity} />;
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleCityChange = (city) => setCurrentCity(city);

  return (
    <ApolloProvider client={client}>
      <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* <Landingpage
        currentCity={currentCity}
        handleCityChange={handleCityChange}
      /> */}
      {renderPage()}
      {/* {searchForCity()} */}
    </ApolloProvider>
  );
}
