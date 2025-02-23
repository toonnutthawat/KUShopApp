/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      profile
      credit
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getProduct = /* GraphQL */ `query GetProduct($id: ID!) {
  getProduct(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetProductQueryVariables,
  APITypes.GetProductQuery
>;
export const listProducts = /* GraphQL */ `query ListProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProductsQueryVariables,
  APITypes.ListProductsQuery
>;
export const getComment = /* GraphQL */ `query GetComment($id: ID!) {
  getComment(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCommentQueryVariables,
  APITypes.GetCommentQuery
>;
export const listComments = /* GraphQL */ `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      productID
      userID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCommentsQueryVariables,
  APITypes.ListCommentsQuery
>;
export const getLikeStatus = /* GraphQL */ `query GetLikeStatus($id: ID!) {
  getLikeStatus(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetLikeStatusQueryVariables,
  APITypes.GetLikeStatusQuery
>;
export const listLikeStatuses = /* GraphQL */ `query ListLikeStatuses(
  $filter: ModelLikeStatusFilterInput
  $limit: Int
  $nextToken: String
) {
  listLikeStatuses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      status
      productID
      userID
      createdAt
      updatedAt
      username
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLikeStatusesQueryVariables,
  APITypes.ListLikeStatusesQuery
>;
export const getChat = /* GraphQL */ `query GetChat($id: ID!) {
  getChat(id: $id) {
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
` as GeneratedQuery<APITypes.GetChatQueryVariables, APITypes.GetChatQuery>;
export const listChats = /* GraphQL */ `query ListChats(
  $filter: ModelChatFilterInput
  $limit: Int
  $nextToken: String
) {
  listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userID
      userID2
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListChatsQueryVariables, APITypes.ListChatsQuery>;
export const getMessage = /* GraphQL */ `query GetMessage($id: ID!) {
  getMessage(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetMessageQueryVariables,
  APITypes.GetMessageQuery
>;
export const listMessages = /* GraphQL */ `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      userID
      chatID
      image
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMessagesQueryVariables,
  APITypes.ListMessagesQuery
>;
export const productsByUserID = /* GraphQL */ `query ProductsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  productsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ProductsByUserIDQueryVariables,
  APITypes.ProductsByUserIDQuery
>;
export const commentsByProductID = /* GraphQL */ `query CommentsByProductID(
  $productID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  commentsByProductID(
    productID: $productID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      content
      productID
      userID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CommentsByProductIDQueryVariables,
  APITypes.CommentsByProductIDQuery
>;
export const likeStatusesByProductID = /* GraphQL */ `query LikeStatusesByProductID(
  $productID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelLikeStatusFilterInput
  $limit: Int
  $nextToken: String
) {
  likeStatusesByProductID(
    productID: $productID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      status
      productID
      userID
      createdAt
      updatedAt
      username
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.LikeStatusesByProductIDQueryVariables,
  APITypes.LikeStatusesByProductIDQuery
>;
export const chatsByUserID = /* GraphQL */ `query ChatsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelChatFilterInput
  $limit: Int
  $nextToken: String
) {
  chatsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      userID2
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ChatsByUserIDQueryVariables,
  APITypes.ChatsByUserIDQuery
>;
export const chatsByUserID2 = /* GraphQL */ `query ChatsByUserID2(
  $userID2: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelChatFilterInput
  $limit: Int
  $nextToken: String
) {
  chatsByUserID2(
    userID2: $userID2
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      userID2
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ChatsByUserID2QueryVariables,
  APITypes.ChatsByUserID2Query
>;
export const messagesByChatID = /* GraphQL */ `query MessagesByChatID(
  $chatID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  messagesByChatID(
    chatID: $chatID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      content
      userID
      chatID
      image
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MessagesByChatIDQueryVariables,
  APITypes.MessagesByChatIDQuery
>;
