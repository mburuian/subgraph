
import React from 'react';
import ReactDOM from 'react-dom/client'; // updated import
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

// Create Apollo Client
const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/89385/uno_usdt/version/latest',// Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}> {/* ApolloProvider wraps App */}
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

