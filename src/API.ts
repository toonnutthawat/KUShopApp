/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  profile?: string | null,
  credit?: CreditStatus | null,
};

export enum CreditStatus {
  NOT_YET_VERIFIED = "NOT_YET_VERIFIED",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
}


export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  profile?: ModelStringInput | null,
  credit?: ModelCreditStatusInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  id?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelCreditStatusInput = {
  eq?: CreditStatus | null,
  ne?: CreditStatus | null,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  profile?: string | null,
  credit: CreditStatus,
  posts?: ModelPostConnection | null,
  chats?: ModelChatConnection | null,
  chats2?: ModelChatConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items:  Array<Post | null >,
  nextToken?: string | null,
};

export type Post = {
  __typename: "Post",
  id: string,
  title: string,
  content: string,
  likes: number,
  image?: string | null,
  user: User,
  userID: string,
  comments?: ModelCommentConnection | null,
  likeStatuses?: ModelLikeStatusConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items:  Array<Comment | null >,
  nextToken?: string | null,
};

export type Comment = {
  user: User;
  __typename: "Comment",
  id: string,
  content: string,
  post: Post,
  postID: string,
  userID: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelLikeStatusConnection = {
  __typename: "ModelLikeStatusConnection",
  items:  Array<LikeStatus | null >,
  nextToken?: string | null,
};

export type LikeStatus = {
  __typename: "LikeStatus",
  id: string,
  status: boolean,
  post: Post,
  postID: string,
  userID: string,
  createdAt: string,
  updatedAt: string,
  username?: string | null,
};

export type ModelChatConnection = {
  __typename: "ModelChatConnection",
  items:  Array<Chat | null >,
  nextToken?: string | null,
};

export type Chat = {
  __typename: "Chat",
  id: string,
  message?: ModelMessageConnection | null,
  user: User,
  userID: string,
  user2: User,
  userID2: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
};

export type Message = {
  __typename: "Message",
  id: string,
  content: string,
  userID: string,
  chat: Chat,
  chatID: string,
  image?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type DeleteUserInput = {
  id: string,
};

export type CreatePostInput = {
  id?: string | null,
  title: string,
  content: string,
  likes: number,
  image?: string | null,
  userID: string,
};

export type ModelPostConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  likes?: ModelIntInput | null,
  image?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePostInput = {
  id: string,
  title?: string | null,
  content?: string | null,
  likes?: number | null,
  image?: string | null,
  userID?: string | null,
};

export type DeletePostInput = {
  id: string,
};

export type CreateCommentInput = {
  id?: string | null,
  content: string,
  postID: string,
  userID: string,
};

export type ModelCommentConditionInput = {
  content?: ModelStringInput | null,
  postID?: ModelIDInput | null,
  userID?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateCommentInput = {
  id: string,
  content?: string | null,
  postID?: string | null,
  userID?: string | null,
};

export type DeleteCommentInput = {
  id: string,
};

export type CreateLikeStatusInput = {
  id?: string | null,
  status: boolean,
  postID: string,
  userID: string,
};

export type ModelLikeStatusConditionInput = {
  status?: ModelBooleanInput | null,
  postID?: ModelIDInput | null,
  userID?: ModelStringInput | null,
  and?: Array< ModelLikeStatusConditionInput | null > | null,
  or?: Array< ModelLikeStatusConditionInput | null > | null,
  not?: ModelLikeStatusConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  username?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateLikeStatusInput = {
  id: string,
  status?: boolean | null,
  postID?: string | null,
  userID?: string | null,
};

export type DeleteLikeStatusInput = {
  id: string,
};

export type CreateChatInput = {
  id?: string | null,
  userID: string,
  userID2: string,
};

export type ModelChatConditionInput = {
  userID?: ModelIDInput | null,
  userID2?: ModelIDInput | null,
  and?: Array< ModelChatConditionInput | null > | null,
  or?: Array< ModelChatConditionInput | null > | null,
  not?: ModelChatConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateChatInput = {
  id: string,
  userID?: string | null,
  userID2?: string | null,
};

export type DeleteChatInput = {
  id: string,
};

export type CreateMessageInput = {
  id?: string | null,
  content: string,
  userID: string,
  chatID: string,
  image?: string | null,
};

export type ModelMessageConditionInput = {
  content?: ModelStringInput | null,
  userID?: ModelStringInput | null,
  chatID?: ModelIDInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelMessageConditionInput | null > | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  not?: ModelMessageConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateMessageInput = {
  id: string,
  content?: string | null,
  userID?: string | null,
  chatID?: string | null,
  image?: string | null,
};

export type DeleteMessageInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  email: string,
  profile?: string | null,
  credit: CreditStatus,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  profile?: ModelStringInput | null,
  credit?: ModelCreditStatusInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  likes?: ModelIntInput | null,
  image?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  postID?: ModelIDInput | null,
  userID?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type ModelLikeStatusFilterInput = {
  id?: ModelIDInput | null,
  status?: ModelBooleanInput | null,
  postID?: ModelIDInput | null,
  userID?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelLikeStatusFilterInput | null > | null,
  or?: Array< ModelLikeStatusFilterInput | null > | null,
  not?: ModelLikeStatusFilterInput | null,
  username?: ModelStringInput | null,
};

export type ModelChatFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  userID2?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelChatFilterInput | null > | null,
  or?: Array< ModelChatFilterInput | null > | null,
  not?: ModelChatFilterInput | null,
};

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  userID?: ModelStringInput | null,
  chatID?: ModelIDInput | null,
  image?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMessageFilterInput | null > | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  not?: ModelMessageFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionUserFilterInput = {
  email?: ModelSubscriptionStringInput | null,
  profile?: ModelSubscriptionStringInput | null,
  credit?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  id?: ModelStringInput | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionPostFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  likes?: ModelSubscriptionIntInput | null,
  image?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPostFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostFilterInput | null > | null,
  userID?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionCommentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  postID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  or?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  userID?: ModelStringInput | null,
};

export type ModelSubscriptionLikeStatusFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  status?: ModelSubscriptionBooleanInput | null,
  postID?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLikeStatusFilterInput | null > | null,
  or?: Array< ModelSubscriptionLikeStatusFilterInput | null > | null,
  username?: ModelStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionChatFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionChatFilterInput | null > | null,
  or?: Array< ModelSubscriptionChatFilterInput | null > | null,
  userID?: ModelStringInput | null,
  userID2?: ModelStringInput | null,
};

export type ModelSubscriptionMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  chatID?: ModelSubscriptionIDInput | null,
  image?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  userID?: ModelStringInput | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profile?: string | null,
    credit: CreditStatus,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    chats2?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profile?: string | null,
    credit: CreditStatus,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    chats2?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    likes: number,
    image?: string | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    likeStatuses?:  {
      __typename: "ModelLikeStatusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    likes: number,
    image?: string | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    likeStatuses?:  {
      __typename: "ModelLikeStatusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    likes: number,
    image?: string | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    likeStatuses?:  {
      __typename: "ModelLikeStatusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateLikeStatusMutationVariables = {
  input: CreateLikeStatusInput,
  condition?: ModelLikeStatusConditionInput | null,
};

export type CreateLikeStatusMutation = {
  createLikeStatus?:  {
    __typename: "LikeStatus",
    id: string,
    status: boolean,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    username?: string | null,
  } | null,
};

export type UpdateLikeStatusMutationVariables = {
  input: UpdateLikeStatusInput,
  condition?: ModelLikeStatusConditionInput | null,
};

export type UpdateLikeStatusMutation = {
  updateLikeStatus?:  {
    __typename: "LikeStatus",
    id: string,
    status: boolean,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    username?: string | null,
  } | null,
};

export type DeleteLikeStatusMutationVariables = {
  input: DeleteLikeStatusInput,
  condition?: ModelLikeStatusConditionInput | null,
};

export type DeleteLikeStatusMutation = {
  deleteLikeStatus?:  {
    __typename: "LikeStatus",
    id: string,
    status: boolean,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    username?: string | null,
  } | null,
};

export type CreateChatMutationVariables = {
  input: CreateChatInput,
  condition?: ModelChatConditionInput | null,
};

export type CreateChatMutation = {
  createChat?:  {
    __typename: "Chat",
    id: string,
    message?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    user2:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID2: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateChatMutationVariables = {
  input: UpdateChatInput,
  condition?: ModelChatConditionInput | null,
};

export type UpdateChatMutation = {
  updateChat?:  {
    __typename: "Chat",
    id: string,
    message?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    user2:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID2: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteChatMutationVariables = {
  input: DeleteChatInput,
  condition?: ModelChatConditionInput | null,
};

export type DeleteChatMutation = {
  deleteChat?:  {
    __typename: "Chat",
    id: string,
    message?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    user2:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID2: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMessageMutationVariables = {
  input: CreateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    userID: string,
    chat:  {
      __typename: "Chat",
      id: string,
      userID: string,
      userID2: string,
      createdAt: string,
      updatedAt: string,
    },
    chatID: string,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMessageMutationVariables = {
  input: UpdateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    userID: string,
    chat:  {
      __typename: "Chat",
      id: string,
      userID: string,
      userID2: string,
      createdAt: string,
      updatedAt: string,
    },
    chatID: string,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMessageMutationVariables = {
  input: DeleteMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type DeleteMessageMutation = {
  deleteMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    userID: string,
    chat:  {
      __typename: "Chat",
      id: string,
      userID: string,
      userID2: string,
      createdAt: string,
      updatedAt: string,
    },
    chatID: string,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profile?: string | null,
    credit: CreditStatus,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    chats2?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profile?: string | null,
    credit: CreditStatus,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    chats2?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    likes: number,
    image?: string | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    likeStatuses?:  {
      __typename: "ModelLikeStatusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      content: string,
      postID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetLikeStatusQueryVariables = {
  id: string,
};

export type GetLikeStatusQuery = {
  getLikeStatus?:  {
    __typename: "LikeStatus",
    id: string,
    status: boolean,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    username?: string | null,
  } | null,
};

export type ListLikeStatusesQueryVariables = {
  filter?: ModelLikeStatusFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLikeStatusesQuery = {
  listLikeStatuses?:  {
    __typename: "ModelLikeStatusConnection",
    items:  Array< {
      __typename: "LikeStatus",
      id: string,
      status: boolean,
      postID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      username?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetChatQueryVariables = {
  id: string,
};

export type GetChatQuery = {
  getChat?:  {
    __typename: "Chat",
    id: string,
    message?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    user2:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID2: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListChatsQueryVariables = {
  filter?: ModelChatFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatsQuery = {
  listChats?:  {
    __typename: "ModelChatConnection",
    items:  Array< {
      __typename: "Chat",
      id: string,
      userID: string,
      userID2: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMessageQueryVariables = {
  id: string,
};

export type GetMessageQuery = {
  getMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    userID: string,
    chat:  {
      __typename: "Chat",
      id: string,
      userID: string,
      userID2: string,
      createdAt: string,
      updatedAt: string,
    },
    chatID: string,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      content: string,
      userID: string,
      chatID: string,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByUserIDQuery = {
  postsByUserID?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CommentsByPostIDQueryVariables = {
  postID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommentsByPostIDQuery = {
  commentsByPostID?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      content: string,
      postID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type LikeStatusesByPostIDQueryVariables = {
  postID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLikeStatusFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type LikeStatusesByPostIDQuery = {
  likeStatusesByPostID?:  {
    __typename: "ModelLikeStatusConnection",
    items:  Array< {
      __typename: "LikeStatus",
      id: string,
      status: boolean,
      postID: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      username?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ChatsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelChatFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ChatsByUserIDQuery = {
  chatsByUserID?:  {
    __typename: "ModelChatConnection",
    items:  Array< {
      __typename: "Chat",
      id: string,
      userID: string,
      userID2: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ChatsByUserID2QueryVariables = {
  userID2: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelChatFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ChatsByUserID2Query = {
  chatsByUserID2?:  {
    __typename: "ModelChatConnection",
    items:  Array< {
      __typename: "Chat",
      id: string,
      userID: string,
      userID2: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type MessagesByChatIDQueryVariables = {
  chatID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type MessagesByChatIDQuery = {
  messagesByChatID?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      content: string,
      userID: string,
      chatID: string,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  id?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profile?: string | null,
    credit: CreditStatus,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    chats2?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  id?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profile?: string | null,
    credit: CreditStatus,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    chats2?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  id?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    profile?: string | null,
    credit: CreditStatus,
    posts?:  {
      __typename: "ModelPostConnection",
      nextToken?: string | null,
    } | null,
    chats?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    chats2?:  {
      __typename: "ModelChatConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  userID?: string | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    likes: number,
    image?: string | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    likeStatuses?:  {
      __typename: "ModelLikeStatusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  userID?: string | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    likes: number,
    image?: string | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    likeStatuses?:  {
      __typename: "ModelLikeStatusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  userID?: string | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    id: string,
    title: string,
    content: string,
    likes: number,
    image?: string | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    likeStatuses?:  {
      __typename: "ModelLikeStatusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
  userID?: string | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
  userID?: string | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
  userID?: string | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateLikeStatusSubscriptionVariables = {
  filter?: ModelSubscriptionLikeStatusFilterInput | null,
  username?: string | null,
};

export type OnCreateLikeStatusSubscription = {
  onCreateLikeStatus?:  {
    __typename: "LikeStatus",
    id: string,
    status: boolean,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    username?: string | null,
  } | null,
};

export type OnUpdateLikeStatusSubscriptionVariables = {
  filter?: ModelSubscriptionLikeStatusFilterInput | null,
  username?: string | null,
};

export type OnUpdateLikeStatusSubscription = {
  onUpdateLikeStatus?:  {
    __typename: "LikeStatus",
    id: string,
    status: boolean,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    username?: string | null,
  } | null,
};

export type OnDeleteLikeStatusSubscriptionVariables = {
  filter?: ModelSubscriptionLikeStatusFilterInput | null,
  username?: string | null,
};

export type OnDeleteLikeStatusSubscription = {
  onDeleteLikeStatus?:  {
    __typename: "LikeStatus",
    id: string,
    status: boolean,
    post:  {
      __typename: "Post",
      id: string,
      title: string,
      content: string,
      likes: number,
      image?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
    },
    postID: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    username?: string | null,
  } | null,
};

export type OnCreateChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
  userID?: string | null,
  userID2?: string | null,
};

export type OnCreateChatSubscription = {
  onCreateChat?:  {
    __typename: "Chat",
    id: string,
    message?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    user2:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID2: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
  userID?: string | null,
  userID2?: string | null,
};

export type OnUpdateChatSubscription = {
  onUpdateChat?:  {
    __typename: "Chat",
    id: string,
    message?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    user2:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID2: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
  userID?: string | null,
  userID2?: string | null,
};

export type OnDeleteChatSubscription = {
  onDeleteChat?:  {
    __typename: "Chat",
    id: string,
    message?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID: string,
    user2:  {
      __typename: "User",
      id: string,
      email: string,
      profile?: string | null,
      credit: CreditStatus,
      createdAt: string,
      updatedAt: string,
    },
    userID2: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  userID?: string | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    userID: string,
    chat:  {
      __typename: "Chat",
      id: string,
      userID: string,
      userID2: string,
      createdAt: string,
      updatedAt: string,
    },
    chatID: string,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  userID?: string | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    userID: string,
    chat:  {
      __typename: "Chat",
      id: string,
      userID: string,
      userID2: string,
      createdAt: string,
      updatedAt: string,
    },
    chatID: string,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  userID?: string | null,
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?:  {
    __typename: "Message",
    id: string,
    content: string,
    userID: string,
    chat:  {
      __typename: "Chat",
      id: string,
      userID: string,
      userID2: string,
      createdAt: string,
      updatedAt: string,
    },
    chatID: string,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
