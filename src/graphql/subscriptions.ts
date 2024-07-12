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
