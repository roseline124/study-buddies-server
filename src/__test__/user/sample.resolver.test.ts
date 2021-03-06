import casual from 'casual'
import { gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'
import { createTestServer } from '../utils'

const server = createTestServer({
  mocks: {
    Query: () => ({ helloWorld: () => '' }),
  },
})

const { query } = createTestClient(server)

describe('Sample', () => {
  it('hello world', async () => {
    const HELLO_WORLD = gql`
      query HelloWorld {
        helloWorld
      }
    `

    const { data } = await query({ query: HELLO_WORLD })
    expect(data.helloWorld).toEqual('👋 Hello world! 👋')
  })
})
