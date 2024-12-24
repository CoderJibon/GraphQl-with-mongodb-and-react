import { gql } from "@apollo/client";

export const GET_ALL_TEAMS = gql`
  query getAllTeamMembers {
    getAllTeams {
      id
      name
      email
      age
      skill
      location
      status
      photo
    }
  }
`;
