import casual from 'casual'
import { gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'
import { createTestServer } from '../utils'
import { createUserMock, createUser, deleteUser } from './user.mock'
import { sequelizeInit } from '../../models'

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

describe('User', () => {
  it('get user by id', async () => {
    const server = createTestServer({ mocks })
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

    await deleteUser(user.id)
  })

  it('get login user', async () => {
    const currentUser = await createUser({ id: casual.uuid })
    const server = createTestServer({ mocks, context: () => ({ currentUser }) })
    const { query } = createTestClient(server)

    const GET_CURRENT_USER = gql`
      query {
        currentUser {
          id
        }
      }
    `

    const { data } = await query({ query: GET_CURRENT_USER, variables: { id: currentUser.id } })
    expect(data?.currentUser?.id).toEqual(currentUser.id)

    await deleteUser(currentUser.id)
  })
})
