import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser } from "aws-amplify/auth";
import { createComment } from "../../graphql/mutations";
import { getUser, listComments } from "../../graphql/queries";
import { Post } from "../../API";

const client = generateClient({authMode: "userPool"})

const addComment = createAsyncThunk("addComment" , async ({postID , commentContent} : {postID : string , commentContent: string}) => {
    const user = await getCurrentUser()
    const response = await client.graphql({
        query: createComment,
        variables: {
            input: {
                content: commentContent,
                postID: postID,
                userID: user.username,
            }
        }
    })
    return response.data.createComment
})

const fetchCommentByPost = createAsyncThunk("fetchCommentByPost", async (post : Post) =>{
    const response = await client.graphql({
        query: listComments,
        variables: {
            filter: {
                postID: {
                    eq: post.id
                }
            }
        }
    })
    const fetchedComments = response.data.listComments.items.map((comment) => ({
        ...comment,
        post: post,
    }));

    const addUserwithComments = fetchedComments.map(async (comment) => {
        const userResponse = await client.graphql({
            query: getUser,
            variables: {
                id: comment.userID
            }
        });
        return {...comment , user: userResponse.data.getUser}
    })
    const commentsWithUser = Promise.all(addUserwithComments)
    return commentsWithUser
})

export { addComment , fetchCommentByPost}