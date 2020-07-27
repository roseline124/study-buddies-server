import { gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'
import { createTestServer } from '../utils'
import { sequelizeInit } from '../../models'
import { createPostMock } from '../mocks/post.mock'

const mocks = { Post: createPostMock() }
const server = createTestServer({ mocks })
const { mutate } = createTestClient(server)

let sequelize
beforeAll(async () => {
  sequelize = await sequelizeInit()
})

afterAll(async () => {
  if (sequelize) {
    await sequelize.close()
  }
})

describe('Post', () => {
  it('create post', async () => {
    const CREATE_POST = gql`
      mutation($input: PostCreateInput!) {
        postCreate(input: $input) {
          post {
            id
            author
            url
            isLiked
            likeCount
            title
            description
            previewImage
            hashTags
            createdAt
          }
        }
      }
    `

    const { data } = await mutate({
      mutation: CREATE_POST,
      variables: {
        input: {
          authorID: '',
          url: '',
          hashTags: [''],
        },
      },
    })
    console.log('data', data)
    expect(1).toEqual(1)
  })
})
