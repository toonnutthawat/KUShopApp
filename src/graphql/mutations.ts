/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    email
    profile
    credit
    products {
      nextToken
      __typename
    }
    chats {
      nextToken
      __typename
    }
    chats2 {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    email
    profile
    credit
    products {
      nextToken
      __typename
    }
    chats {
      nextToken
      __typename
    }
    chats2 {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createProduct = /* GraphQL */ `mutation CreateProduct(
  $input: CreateProductInput!
  $condition: ModelProductConditionInput
) {
  createProduct(input: $input, condition: $condition) {
    id
    title
    content
    likes
    image
    user {
      id
      email
      profile
      credit
      createdAt
      updatedAt
      __typename
    }
    userID
    comments {
      nextToken
      __typename
    }
    likeStatuses {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateProductMutationVariables,
  APITypes.CreateProductMutation
>;
export const updateProduct = /* GraphQL */ `mutation UpdateProduct(
  $input: UpdateProductInput!
  $condition: ModelProductConditionInput
) {
  updateProduct(input: $input, condition: $condition) {
    id
    title
    content
    likes
    image
    user {
      id
      email
      profile
      credit
      createdAt
      updatedAt
      __typename
    }
    userID
    comments {
      nextToken
      __typename
    }
    likeStatuses {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateProductMutationVariables,
  APITypes.UpdateProductMutation
>;
export const deleteProduct = /* GraphQL */ `mutation DeleteProduct(
  $input: DeleteProductInput!
  $condition: ModelProductConditionInput
) {
  deleteProduct(input: $input, condition: $condition) {
    id
    title
    content
    likes
    image
    user {
      id
      email
      profile
      credit
      createdAt
      updatedAt
      __typename
    }
    userID
    comments {
      nextToken
      __typename
    }
    likeStatuses {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteProductMutationVariables,
  APITypes.DeleteProductMutation
>;
export const createComment = /* GraphQL */ `mutation CreateComment(
  $input: CreateCommentInput!
  $condition: ModelCommentConditionInput
) {
  createComment(input: $input, condition: $condition) {
    id
    content
    product {
      id
      title
      content
      likes
      image
      userID
      createdAt
      updatedAt
      __typename
    }
    productID
    userID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCommentMutationVariables,
  APITypes.CreateCommentMutation
>;
export const updateComment = /* GraphQL */ `mutation UpdateComment(
  $input: UpdateCommentInput!
  $condition: ModelCommentConditionInput
) {
  updateComment(input: $input, condition: $condition) {
    id
    content
    product {
      id
      title
      content
      likes
      image
      userID
      createdAt
      updatedAt
      __typename
    }
    productID
    userID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCommentMutationVariables,
  APITypes.UpdateCommentMutation
>;
export const deleteComment = /* GraphQL */ `mutation DeleteComment(
  $input: DeleteCommentInput!
  $condition: ModelCommentConditionInput
) {
  deleteComment(input: $input, condition: $condition) {
    id
    content
    product {
      id
      title
      content
      likes
      image
      userID
      createdAt
      updatedAt
      __typename
    }
    productID
    userID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCommentMutationVariables,
  APITypes.DeleteCommentMutation
>;
export const createLikeStatus = /* GraphQL */ `mutation CreateLikeStatus(
  $input: CreateLikeStatusInput!
  $condition: ModelLikeStatusConditionInput
) {
  createLikeStatus(input: $input, condition: $condition) {
    id
    status
    product {
      id
      title
      content
      likes
      image
      userID
      createdAt
      updatedAt
      __typename
    }
    productID
    userID
    createdAt
    updatedAt
    username
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLikeStatusMutationVariables,
  APITypes.CreateLikeStatusMutation
>;
export const updateLikeStatus = /* GraphQL */ `mutation UpdateLikeStatus(
  $input: UpdateLikeStatusInput!
  $condition: ModelLikeStatusConditionInput
) {
  updateLikeStatus(input: $input, condition: $condition) {
    id
    status
    product {
      id
      title
      content
      likes
      image
      userID
      createdAt
      updatedAt
      __typename
    }
    productID
    userID
    createdAt
    updatedAt
    username
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateLikeStatusMutationVariables,
  APITypes.UpdateLikeStatusMutation
>;
export const deleteLikeStatus = /* GraphQL */ `mutation DeleteLikeStatus(
  $input: DeleteLikeStatusInput!
  $condition: ModelLikeStatusConditionInput
) {
  deleteLikeStatus(input: $input, condition: $condition) {
    id
    status
    product {
      id
      title
      content
      likes
      image
      userID
      createdAt
      updatedAt
      __typename
    }
    productID
    userID
    createdAt
    updatedAt
    username
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteLikeStatusMutationVariables,
  APITypes.DeleteLikeStatusMutation
>;
export const createChat = /* GraphQL */ `mutation CreateChat(
  $input: CreateChatInput!
  $condition: ModelChatConditionInput
) {
  createChat(input: $input, condition: $condition) {
    id
    message {
      nextToken
      __typename
    }
    user {
      id
      email
      profile
      credit
      createdAt
      updatedAt
      __typename
    }
    userID
    user2 {
      id
      email
      profile
      credit
      createdAt
      updatedAt
      __typename
    }
    userID2
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChatMutationVariables,
  APITypes.CreateChatMutation
>;
export const updateChat = /* GraphQL */ `mutation UpdateChat(
  $input: UpdateChatInput!
  $condition: ModelChatConditionInput
) {
  updateChat(input: $input, condition: $condition) {
    id
    message {
      nextToken
      __typename
    }
    user {
      id
      email
      profile
      credit
      createdAt
      updatedAt
      __typename
    }
    userID
    user2 {
      id
      email
      profile
      credit
      createdAt
      updatedAt
      __typename
    }
    userID2
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChatMutationVariables,
  APITypes.UpdateChatMutation
>;
export const deleteChat = /* GraphQL */ `mutation DeleteChat(
  $input: DeleteChatInput!
  $condition: ModelChatConditionInput
) {
  deleteChat(input: $input, condition: $condition) {
    id
    message {
      nextToken
      __typename
    }
    user {
      id
      email
      profile
      credit
      createdAt
      updatedAt
      __typename
    }
    userID
    user2 {
      id
      email
      profile
      credit
      createdAt
      updatedAt
      __typename
    }
    userID2
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChatMutationVariables,
  APITypes.DeleteChatMutation
>;
export const createMessage = /* GraphQL */ `mutation CreateMessage(
  $input: CreateMessageInput!
  $condition: ModelMessageConditionInput
) {
  createMessage(input: $input, condition: $condition) {
    id
    content
    userID
    chat {
      id
      userID
      userID2
      createdAt
      updatedAt
      __typename
    }
    chatID
    image
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMessageMutationVariables,
  APITypes.CreateMessageMutation
>;
export const updateMessage = /* GraphQL */ `mutation UpdateMessage(
  $input: UpdateMessageInput!
  $condition: ModelMessageConditionInput
) {
  updateMessage(input: $input, condition: $condition) {
    id
    content
    userID
    chat {
      id
      userID
      userID2
      createdAt
      updatedAt
      __typename
    }
    chatID
    image
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMessageMutationVariables,
  APITypes.UpdateMessageMutation
>;
export const deleteMessage = /* GraphQL */ `mutation DeleteMessage(
  $input: DeleteMessageInput!
  $condition: ModelMessageConditionInput
) {
  deleteMessage(input: $input, condition: $condition) {
    id
    content
    userID
    chat {
      id
      userID
      userID2
      createdAt
      updatedAt
      __typename
    }
    chatID
    image
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMessageMutationVariables,
  APITypes.DeleteMessageMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    email
    profile
    credit
    products {
      nextToken
      __typename
    }
    chats {
      nextToken
      __typename
    }
    chats2 {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
