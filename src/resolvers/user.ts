export const UserResolvers = {
  Query: {
    hello: async (_, {}) => {
      return 'hello world';
    },
  },
  Mutation: {
    signup: async (_, { name, email, password }, { dataSources }) => {
      return dataSources.userAPI.signup({ name, email, password })
    },
    login: async (_, { email, password }, { dataSources }) => {
      return dataSources.userAPI.login({email, password })
    },
  },
};