// command - node server.js

const http = require('http');
const { parse } = require('querystring');
const Twilio = require('twilio');

const port = 5000;

const accountSid = 'ACaecdf9fafdde7b9d960274bd7ce2629b';
const authToken = '0103eb71bc6be6c9534d811c6049429e';
const twilioClient = new Twilio(accountSid, authToken);

let otpStore = {}; 
const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {

    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const parsedBody = JSON.parse(body);

      if (req.url === '/send-otp') {
        const { phoneNumber } = parsedBody;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[phoneNumber] = otp; 

        twilioClient.messages.create({
          body: `Your OTP code is ${otp}`,
          from: '+12673624229',
          to: phoneNumber
        })
        .then(() => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'OTP sent successfully' }));
        })
        .catch(err => {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        });
      } else if (req.url === '/verify-otp') {
        const { phoneNumber, otp } = parsedBody;
        if (otpStore[phoneNumber] === otp) {
          delete otpStore[phoneNumber]; 
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'OTP verified successfully' }));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid OTP' }));
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
