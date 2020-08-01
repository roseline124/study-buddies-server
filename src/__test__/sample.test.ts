import { gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'
import { createTestServer } from './utils'
import { sequelizeInit } from '../models'
import { User } from '../models/User'

let sequelize
beforeAll(async () => {
  sequelize = await sequelizeInit()
})

afterAll(async () => {
  if (sequelize) {
    await sequelize.close()
  }
})

describe('Sample', () => {
  it('hello world', async () => {
    const { server } = await createTestServer({
      mocks: {
        Query: () => ({ helloWorld: () => '' }),
      },
    })

    const { query } = createTestClient(server)

    const HELLO_WORLD = gql`
      query HelloWorld {
        helloWorld
      }
    `

    const { data } = await query({ query: HELLO_WORLD })
    expect(data.helloWorld).toEqual('👋 Hello world! 👋')
  })
})
