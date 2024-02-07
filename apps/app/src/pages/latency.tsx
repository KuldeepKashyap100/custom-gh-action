import { useState } from 'react';
import { api } from '~/services/api';

const LatencyPage = () => {
  const { data: latencyData, isLoading, refetch } = api.employee.latencyCheck.useQuery();

  if (isLoading) return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2 style={{fontSize: "25px", fontWeight: "800"}}>Latency Details</h2>
      <button onClick={() => refetch()} style={{ marginBottom: '20px', backgroundColor: "#408BDF", color: "white", padding: "4px", borderRadius: "4px" }}>
        Refetch Data
      </button>
      {latencyData && (
        <>
          <div>
            <strong>Prisma Connection Check:</strong> {latencyData.latency.prismaConnectionCheck.toFixed(2)}ms
          </div>
          <div>
            <strong>Prisma findMany Employees:</strong> {latencyData.latency.prismaFindMany.toFixed(2)}ms
          </div>
          <h3>Employees Data (Raw JSON)</h3>
          <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
            {JSON.stringify(latencyData.employees, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
};

export default LatencyPage;


