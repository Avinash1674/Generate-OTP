import React, { useState } from 'react';

function App() {
  const [mobile, setMobile] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const sendotp = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setErrorMessage('Please enter a valid 10-digits Indian mobile number');
      return;
    }
  }
  fetch('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile })

  })
    .then(Response => {
      if (Response.ok) {
        setMobile('');
      } else {
        setErrorMessage('Failed to send OTP.Please try again later.');
      }
    })
    .catch(error => {
      setErrorMessage('Networks error,Please check your internete connection.');
    });


  return (
    <div className='App'>
      <input
        type='tel'
        value={mobile}
        pattern='[6-9]\d{9}'
        onChange={event => setMobile(event.target.value)}
        placeholder='Enter mobile number'
        required
      />
      <button onClick={sendotp}>Send OTP</button>
      {errorMessage && <p className='error'>{errorMessage}</p>}
    </div>
  );
}
export default App;