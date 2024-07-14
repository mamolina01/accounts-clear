// __mocks__/next-auth.ts
const mockNextAuth = jest.fn().mockImplementation(() => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  auth: jest.fn(),
  handlers: jest.fn()
}))

export default mockNextAuth
