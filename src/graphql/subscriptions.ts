/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $id: String
) {
  onCreateUser(filter: $filter, id: $id) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $id: String
) {
  onUpdateUser(filter: $filter, id: $id) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $id: String
) {
  onDeleteUser(filter: $filter, id: $id) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreatePost = /* GraphQL */ `subscription OnCreatePost(
  $filter: ModelSubscriptionPostFilterInput
  $userID: String
) {
  onCreatePost(filter: $filter, userID: $userID) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePostSubscriptionVariables,
  APITypes.OnCreatePostSubscription
>;
export const onUpdatePost = /* GraphQL */ `subscription OnUpdatePost(
  $filter: ModelSubscriptionPostFilterInput
  $userID: String
) {
  onUpdatePost(filter: $filter, userID: $userID) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePostSubscriptionVariables,
  APITypes.OnUpdatePostSubscription
>;
export const onDeletePost = /* GraphQL */ `subscription OnDeletePost(
  $filter: ModelSubscriptionPostFilterInput
  $userID: String
) {
  onDeletePost(filter: $filter, userID: $userID) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePostSubscriptionVariables,
  APITypes.OnDeletePostSubscription
>;
export const onCreateComment = /* GraphQL */ `subscription OnCreateComment(
  $filter: ModelSubscriptionCommentFilterInput
  $userID: String
) {
  onCreateComment(filter: $filter, userID: $userID) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCommentSubscriptionVariables,
  APITypes.OnCreateCommentSubscription
>;
export const onUpdateComment = /* GraphQL */ `subscription OnUpdateComment(
  $filter: ModelSubscriptionCommentFilterInput
  $userID: String
) {
  onUpdateComment(filter: $filter, userID: $userID) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCommentSubscriptionVariables,
  APITypes.OnUpdateCommentSubscription
>;
export const onDeleteComment = /* GraphQL */ `subscription OnDeleteComment(
  $filter: ModelSubscriptionCommentFilterInput
  $userID: String
) {
  onDeleteComment(filter: $filter, userID: $userID) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCommentSubscriptionVariables,
  APITypes.OnDeleteCommentSubscription
>;
export const onCreateLikeStatus = /* GraphQL */ `subscription OnCreateLikeStatus(
  $filter: ModelSubscriptionLikeStatusFilterInput
  $username: String
) {
  onCreateLikeStatus(filter: $filter, username: $username) {
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
` as GeneratedSubscription<
  APITypes.OnCreateLikeStatusSubscriptionVariables,
  APITypes.OnCreateLikeStatusSubscription
>;
export const onUpdateLikeStatus = /* GraphQL */ `subscription OnUpdateLikeStatus(
  $filter: ModelSubscriptionLikeStatusFilterInput
  $username: String
) {
  onUpdateLikeStatus(filter: $filter, username: $username) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateLikeStatusSubscriptionVariables,
  APITypes.OnUpdateLikeStatusSubscription
>;
export const onDeleteLikeStatus = /* GraphQL */ `subscription OnDeleteLikeStatus(
  $filter: ModelSubscriptionLikeStatusFilterInput
  $username: String
) {
  onDeleteLikeStatus(filter: $filter, username: $username) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteLikeStatusSubscriptionVariables,
  APITypes.OnDeleteLikeStatusSubscription
>;
