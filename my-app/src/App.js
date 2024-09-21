import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';

// GraphQL queries
const GET_TRANSFERS_BY_BLOCK = gql`
  query GetTransfersByBlock($block: String!) {
    transfers(
      where: { block: $block }
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

const GET_ALL_BATCHES = gql`
  query GetAllBatches {
    batches {
      id
      manufacturer
      manufactureDate
      expiryDate
      status
    }
  }
`;

function App() {
  // Use queries to fetch data
  const { loading: loadingTransfers, error: errorTransfers, data: dataTransfers } = useQuery(GET_TRANSFERS_BY_BLOCK, {
    variables: { block: "yourBlockValue" }, // Replace with actual block value as needed
  });
  const { loading: loadingBatches, error: errorBatches, data: dataBatches } = useQuery(GET_ALL_BATCHES);

  // Display loading state
  if (loadingTransfers || loadingBatches) return <p>Loading...</p>;

  // Display error state
  if (errorTransfers) return <p>Error (Transfers): {errorTransfers.message}</p>;
  if (errorBatches) return <p>Error (Batches): {errorBatches.message}</p>;

  return (
    <div>
      <h1>Subgraph Data</h1>

      {/* Transfers Section */}
      <h2>Transfers</h2>
      {dataTransfers && dataTransfers.transfers && dataTransfers.transfers.length > 0 ? (
        <ul>
          {dataTransfers.transfers.map((transfer) => (
            <li key={transfer.id}>
              ID: {transfer.id}, Value: {transfer.value}, From: {transfer.from}, 
              To: {transfer.to}, Transaction Hash: {transfer.transactionHash}, 
              Block Timestamp: {transfer.blockTimestamp}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transfers data available.</p>
      )}

      {/* Batches Section */}
      <h2>Batches</h2>
      {dataBatches && dataBatches.batches && dataBatches.batches.length > 0 ? (
        <ul>
          {dataBatches.batches.map((batch) => (
            <li key={batch.id}>
              ID: {batch.id}, Manufacturer: {batch.manufacturer}, 
              Manufacture Date: {batch.manufactureDate}, Expiry Date: {batch.expiryDate}, 
              Status: {batch.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No batches data available.</p>
      )}

      {/* Placeholder for other sections */}
      <h2>Issues</h2>
      <p>No issues data available.</p>

      <h2>Redeems</h2>
      <p>No redeems data available.</p>
    </div>
  );
}

export default App;
