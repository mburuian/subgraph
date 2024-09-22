import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import client from './client'; // Ensure you're importing the client correctly

// Select the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application with ApolloProvider
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
