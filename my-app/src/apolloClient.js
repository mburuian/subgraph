// src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/89385/uno_usdt/version/latest', // replace with your subgraph URL
  cache: new InMemoryCache(),
});

export default client;
