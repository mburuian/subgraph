import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';

// Updated GraphQL query to fetch only transfers data
const GET_DATA = gql`
 {
  transfers(
    where: { 
      blockNumber_gte: "20798676", 
      blockNumber_lte: "20798676" 
    }, 
    orderBy: blockTimestamp, 
    orderDirection: desc
     first: 12
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
  const { loading, error, data } = useQuery(GET_DATA);

  // Display loading state
  if (loading) return <p>Loading...</p>;

  // Display error state
  if (error) return <p>Error: {error.message}</p>;

  // Ensure data is defined before rendering
  return (
    <div>
      <h1>Welcome to UNO_Get Crypto Currencies</h1>
      
      {/* Transfers Section */}
      <h2>Transfers</h2>
      {data?.transfers?.length > 0 ? (
        <table border="1" cellPadding="10">
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
            {data.transfers.map((transfer) => (
              <tr key={transfer.id}>
                <td>{transfer.id}</td>
                <td>{transfer.value}</td>
                <td>{transfer.from}</td>
                <td>{transfer.to}</td>
                <td>{transfer.transactionHash}</td>
                <td>{transfer.blockTimestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transfers data available.</p>
      )}

      {/* Placeholder for Issues and Redeems */}
      <h2>Issues</h2>
      <p>No issues data available.</p>

      <h2>Redeems</h2>
      <p>No redeems data available.</p>
    </div>
  );
}

export default App;
