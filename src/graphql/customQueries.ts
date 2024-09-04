/* tslint:disable */
/* eslint-disable */

import * as APITypes from '../API';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const listFamilyTreeSummary = /* GraphQL */ `query listFamilyTrees(
  $filter: ModelFamilyTreeFilterInput
  $limit: Int
  $nextToken: String
) {
  listFamilyTrees(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
    }
    nextToken
  }
}
` as GeneratedQuery<APITypes.ListFamilyTreesQueryVariables, APITypes.ListFamilyTreesQuery>;
