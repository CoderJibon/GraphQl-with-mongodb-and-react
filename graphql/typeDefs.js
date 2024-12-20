export const typeDefs = `#graphql
  type devs {
    id: ID!
    name: String,
    age: Int,
    skill: String,
    location: String,
    gender: String,
    isMarried: Boolean,
  }

  type Query {
    getAllDevs: [devs]
    getSingleDev(id:ID!): devs
  }

  type Mutation {
    createDevs( name: String!, age: Int!, skill: String!, location: String!,gender: String!, isMarried: Boolean!) : devs
    deleteADev(id:ID!) : devs
    updateADev(id:ID!,name: String!, age: Int!, skill: String!, location: String!,gender: String!, isMarried: Boolean!): devs
  }
`;
