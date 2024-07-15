// __mocks__/next-auth/react.ts
module.exports = {
  useSession: jest.fn(() => {
    return {
      data: {
        session: {
          user: {
            name: 'Test User',
            email: 'testuser@example.com'
          }
        }
      }
    }
  }),
  signIn: jest.fn(),
  signOut: jest.fn()
}
