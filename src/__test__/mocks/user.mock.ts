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
