import { useState } from 'react';
import { api } from '~/services/api';

const LatencyPage = () => {
  const { data: latencyData, isLoading, refetch } = api.employee.latencyCheck.useQuery();

  if (isLoading) return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;

  return (
    <section style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Latency Details</h2>
      <button onClick={() => refetch()} style={{ marginBottom: '20px' }}>
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
          <h3>Employees Data</h3>
          <ul>
            {latencyData.employees.map((employee, index) => (
              <li key={index}>
                {employee.id}: {employee.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default LatencyPage;
