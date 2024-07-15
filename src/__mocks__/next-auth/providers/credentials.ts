const CredentialsProvider = jest.fn(() => ({
  id: 'credentials',
  name: 'Credentials',
  authorize: jest.fn()
}))

export default CredentialsProvider
