import casual from 'casual'
import { gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'
import { createTestServer, createUser, deleteUser } from './utils'
import { createUserMock } from './mocks/user.mock'
import { sequelizeInit } from '../models'
import { User } from '../models/User'

const mocks = { User: createUserMock() }

let sequelize
beforeAll(async () => {
  sequelize = await sequelizeInit()
})

afterAll(async () => {
  if (sequelize) {
    await sequelize.close()
  }
})

afterEach(async () => {
  User.destroy({ truncate: true })
})

describe('User', () => {
  it('get user by id', async () => {
    const { server, currentUser } = await createTestServer({ mocks })
    const { query } = createTestClient(server)
    const user = await createUser({ id: casual.uuid })
    const GET_USER = gql`
      query($id: ID!) {
        user(id: $id) {
          id
        }
      }
    `

    const { data } = await query({ query: GET_USER, variables: { id: user.id } })
    expect(data?.user?.id).toEqual(user.id)
  })

  it('get login user', async () => {
    const { server, currentUser } = await createTestServer({ mocks })
    const { query } = createTestClient(server)

    const GET_CURRENT_USER = gql`
      query {
        currentUser {
          id
        }
      }
    `

    const { data } = await query({ query: GET_CURRENT_USER })
    expect(data?.currentUser?.id).toEqual(currentUser.id)
  })
})
