import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://service.coworking.riwicloud.com', {
  transports: ['websocket'],
});

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    fetchSpaces();
    // Conectar al servidor WebSocket y recibir actualizaciones en tiempo real
    socket.on('connect', () => {
      console.log('Connected to server');
   
    });

    socket.on('spaceStatusUpdated', (data) => {
      console.log('Space Status Updated:', data);
      updateSpaceStatus(data.spaceId, data.status);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('spaceStatusUpdated');
      socket.off('disconnect');
    };
  }, []);

  const fetchSpaces = () => {
    fetch('https://service.coworking.riwicloud.com/api/spaces?statusSpaces=true', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then(({ data }) => {
        console.log(data)
        setSpaces(data);
      })
      .catch((error) => console.error('Error fetching spaces:', error));
  };

  const updateSpaceStatus = (spaceId, status) => {
    setSpaces((prevSpaces) =>
      prevSpaces.map((space) =>
        space.id === spaceId ? { ...space, status } : space
      )
    );
  };

  return (
    <div>
      <h1>Spaces</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {spaces.map((space) => (
            <tr key={space.id}>
              <td>{space.name}</td>
              <td>
                <span className={space.status == "ocupado" ? "chip-danger" : "chip-success"}>
                    {space.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spaces;
