const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'];
const TOKEN_PATH = 'token.json';

function getUserCredentials() {
  return new Promise((resolve, reject) => {
    fs.readFile('credentials.json', (err, content) => {
    if (err) reject(err);

    resolve(authorize(JSON.parse(content)));
    })
  });
}

function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const { OAuth2 } = google.auth;
  const auth = new OAuth2(client_id, client_secret, redirect_uris[0]);

  return new Promise((resolve, reject) => {
    return fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
          return getNewToken(auth).then(resolve).catch(reject);
        }
    
        auth.setCredentials(JSON.parse(token));
        resolve(auth);
    })
  });
}

function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();

      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          return reject(err)
        };

        oAuth2Client.setCredentials(token);

        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });

        resolve(oAuth2Client)
      })
    });
  });
}

module.exports = {
  getUserCredentials
}