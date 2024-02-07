import { createAuth0Client } from '@auth0/auth0-spa-js';

const auth0 = createAuth0Client({
  domain: 'YOUR_AUTH0_DOMAIN',
  client_id: 'YOUR_AUTH0_CLIENT_ID',
  redirect_uri: 'http://localhost:3000/callback', // Adjust as needed
});

export default auth0;
