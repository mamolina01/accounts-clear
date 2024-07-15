import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^next-auth/react$': '<rootDir>/__mocks__/next-auth/react.ts',
    '^next-auth/providers/credentials$': '<rootDir>/__mocks__/next-auth/providers/credentials.ts',
    '^next-auth/providers/google$': '<rootDir>/__mocks__/next-auth/providers/google.ts',
    '^next-auth$': '<rootDir>/__mocks__/next-auth.ts'
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
