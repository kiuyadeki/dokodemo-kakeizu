/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateFamilyTree = /* GraphQL */ `subscription OnCreateFamilyTree(
  $filter: ModelSubscriptionFamilyTreeFilterInput
  $owner: String
) {
  onCreateFamilyTree(filter: $filter, owner: $owner) {
    id
    owner
    name
    data
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFamilyTreeSubscriptionVariables,
  APITypes.OnCreateFamilyTreeSubscription
>;
export const onUpdateFamilyTree = /* GraphQL */ `subscription OnUpdateFamilyTree(
  $filter: ModelSubscriptionFamilyTreeFilterInput
  $owner: String
) {
  onUpdateFamilyTree(filter: $filter, owner: $owner) {
    id
    owner
    name
    data
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateFamilyTreeSubscriptionVariables,
  APITypes.OnUpdateFamilyTreeSubscription
>;
export const onDeleteFamilyTree = /* GraphQL */ `subscription OnDeleteFamilyTree(
  $filter: ModelSubscriptionFamilyTreeFilterInput
  $owner: String
) {
  onDeleteFamilyTree(filter: $filter, owner: $owner) {
    id
    owner
    name
    data
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFamilyTreeSubscriptionVariables,
  APITypes.OnDeleteFamilyTreeSubscription
>;
export const onCreateTask = /* GraphQL */ `subscription OnCreateTask($filter: ModelSubscriptionTaskFilterInput) {
  onCreateTask(filter: $filter) {
    id
    title
    description
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTaskSubscriptionVariables,
  APITypes.OnCreateTaskSubscription
>;
export const onUpdateTask = /* GraphQL */ `subscription OnUpdateTask($filter: ModelSubscriptionTaskFilterInput) {
  onUpdateTask(filter: $filter) {
    id
    title
    description
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTaskSubscriptionVariables,
  APITypes.OnUpdateTaskSubscription
>;
export const onDeleteTask = /* GraphQL */ `subscription OnDeleteTask($filter: ModelSubscriptionTaskFilterInput) {
  onDeleteTask(filter: $filter) {
    id
    title
    description
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTaskSubscriptionVariables,
  APITypes.OnDeleteTaskSubscription
>;
export const onCreatePrivateNote = /* GraphQL */ `subscription OnCreatePrivateNote(
  $filter: ModelSubscriptionPrivateNoteFilterInput
  $owner: String
) {
  onCreatePrivateNote(filter: $filter, owner: $owner) {
    id
    content
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePrivateNoteSubscriptionVariables,
  APITypes.OnCreatePrivateNoteSubscription
>;
export const onUpdatePrivateNote = /* GraphQL */ `subscription OnUpdatePrivateNote(
  $filter: ModelSubscriptionPrivateNoteFilterInput
  $owner: String
) {
  onUpdatePrivateNote(filter: $filter, owner: $owner) {
    id
    content
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePrivateNoteSubscriptionVariables,
  APITypes.OnUpdatePrivateNoteSubscription
>;
export const onDeletePrivateNote = /* GraphQL */ `subscription OnDeletePrivateNote(
  $filter: ModelSubscriptionPrivateNoteFilterInput
  $owner: String
) {
  onDeletePrivateNote(filter: $filter, owner: $owner) {
    id
    content
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePrivateNoteSubscriptionVariables,
  APITypes.OnDeletePrivateNoteSubscription
>;
