import { gql } from '@apollo/client';

export const GET_USERS = gql`
query getPhonebooks($offset: Int, $limit: Int) {
  getPhonebooks(offset: $offset, limit: $limit) {
    id
    name
    phone
  }
}
`;

export const CREATE_USER = gql`
mutation createPhonebook($user: PhonebookInput){
   createPhonebook(input: $user) {
      id
      name
      phone
    }
  }
`;

export const UPDATE_USER = gql`
mutation updatePhonebook($id: Int!, $user: PhonebookInput){
   updatePhonebook(id: $id, input: $user) {
      id
      name
      phone
    }
  }
`;

export const DELETE_USER = gql`
mutation deletePhonebook($id: Int!){
   deletePhonebook(id: $id) {
      __typename
   }
}
`;