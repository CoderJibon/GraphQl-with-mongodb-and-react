import Dev from "../models/Dev.js";
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
  },
};
