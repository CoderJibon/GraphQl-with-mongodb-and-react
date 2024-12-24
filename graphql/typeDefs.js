export const typeDefs = `#graphql
  type devs {
    id: ID!,
    name: String,
    age: Int,
    skill: String,
    location: String,
    gender: String,
    isMarried: Boolean,
  }
  type teams {
    id: ID!,
    name: String!,
    email: String!,
    age: Int,
    skill: String,
    location: String,
    status: Boolean ,
    photo: String,
  }

  type Query {
    getAllDevs: [devs]
    getSingleDev(id:ID!): devs

    # team area
    getAllTeams: [teams]
    getSingleTeam(id:ID!): teams
  }

  type Mutation {
    createDevs( name: String!, age: Int!, skill: String!, location: String!,gender: String!, isMarried: Boolean!) : devs
    deleteADev(id:ID!) : devs
    updateADev(id:ID!,name: String!, age: Int!, skill: String!, location: String!,gender: String!, isMarried: Boolean!): devs

   # team area
   createTeams( name: String!, email: String!, age: Int, skill: String, location: String, status: Boolean, photo: String) : teams

   deleteATeam(id: ID!) : teams
   updateATeam(id: ID!, name: String!, email: String!, age: Int, skill: String, location: String, status: Boolean, photo: String): teams
  }
`;
