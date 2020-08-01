import ogs from 'open-graph-scraper'
import { gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'
import { createTestServer } from './utils'
import { sequelizeInit } from '../models'
import { createPostMock } from './mocks'
import { User } from '../models/User'
import { Post } from '../models/Post'

const mocks = { Post: createPostMock() }

let sequelize
beforeAll(async () => {
  sequelize = await sequelizeInit()
})

afterAll(async () => {
  if (sequelize) {
    // User.destroy({ truncate: true })
    // Post.destroy({ truncate: true })
    await sequelize.close()
  }
})

describe('Post', () => {
  it('create post', async () => {
    const postURL = 'https://roseline124.github.io/daily-study/2019/09/06/Study-tmux.html'
    const { server, currentUser } = await createTestServer({ mocks })
    const { mutate } = createTestClient(server)

    const CREATE_POST = gql`
      mutation($input: PostCreateInput!) {
        postCreate(input: $input) {
          post {
            author {
              id
            }
            url
            title
            description
            previewImage
          }
        }
      }
    `

    const { data } = await mutate({
      mutation: CREATE_POST,
      variables: { input: { url: postURL, hashTags: null } },
    })

    const { result } = await ogs({
      url: postURL,
      onlyGetOpenGraphInfo: true,
    })

    const { author, previewImage, title, description } = data?.postCreate?.post || {}
    expect(author?.id).toEqual(currentUser?.id)
    expect(previewImage).toEqual(result?.ogImage?.url)
    expect(title).toEqual(result?.ogTitle)
    expect(description).toEqual('')
  })
})
