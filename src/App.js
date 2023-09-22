import './App.css';
import { useState } from 'react';

const baseUrl = 'http://localhost:4000';
const response = await fetch(`${baseUrl}/guests`);
const allGuests = await response.json();

export default function App() {
  const [guestName, setGuestName] = useState('');
  const [guestLastName, setGuestLastName] = useState('');
  const [guest, setGuest] = useState([]);

  const handleGuestAttend = (index) => {
    const updateAttending = [...guest];
    updateAttending[index].attend = !updateAttending[index].attend;
    setGuest(updateAttending);
  };
  const handleGuestName = (event) => {
    if (event.key === 'Enter') {
      const newGuestId = guest.length > 0 ? guest[guest.length - 1].id + 1 : 1;
      const newGuest = {
        id: newGuestId,
        name: {
          firstName: guestName,
          lastName: guestLastName,
        },
        attend: false,
      };
      setGuest([...guest, newGuest]);
      console.log(newGuest);
      setGuestName('');
      setGuestLastName('');
    }
  };
  const handleDeleteUser = (indexToDelete) => {
    const updatedUsers = [...guest];
    updatedUsers.splice(indexToDelete, 1);

    setGuest(updatedUsers);
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
      <br />

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
      <br />
      <div className="GuestContainer">
        {guest.map((user, index) => {
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
                <div>
                  <input
                    type="checkbox"
                    aria-label="attending"
                    checked={user.attend}
                    onChange={() => {
                      handleGuestAttend(index);
                    }}
                  />
                  {user.attend ? 'attending' : 'not attending'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
