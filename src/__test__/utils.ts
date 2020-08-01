import casual from 'casual'
import { ApolloServer } from 'apollo-server'
import { ApolloServerExpressConfig } from 'apollo-server-express'
import { typeDefs } from '../schema'
import resolvers from '../resolvers'
import { createUser } from './mocks'

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
