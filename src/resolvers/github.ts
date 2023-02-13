export const GithubResolvers = {
  Query: {
    githubLoginUrl: async (_, {}, { dataSources }) => {
      return dataSources.githubAPI.getGithubLoginUrl();
    },
  },
  Mutation: {
    authorizeWithGithub: async (_, { code }, { dataSources }) => {
      return dataSources.githubAPI.requestGithubUser({code})
    },
  },
};
