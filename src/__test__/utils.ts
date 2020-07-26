import { ApolloServer, IMocks } from 'apollo-server'
import { ApolloServerExpressConfig } from 'apollo-server-express'
import { typeDefs } from '../schema'
import resolvers from '../resolvers'

export const createTestServer = (serverConfig: ApolloServerExpressConfig) => {
  const { context, mocks } = serverConfig
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    mocks,
    mockEntireSchema: false, // prevent overwriting resolvers
  })

  return server
}

export const getSubDays = (baseDate: Date, amount: number) => {
  return new Date(baseDate.setDate(baseDate.getDate() - amount))
}
