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
