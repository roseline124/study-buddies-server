import { User } from '../../models/User'

const createUserMock = () => {
  const mock = () => ({
    Query: () => ({
      user: () => {},
      currentUser: () => {},
    }),
  })

  return mock
}

export { createUserMock }
