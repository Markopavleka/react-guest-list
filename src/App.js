import React, { useState } from 'react';

];
export default function App() {
  const [guestName, setGuestName] = useState('');
  const [guestLastName, setGuestLastName] = useState('');

  const [updateGuest, setUpdateGuest] = useState('');
  const handleGuestName = (event) => {
    if (event.key === 'Enter') {
      const fullName = `${guestName} ${guestLastName}`;
      return setUpdateGuest(fullName);
    }
  };
  return (
    <div>
      <input
        placeholder="First name"
        value={guestName}
        onChange={(event) => {
          setGuestName(event.currentTarget.value);
        }}
      />
      <input
        placeholder="Last name"
        value={guestLastName}
        onChange={(event) => {
          setGuestLastName(event.currentTarget.value);
        }}
        onKeyDown={handleGuestName}
      />
      <button onClick={handleGuestName}>Return</button>
      <div>{updateGuest}</div>
    </div>
  );
}
