/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API';
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createFamilyTree = /* GraphQL */ `mutation CreateFamilyTree(
  $input: CreateFamilyTreeInput!
  $condition: ModelFamilyTreeConditionInput
) {
  createFamilyTree(input: $input, condition: $condition) {
    id
    owner
    name
    data
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.CreateFamilyTreeMutationVariables, APITypes.CreateFamilyTreeMutation>;
export const updateFamilyTree = /* GraphQL */ `mutation UpdateFamilyTree(
  $input: UpdateFamilyTreeInput!
  $condition: ModelFamilyTreeConditionInput
) {
  updateFamilyTree(input: $input, condition: $condition) {
    id
    owner
    name
    data
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.UpdateFamilyTreeMutationVariables, APITypes.UpdateFamilyTreeMutation>;
export const deleteFamilyTree = /* GraphQL */ `mutation DeleteFamilyTree(
  $input: DeleteFamilyTreeInput!
  $condition: ModelFamilyTreeConditionInput
) {
  deleteFamilyTree(input: $input, condition: $condition) {
    id
    owner
    name
    data
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<APITypes.DeleteFamilyTreeMutationVariables, APITypes.DeleteFamilyTreeMutation>;
