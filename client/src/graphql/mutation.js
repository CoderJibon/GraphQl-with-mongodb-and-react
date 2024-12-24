import { gql } from "@apollo/client";

export const CREATE_TEAM = gql`
  mutation (
    $name: String!
    $email: String!
    $age: Int!
    $skill: String!
    $location: String!
    $status: Boolean
    $photo: String
  ) {
    createTeams(
      name: $name
      email: $email
      age: $age
      skill: $skill
      location: $location
      status: $status
      photo: $photo
    ) {
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

export const DELATE_TEAM = gql`
  mutation ($deleteATeamId: ID!) {
    deleteATeam(id: $deleteATeamId) {
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
