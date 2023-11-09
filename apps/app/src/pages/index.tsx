import { useState } from 'react';
import { api } from '~/services/api';

const MainPage = () => {
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeTitle, setNewEmployeeTitle] = useState('');


  const { data: employees, isLoading, refetch } = api.employee.all.useQuery();
  const {mutateAsync: addEmployeeMutation} = api.employee.create.useMutation();
  const {mutateAsync: deleteEmployeeMutation} = api.employee.delete.useMutation();

  const handleAddEmployee = async () => {
    await addEmployeeMutation({ name: newEmployeeName, title: newEmployeeTitle });
    setNewEmployeeName('');
    setNewEmployeeTitle('');
    await refetch();
  };

  const handleDeleteEmployee = async (employeeId: number) => {
    await deleteEmployeeMutation(employeeId);
    await refetch();
  };
  if (isLoading) return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;

  return (
    <section style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1 style={{ color: '#333' }}>Employees</h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {employees?.map(employee => (
          <div key={employee.id} style={{ flex: '1 0 220px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <p style={{ marginTop: 0, fontWeight: 'bold' }}>Name:</p>
            <h3 style={{ marginTop: 0 }}>{employee.name}</h3>
            <p style={{ fontWeight: 'bold' }}>Title:</p>
            <p>{employee.title}</p>
            <button 
              style={{ 
                padding: '5px 10px', 
                cursor: 'pointer', 
                backgroundColor: '#ff4d4f', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                marginTop: '10px'
              }}
              onClick={() => handleDeleteEmployee(employee.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '4px', maxWidth: '400px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input 
            id="name"
            placeholder="Name"
            style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
            value={newEmployeeName}
            onChange={(e) => setNewEmployeeName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
          <input 
            id="title"
            placeholder="Title"
            style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
            value={newEmployeeTitle}
            onChange={(e) => setNewEmployeeTitle(e.target.value)}
          />
        </div>
        <button 
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px', width: '100%' }}
          onClick={handleAddEmployee}
        >
          Add Employee
        </button>
      </div>
    </section>
  );
};


export default MainPage;

