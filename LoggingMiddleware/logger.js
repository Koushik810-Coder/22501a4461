const axios = require('axios');

let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaXZhcmFtYWtvdXNoaWtAZ21haWwuY29tIiwiZXhwIjoxNzUxMDkxMTU2LCJpYXQiOjE3NTEwOTAyNTYsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI4NTczZTQ5Yi1jOTI2LTQ5ZmMtODE3Ny0xMWI4OTY0NWQzNzUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJ0ZWxhbmFrdWxhIHNpdmEgcmFtYSB2ZW5rYXRhIGtyaXNobmEga291c2hpayIsInN1YiI6Ijg2NmYzMGFlLWUwMDktNDcwMy1hZmM1LWRlMjYxNjFhNjJiOCJ9LCJlbWFpbCI6InNpdmFyYW1ha291c2hpa0BnbWFpbC5jb20iLCJuYW1lIjoidGVsYW5ha3VsYSBzaXZhIHJhbWEgdmVua2F0YSBrcmlzaG5hIGtvdXNoaWsiLCJyb2xsTm8iOiIyMjUwMWE0NDYxIiwiYWNjZXNzQ29kZSI6ImVIV056dCIsImNsaWVudElEIjoiODY2ZjMwYWUtZTAwOS00NzAzLWFmYzUtZGUyNjE2MWE2MmI4IiwiY2xpZW50U2VjcmV0IjoibVhlZ0pXWE1aY3hEeU1oZiJ9.JvlvF9zG8CZ1ZAYd0aPEPKZvGeuCITv6fVIHmrs9HWs'; // Set your token here (see below)

function setAccessToken(token) {
  accessToken = token;
}

async function Log(stack, level, pkg, message) {
  if (!accessToken) {
    console.error('Access token not set. Use setAccessToken(token) first.');
    return;
  }

  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message
  };

  try {
    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Log submitted:', response.data);
  } catch (error) {
    console.error('Logging failed:', error.response?.data || error.message);
  }
}

module.exports = {
  Log,
  setAccessToken
};
