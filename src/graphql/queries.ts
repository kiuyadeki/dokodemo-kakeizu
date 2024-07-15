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
    name
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
      name
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
