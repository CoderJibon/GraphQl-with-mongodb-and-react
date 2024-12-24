```code
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import colors from "colors";
import dotenv from "dotenv";
import { resolvers } from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { mongoDBConnection } from "./config/mongoDDConnection.js";
// environment configuration
dotenv.config();

// Initialize Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Run server
const { url } = await startStandaloneServer(server, {
  listen: {
    port: 5050,
  },
});

// database configuration
mongoDBConnection();

console.log(colors.yellow(`Server running on ${url}`));


```

```code
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

```

```code
import Dev from "../models/Dev.js";
import Team from "../models/Team.js";
export const resolvers = {
 Query: {
   getAllDevs: async () => {
     try {
       const data = await Dev.find();
       return data;
     } catch (error) {}
   },
   getSingleDev: async (_, { id }) => {
     try {
       const data = await Dev.findById(id);
       return data;
     } catch (error) {}
   },

   getAllTeams: async () => {
     try {
       const data = await Team.find();
       return data;
     } catch (error) {}
   },
   getSingleTeam: async (_, { id }) => {
     try {
       const data = await Team.findById(id);
       return data;
     } catch (error) {}
   },
 },
 Mutation: {
   //create a new dev
   createDevs: async (
     _,
     { name, age, skill, location, gender, isMarried }
   ) => {
     try {
       const createData = await Dev.create({
         name,
         age,
         skill,
         location,
         gender,
         isMarried,
       });
       return createData;
     } catch (error) {}
   },
   //delate a dev
   deleteADev: async (_, { id }) => {
     try {
       const data = await Dev.findByIdAndDelete(id);
       return data;
     } catch (error) {}
   },
   // update a dev data
   updateADev: async (
     _,
     { id, name, age, skill, location, gender, isMarried }
   ) => {
     try {
       const data = await Dev.findByIdAndUpdate(
         id,
         { name, age, skill, location, gender, isMarried },
         { new: true }
       );
       return data;
     } catch (error) {}
   },

   //create a new Team
   createTeams: async (
     _,
     { name, email, age, skill, location, status = false, photo }
   ) => {
     // Input Validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
       throw new Error("Invalid email format.");
     }

     try {
       const createData = await Team.create({
         name,
         email,
         age,
         skill,
         location,
         status,
         photo,
       });

       return createData;
     } catch (error) {
       console.error("Error in createTeams:", error.message);
       throw new Error("Failed to create a team. Please try again.");
     }
   },

   //delate a Team
   deleteATeam: async (_, { id }) => {
     try {
       const data = await Team.findByIdAndDelete(id);
       return data;
     } catch (error) {}
   },
   // update a dev data
   updateATeam: async (
     _,
     { id, name, email, age, skill, location, status, photo }
   ) => {
     try {
       const data = await Team.findByIdAndUpdate(
         id,
         { name, email, age, skill, location, status, photo },
         { new: true }
       );
       return data;
     } catch (error) {}
   },
 },
};

```
