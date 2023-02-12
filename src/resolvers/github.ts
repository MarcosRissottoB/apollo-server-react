export const GithubResolvers = {
  Query: {
    githubLoginUrl: async (_, {}, { dataSources }) => {
      const url = dataSources.githubAPI.getGithubLoginUrl();
      return url;
    },
  },
  Mutation: {
    authorizeWithGithub: async (_, { code }, { dataSources }) => {
      const user = await dataSources.githubAPI.requestGithubUser({code})
      return user
    },
  },
};