/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getFamilyTree = /* GraphQL */ `query GetFamilyTree($id: ID!) {
  getFamilyTree(id: $id) {
    id
    owner
    data
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFamilyTreeQueryVariables,
  APITypes.GetFamilyTreeQuery
>;
export const listFamilyTrees = /* GraphQL */ `query ListFamilyTrees(
  $filter: ModelFamilyTreeFilterInput
  $limit: Int
  $nextToken: String
) {
  listFamilyTrees(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      data
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFamilyTreesQueryVariables,
  APITypes.ListFamilyTreesQuery
>;
export const getTask = /* GraphQL */ `query GetTask($id: ID!) {
  getTask(id: $id) {
    id
    title
    description
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTaskQueryVariables, APITypes.GetTaskQuery>;
export const listTasks = /* GraphQL */ `query ListTasks(
  $filter: ModelTaskFilterInput
  $limit: Int
  $nextToken: String
) {
  listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTasksQueryVariables, APITypes.ListTasksQuery>;
export const getPrivateNote = /* GraphQL */ `query GetPrivateNote($id: ID!) {
  getPrivateNote(id: $id) {
    id
    content
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPrivateNoteQueryVariables,
  APITypes.GetPrivateNoteQuery
>;
export const listPrivateNotes = /* GraphQL */ `query ListPrivateNotes(
  $filter: ModelPrivateNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  listPrivateNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPrivateNotesQueryVariables,
  APITypes.ListPrivateNotesQuery
>;
