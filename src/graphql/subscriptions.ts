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
    phone
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
    phone
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
    phone
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateProduct = /* GraphQL */ `subscription OnCreateProduct(
  $filter: ModelSubscriptionProductFilterInput
  $userID: String
) {
  onCreateProduct(filter: $filter, userID: $userID) {
    id
    title
    content
    likes
    image
    price
    status
    category
    user {
      id
      email
      profile
      phone
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
  APITypes.OnCreateProductSubscriptionVariables,
  APITypes.OnCreateProductSubscription
>;
export const onUpdateProduct = /* GraphQL */ `subscription OnUpdateProduct(
  $filter: ModelSubscriptionProductFilterInput
  $userID: String
) {
  onUpdateProduct(filter: $filter, userID: $userID) {
    id
    title
    content
    likes
    image
    price
    status
    category
    user {
      id
      email
      profile
      phone
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
  APITypes.OnUpdateProductSubscriptionVariables,
  APITypes.OnUpdateProductSubscription
>;
export const onDeleteProduct = /* GraphQL */ `subscription OnDeleteProduct(
  $filter: ModelSubscriptionProductFilterInput
  $userID: String
) {
  onDeleteProduct(filter: $filter, userID: $userID) {
    id
    title
    content
    likes
    image
    price
    status
    category
    user {
      id
      email
      profile
      phone
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
  APITypes.OnDeleteProductSubscriptionVariables,
  APITypes.OnDeleteProductSubscription
>;
export const onCreateComment = /* GraphQL */ `subscription OnCreateComment(
  $filter: ModelSubscriptionCommentFilterInput
  $userID: String
) {
  onCreateComment(filter: $filter, userID: $userID) {
    id
    content
    product {
      id
      title
      content
      likes
      image
      price
      status
      category
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
    product {
      id
      title
      content
      likes
      image
      price
      status
      category
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
    product {
      id
      title
      content
      likes
      image
      price
      status
      category
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
    product {
      id
      title
      content
      likes
      image
      price
      status
      category
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
    product {
      id
      title
      content
      likes
      image
      price
      status
      category
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
    product {
      id
      title
      content
      likes
      image
      price
      status
      category
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
` as GeneratedSubscription<
  APITypes.OnDeleteLikeStatusSubscriptionVariables,
  APITypes.OnDeleteLikeStatusSubscription
>;
export const onCreateChat = /* GraphQL */ `subscription OnCreateChat(
  $filter: ModelSubscriptionChatFilterInput
  $userID: String
  $userID2: String
) {
  onCreateChat(filter: $filter, userID: $userID, userID2: $userID2) {
    id
    message {
      nextToken
      __typename
    }
    user {
      id
      email
      profile
      phone
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
      phone
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
` as GeneratedSubscription<
  APITypes.OnCreateChatSubscriptionVariables,
  APITypes.OnCreateChatSubscription
>;
export const onUpdateChat = /* GraphQL */ `subscription OnUpdateChat(
  $filter: ModelSubscriptionChatFilterInput
  $userID: String
  $userID2: String
) {
  onUpdateChat(filter: $filter, userID: $userID, userID2: $userID2) {
    id
    message {
      nextToken
      __typename
    }
    user {
      id
      email
      profile
      phone
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
      phone
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
` as GeneratedSubscription<
  APITypes.OnUpdateChatSubscriptionVariables,
  APITypes.OnUpdateChatSubscription
>;
export const onDeleteChat = /* GraphQL */ `subscription OnDeleteChat(
  $filter: ModelSubscriptionChatFilterInput
  $userID: String
  $userID2: String
) {
  onDeleteChat(filter: $filter, userID: $userID, userID2: $userID2) {
    id
    message {
      nextToken
      __typename
    }
    user {
      id
      email
      profile
      phone
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
      phone
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
` as GeneratedSubscription<
  APITypes.OnDeleteChatSubscriptionVariables,
  APITypes.OnDeleteChatSubscription
>;
export const onCreateMessage = /* GraphQL */ `subscription OnCreateMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $userID: String
) {
  onCreateMessage(filter: $filter, userID: $userID) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMessageSubscriptionVariables,
  APITypes.OnCreateMessageSubscription
>;
export const onUpdateMessage = /* GraphQL */ `subscription OnUpdateMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $userID: String
) {
  onUpdateMessage(filter: $filter, userID: $userID) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMessageSubscriptionVariables,
  APITypes.OnUpdateMessageSubscription
>;
export const onDeleteMessage = /* GraphQL */ `subscription OnDeleteMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $userID: String
) {
  onDeleteMessage(filter: $filter, userID: $userID) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMessageSubscriptionVariables,
  APITypes.OnDeleteMessageSubscription
>;
