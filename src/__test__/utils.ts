import casual from 'casual'
import { ApolloServer } from 'apollo-server'
import { ApolloServerExpressConfig } from 'apollo-server-express'
import { typeDefs } from '../schema'
import resolvers from '../resolvers'

import { User } from '../models/User'

export const createUser = async ({ id, name }: { id: string; name?: string }) => {
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

export const deleteUser = async (id: string) => {
  return await User.destroy({ where: { id } })
}

export const createTestServer = async (serverConfig: ApolloServerExpressConfig) => {
  const { mocks } = serverConfig
  const currentUser = await createUser({ id: casual.uuid })

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      {
        currentUser
      }
    },
    mocks,
    mockEntireSchema: false, // prevent overwriting resolvers
  })

  return { server, currentUser }
}

export const getSubDays = (baseDate: Date, amount: number) => {
  return new Date(baseDate.setDate(baseDate.getDate() - amount))
}
