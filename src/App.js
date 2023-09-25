import './App.css';
import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:4000';

export default function App() {
  const [guestName, setGuestName] = useState('');
  const [guestLastName, setGuestLastName] = useState('');
  const [guest, setGuest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/guests`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setGuest(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [guest]);

  if (isLoading) {
    return 'Loading...';
  }
  const sendGuestData = async function (firstName, lastName) {
    try {
      const newGuest = {
        firstName,
        lastName,
        attending: false,
      };
      console.log(newGuest);
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGuest),
      });

      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setGuestName('');
      setGuestLastName('');
    } catch (error) {
      console.error('Error sending guest data:', error);
    }
  };
  /* const deleteAllGuests = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete guest');
      }

      const updatedGuest = guest.map((guestById) => guestById.id === id);
      setGuest(updatedGuest);
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };*/

  const deleteGuest = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete guest');
      }

      const updatedGuest = guest.filter((guestById) => guestById.id !== id);
      setGuest(updatedGuest);
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

  const handleGuestAttendTrue = (id) => {
    fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: true }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update guest attendance');
        }
        return response.json();
      })
      .then(() => {
        const updatedGuests = guest.map((user) => {
          if (user.id === id && user.attending === false) {
            return { ...user, attending: true };
          }
          return user;
        });
        console.log(updatedGuests);
        setGuest(updatedGuests);
      })
      .catch((error) => {
        console.error('Error updating guest attendance:', error);
      });
  };
  const handleGuestAttendFalse = (id) => {
    fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: false }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update guest attendance');
        }
        return response.json();
      })
      .then(() => {
        const updatedGuests = guest.map((user) => {
          if (user.id === id && user.attending === true) {
            return { ...user, attending: false };
          }
          return user;
        });
        console.log(updatedGuests);
        setGuest(updatedGuests);
      })
      .catch((error) => {
        console.error('Error updating guest attendance:', error);
      });
  };

  return (
    <div className="Container">
      <h1>Guest List</h1>
      <label htmlFor="First name" data-test-id="guest">
        First name
      </label>
      <input
        data-test-id="guest"
        placeholder="First name"
        value={guestName}
        onChange={(event) => {
          setGuestName(event.currentTarget.value);
        }}
        required
      />

      <br />

      <label htmlFor="Last name" data-test-id="guest">
        Last name
      </label>
      <input
        data-test-id="guest"
        placeholder="Last name"
        value={guestLastName}
        onChange={(event) => {
          setGuestLastName(event.currentTarget.value);
        }}
        onKeyDown={async (event) => {
          if (event.key === 'Enter') {
            await sendGuestData(guestName, guestLastName);
          }
        }}
        required
      />

      <br />
      <div className="GuestContainer">
        {guest.map((user) => {
          return (
            <div key={`user-id-${user.id} `}>
              <div data-test-id="guest">
                {user.firstName} {user.lastName}
                <button
                  aria-label="Remove"
                  key={`user-id-${user.id} `}
                  onClick={() => deleteGuest(user.id)}
                >
                  X
                </button>
                <br />
                <div>
                  <input
                    type="checkbox"
                    aria-label="attending"
                    checked={user.attending}
                    onChange={() => {
                      if (user.attending === false) {
                        handleGuestAttendTrue(user.id);
                      } else {
                        handleGuestAttendFalse(user.id);
                      }
                    }}
                  />
                  {user.attending ? 'attending' : 'not attending'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
