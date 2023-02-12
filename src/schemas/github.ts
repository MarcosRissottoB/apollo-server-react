export const GithubTypeDefs = `#graphql
  type GithubUser {
    name: String,
    githubLogin: String,
    githubToken: String,
    avatar: String,
  }

  type Query {
    githubLoginUrl: String!
    
  }

  type GithubAuthPayload {
    token: String!
    user: GithubUser!
  }

  type Mutation {
    authorizeWithGithub(code: String!): GithubAuthPayload
    testRequestGithubToken(code: String!): String!
  }
`;