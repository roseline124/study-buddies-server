import { User } from '../../models/User'

const createUser = async ({ id, name }: { id: string; name?: string }) => {
  const now = new Date()
  return await User.create({
    id,
    name,
    consecutiveStudyDays: [],
    posts: [],
    recommendations: [],
    followers: [],
    followings: [],
    createdAt: now,
    updatedAt: now,
  })
}

const deleteUser = async (id: string) => {
  return await User.destroy({ where: { id } })
}

const createUserMock = () => {
  const mock = () => ({
    Query: () => ({
      user: () => {},
      currentUser: () => {},
    }),
  })

  return mock
}

export { createUserMock, createUser, deleteUser }
