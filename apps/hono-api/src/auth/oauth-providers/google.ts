import { google } from 'googleapis';

const { OAuth2 } = google.auth;

// Response of getTokens():
// {
//     access_token: "ya29.a0AcM612zXL_iugcjbcaT3GjVcMSaGy...",
//     refresh_token: "1//0cQQW38Gv2gk6CgYIARAAGAwSNwF...",
//     scope: "openid https://www.googleapis.com/auth/userinfo.profile...",
//     token_type: "Bearer",
//     id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjlDyIA...",
//     expiry_date: 1722771497456,
//   }

const baseUri = 'http://localhost:4000/api/auth/oauth2-callback';

const baseOAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:4000/api/auth/oauth2-callback/google'
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'openid'
];

//TODO: read more about state and csrf protection
export const getAuthorizationUrl = () => {
  const authorizationUrl = baseOAuth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    /** Pass in the scopes array defined above.
     * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
    // Include the state parameter to reduce the risk of CSRF attacks.
    state: '123456'
  });

  return authorizationUrl;
};

export const getAccessToken = async (code: string) => {
  let { tokens } = await baseOAuth2Client.getToken(code);

  return tokens.access_token;
};

export const getUserData = async (access_token: string) => {
  const oAuth2Client = new OAuth2();
  oAuth2Client.setCredentials({ access_token });

  const oauth2 = google.oauth2({ auth: oAuth2Client, version: 'v2' });
  const { data } = await oauth2.userinfo.get();

  const userData = {
    email: data.email,
    firstName: data.given_name,
    lastName: data.family_name || null,
    profilePicture: data.picture?.replace('s96-c', 's240-c') || null
  };

  return userData;
};
