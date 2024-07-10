/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
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
` as GeneratedMutation<
  APITypes.CreateFamilyTreeMutationVariables,
  APITypes.CreateFamilyTreeMutation
>;
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
` as GeneratedMutation<
  APITypes.UpdateFamilyTreeMutationVariables,
  APITypes.UpdateFamilyTreeMutation
>;
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
` as GeneratedMutation<
  APITypes.DeleteFamilyTreeMutationVariables,
  APITypes.DeleteFamilyTreeMutation
>;
export const createTask = /* GraphQL */ `mutation CreateTask(
  $input: CreateTaskInput!
  $condition: ModelTaskConditionInput
) {
  createTask(input: $input, condition: $condition) {
    id
    title
    description
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTaskMutationVariables,
  APITypes.CreateTaskMutation
>;
export const updateTask = /* GraphQL */ `mutation UpdateTask(
  $input: UpdateTaskInput!
  $condition: ModelTaskConditionInput
) {
  updateTask(input: $input, condition: $condition) {
    id
    title
    description
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTaskMutationVariables,
  APITypes.UpdateTaskMutation
>;
export const deleteTask = /* GraphQL */ `mutation DeleteTask(
  $input: DeleteTaskInput!
  $condition: ModelTaskConditionInput
) {
  deleteTask(input: $input, condition: $condition) {
    id
    title
    description
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTaskMutationVariables,
  APITypes.DeleteTaskMutation
>;
export const createPrivateNote = /* GraphQL */ `mutation CreatePrivateNote(
  $input: CreatePrivateNoteInput!
  $condition: ModelPrivateNoteConditionInput
) {
  createPrivateNote(input: $input, condition: $condition) {
    id
    content
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePrivateNoteMutationVariables,
  APITypes.CreatePrivateNoteMutation
>;
export const updatePrivateNote = /* GraphQL */ `mutation UpdatePrivateNote(
  $input: UpdatePrivateNoteInput!
  $condition: ModelPrivateNoteConditionInput
) {
  updatePrivateNote(input: $input, condition: $condition) {
    id
    content
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePrivateNoteMutationVariables,
  APITypes.UpdatePrivateNoteMutation
>;
export const deletePrivateNote = /* GraphQL */ `mutation DeletePrivateNote(
  $input: DeletePrivateNoteInput!
  $condition: ModelPrivateNoteConditionInput
) {
  deletePrivateNote(input: $input, condition: $condition) {
    id
    content
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePrivateNoteMutationVariables,
  APITypes.DeletePrivateNoteMutation
>;
