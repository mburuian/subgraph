import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';

// GraphQL query
const GET_TRANSFERS_BY_BLOCK = gql`
  query GetTransfersByBlock($block: String!, $first: Int!) {
  transfers(
    where: { block: $block }
    first: $first
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    value
    from
    to
    transactionHash
    blockTimestamp
  }
}

`;

function App() {
  // Use queries to fetch data (with block number and limit of 20 transfers)
  const { loading: loadingTransfers, error: errorTransfers, data: dataTransfers } = useQuery(GET_TRANSFERS_BY_BLOCK, {
    variables: { block: "20798676", first: 20 }, // Using block number 20798676 and limiting to 20 results
  });

  // Display loading state
  if (loadingTransfers) return <p>Loading...</p>;

  // Display error state
  if (errorTransfers) return <p>Error (Transfers): {errorTransfers.message}</p>;

  return (
    <div>
      <h1>Subgraph Data</h1>

      {/* Transfers Section */}
      <h2>Transfers</h2>
      {dataTransfers && dataTransfers.transfers && dataTransfers.transfers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Value</th>
              <th>From</th>
              <th>To</th>
              <th>Transaction Hash</th>
              <th>Block Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {dataTransfers.transfers.map((transfer) => (
              <tr key={transfer.id}>
                <td>{transfer.id}</td>
                <td>{transfer.value}</td>
                <td>{transfer.from}</td>
                <td>{transfer.to}</td>
                <td>{transfer.transactionHash}</td>
                <td>{new Date(transfer.blockTimestamp * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transfers data available.</p>
      )}
    </div>
  );
}

export default App;
