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
    posts {
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
    posts {
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
export const createPost = /* GraphQL */ `mutation CreatePost(
  $input: CreatePostInput!
  $condition: ModelPostConditionInput
) {
  createPost(input: $input, condition: $condition) {
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
  APITypes.CreatePostMutationVariables,
  APITypes.CreatePostMutation
>;
export const updatePost = /* GraphQL */ `mutation UpdatePost(
  $input: UpdatePostInput!
  $condition: ModelPostConditionInput
) {
  updatePost(input: $input, condition: $condition) {
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
  APITypes.UpdatePostMutationVariables,
  APITypes.UpdatePostMutation
>;
export const deletePost = /* GraphQL */ `mutation DeletePost(
  $input: DeletePostInput!
  $condition: ModelPostConditionInput
) {
  deletePost(input: $input, condition: $condition) {
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
  APITypes.DeletePostMutationVariables,
  APITypes.DeletePostMutation
>;
export const createComment = /* GraphQL */ `mutation CreateComment(
  $input: CreateCommentInput!
  $condition: ModelCommentConditionInput
) {
  createComment(input: $input, condition: $condition) {
    id
    content
    post {
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
    postID
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
    post {
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
    postID
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
    post {
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
    postID
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
    post {
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
    postID
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
    post {
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
    postID
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
    post {
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
    postID
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
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    email
    profile
    credit
    posts {
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
