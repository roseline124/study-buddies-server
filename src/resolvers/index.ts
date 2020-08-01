import { mergeResolvers } from '@graphql-tools/merge'

import likePost from './likePost.resolver'
import post from './post.resolver'
import sample from './sample.resolver'
import user from './user.resolver'
import hashTag from './hashTag.resolver'

export default mergeResolvers([user as any, post as any, likePost as any, sample as any, hashTag as any])
