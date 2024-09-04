/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelFamilyTreeFilterInput = {
  id?: ModelIDInput | null;
  owner?: ModelStringInput | null;
  name?: ModelStringInput | null;
  data?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelFamilyTreeFilterInput | null> | null;
  or?: Array<ModelFamilyTreeFilterInput | null> | null;
  not?: ModelFamilyTreeFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelFamilyTreeConnection = {
  __typename: 'ModelFamilyTreeConnection';
  items: Array<FamilyTree | null>;
  nextToken?: string | null;
};

export type FamilyTree = {
  __typename: 'FamilyTree';
  id: string;
  owner: string;
  name: string;
  data?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateFamilyTreeInput = {
  id?: string | null;
  owner: string;
  name: string;
  data?: string | null;
};

export type ModelFamilyTreeConditionInput = {
  owner?: ModelStringInput | null;
  name?: ModelStringInput | null;
  data?: ModelStringInput | null;
  and?: Array<ModelFamilyTreeConditionInput | null> | null;
  or?: Array<ModelFamilyTreeConditionInput | null> | null;
  not?: ModelFamilyTreeConditionInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type UpdateFamilyTreeInput = {
  id: string;
  owner?: string | null;
  name?: string | null;
  data?: string | null;
};

export type DeleteFamilyTreeInput = {
  id: string;
};

export type ModelSubscriptionFamilyTreeFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  data?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionFamilyTreeFilterInput | null> | null;
  or?: Array<ModelSubscriptionFamilyTreeFilterInput | null> | null;
  owner?: ModelStringInput | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type listFamilyTreesQueryVariables = {
  filter?: ModelFamilyTreeFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type listFamilyTreesQuery = {
  listFamilyTrees?: {
    __typename: 'ModelFamilyTreeConnection';
    items: Array<{
      __typename: 'FamilyTree';
      id: string;
      name: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type CreateFamilyTreeMutationVariables = {
  input: CreateFamilyTreeInput;
  condition?: ModelFamilyTreeConditionInput | null;
};

export type CreateFamilyTreeMutation = {
  createFamilyTree?: {
    __typename: 'FamilyTree';
    id: string;
    owner: string;
    name: string;
    data?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateFamilyTreeMutationVariables = {
  input: UpdateFamilyTreeInput;
  condition?: ModelFamilyTreeConditionInput | null;
};

export type UpdateFamilyTreeMutation = {
  updateFamilyTree?: {
    __typename: 'FamilyTree';
    id: string;
    owner: string;
    name: string;
    data?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteFamilyTreeMutationVariables = {
  input: DeleteFamilyTreeInput;
  condition?: ModelFamilyTreeConditionInput | null;
};

export type DeleteFamilyTreeMutation = {
  deleteFamilyTree?: {
    __typename: 'FamilyTree';
    id: string;
    owner: string;
    name: string;
    data?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type GetFamilyTreeQueryVariables = {
  id: string;
};

export type GetFamilyTreeQuery = {
  getFamilyTree?: {
    __typename: 'FamilyTree';
    id: string;
    owner: string;
    name: string;
    data?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListFamilyTreesQueryVariables = {
  filter?: ModelFamilyTreeFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListFamilyTreesQuery = {
  listFamilyTrees?: {
    __typename: 'ModelFamilyTreeConnection';
    items: Array<{
      __typename: 'FamilyTree';
      id: string;
      owner: string;
      name: string;
      data?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateFamilyTreeSubscriptionVariables = {
  filter?: ModelSubscriptionFamilyTreeFilterInput | null;
  owner?: string | null;
};

export type OnCreateFamilyTreeSubscription = {
  onCreateFamilyTree?: {
    __typename: 'FamilyTree';
    id: string;
    owner: string;
    name: string;
    data?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateFamilyTreeSubscriptionVariables = {
  filter?: ModelSubscriptionFamilyTreeFilterInput | null;
  owner?: string | null;
};

export type OnUpdateFamilyTreeSubscription = {
  onUpdateFamilyTree?: {
    __typename: 'FamilyTree';
    id: string;
    owner: string;
    name: string;
    data?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteFamilyTreeSubscriptionVariables = {
  filter?: ModelSubscriptionFamilyTreeFilterInput | null;
  owner?: string | null;
};

export type OnDeleteFamilyTreeSubscription = {
  onDeleteFamilyTree?: {
    __typename: 'FamilyTree';
    id: string;
    owner: string;
    name: string;
    data?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};
