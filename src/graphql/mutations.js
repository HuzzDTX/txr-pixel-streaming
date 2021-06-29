/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createInstance = /* GraphQL */ `
  mutation CreateInstance(
    $input: CreateInstanceInput!
    $condition: ModelInstanceConditionInput
  ) {
    createInstance(input: $input, condition: $condition) {
      id
      name
      ip
      port
      free
    }
  }
`;
export const updateInstance = /* GraphQL */ `
  mutation UpdateInstance(
    $input: UpdateInstanceInput!
    $condition: ModelInstanceConditionInput
  ) {
    updateInstance(input: $input, condition: $condition) {
      id
      name
      ip
      port
      free
    }
  }
`;
export const deleteInstance = /* GraphQL */ `
  mutation DeleteInstance(
    $input: DeleteInstanceInput!
    $condition: ModelInstanceConditionInput
  ) {
    deleteInstance(input: $input, condition: $condition) {
      id
      name
      ip
      port
      free
    }
  }
`;
