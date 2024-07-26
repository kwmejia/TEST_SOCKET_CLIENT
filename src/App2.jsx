import React, { useState } from 'react';
import { sendEncryptedRequest } from './config/create-user';

function App() {
  const [response, setResponse] = useState(null);

  const sendRequest = async () => {
    const data = {
      email: "testencripotw@gmail.com",
      name: "Test asdsadasdasd",
      password: "He110QW0lrs23$",
      cellphone: "+573137991224",
      documentType: "CITIZENSHIP_ID",
      personType: "NATURAL",
      documentNumber: "1002824812",
      gender: "MALE",
      birthDate: "2024-06-26T13:41:52.853Z",
      companyName: "Riwi",
      companyEmail: "company@example.com"
    };

    try {
      const resp = await sendEncryptedRequest('http://localhost:3000/api/users/register', data);
      setResponse(resp);
      console.log(resp);
    } catch (error) {
      console.error('Error sending encrypted request:', error);
    }
  };

  return (
    <div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={sendRequest}>
          Send request
        </button>
        {response && (
          <div>
            <h2>Response:</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
