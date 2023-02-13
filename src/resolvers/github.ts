export const GithubResolvers = {
  Query: {
    githubLoginUrl: async (_, {}, { dataSources }) => {
      const url = dataSources.githubAPI.getGithubLoginUrl();
      return url;
    },
  },
  Mutation: {
    authorizeWithGithub: async (_, { code }, { dataSources }) => {
      try {
        return dataSources.githubAPI.requestGithubUser({code})
      } catch (error) {
        console.log(error);
      }
    },
  },
};
