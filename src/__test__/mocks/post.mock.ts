const createPostMock = () => {
  const mock = () => ({
    Query: () => ({
      post: () => {},
      postGetMany: () => {},
      postGetManyByGroup: () => {},
    }),
    Mutation: () => ({
      postCreate: () => {},
      postUpdate: () => {},
      postDelete: () => {},
    }),
  })

  return mock
}

export { createPostMock }
