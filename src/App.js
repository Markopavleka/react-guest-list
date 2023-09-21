import './App.css';
import { useState } from 'react';

export default function App() {
  const [guestName, setGuestName] = useState('');
  const [guestLastName, setGuestLastName] = useState('');
  const [users, setUsers] = useState([]);
  const [attending, setAttending] = useState(false);
  const handleGuestAttend = (isAttending) => {
    return isAttending ? 'attend' : 'not attending';
  };
  const handleGuestName = (event) => {
    if (event.key === 'Enter') {
      const newGuestId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      const newGuest = {
        id: newGuestId,
        name: {
          firstName: guestName,
          lastName: guestLastName,
        },
        attend: handleGuestAttend(attending),
      };
      setUsers([...users, newGuest]);
      console.log(newGuest);
      setGuestName('');
      setGuestLastName('');
    }
  };
  const handleDeleteUser = (indexToDelete) => {
    const updatedUsers = [...users];
    updatedUsers.splice(indexToDelete, 1);

    setUsers(updatedUsers);
  };

  return (
    <div className="Container">
      <label htmlFor="firstName" data-test-id="guest">
        <input
          data-test-id="guest"
          placeholder="First name"
          value={guestName}
          onChange={(event) => {
            setGuestName(event.currentTarget.value);
          }}
          required
        />
      </label>
      <label htmlFor="lastName" data-test-id="guest">
        <input
          data-test-id="guest"
          placeholder="Last name"
          value={guestLastName}
          onChange={(event) => {
            setGuestLastName(event.currentTarget.value);
          }}
          onKeyDown={handleGuestName}
          required
        />
      </label>
      <div className="GuestContainer">
        {users.map((user, index) => {
          return (
            <div key={`user-id-${user.id} `}>
              <div data-test-id="guest">
                {user.name.firstName} {user.name.lastName}
                <button
                  aria-label="Remove"
                  key={`user-id-${user.id} `}
                  onClick={() => handleDeleteUser(index)}
                >
                  X
                </button>
                <br />
                <input
                  type="checkbox"
                  aria-label="attending"
                  checked={attending}
                  onChange={(event) => {
                    setAttending(event.currentTarget.checked);
                  }}
                />
                <div>{user.attend}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
