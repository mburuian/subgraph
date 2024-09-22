// src/client.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/89385/uno_usdt/version/latest', // Your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
