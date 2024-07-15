// __mocks__/next-auth/providers/google.ts
interface Props {
  id: string
  name: string
  email: string
  picture: string
}

const GoogleProvider = jest.fn(() => ({
  id: 'google',
  name: 'Google',
  type: 'oauth',
  version: '2.0',
  scope: 'https://www.googleapis.com/auth/userinfo.profile',
  params: { grant_type: 'authorization_code' },
  accessTokenUrl: 'https://accounts.google.com/o/oauth2/token',
  requestTokenUrl: 'https://accounts.google.com/o/oauth2/auth',
  authorizationUrl: 'https://accounts.google.com/o/oauth2/auth?response_type=code',
  profileUrl: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
  profile: (profile: Props) => ({
    id: profile.id,
    name: profile.name,
    email: profile.email,
    image: profile.picture
  }),
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
}))

export default GoogleProvider
