import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser } from "aws-amplify/auth";
import { createComment } from "../../graphql/mutations";
import { getUser, listComments } from "../../graphql/queries";
import { Product } from "../../API";

const client = generateClient({authMode: "userPool"})

const addComment = createAsyncThunk("addComment" , async ({productID , commentContent} : {productID : string , commentContent: string}) => {
    const user = await getCurrentUser()
    const response = await client.graphql({
        query: createComment,
        variables: {
            input: {
                content: commentContent,
                productID: productID,
                userID: user.username,
            }
        }
    })
    return response.data.createComment
})

const fetchCommentByProduct = createAsyncThunk("fetchCommentByProduct", async (product : Product) =>{
    const response = await client.graphql({
        query: listComments,
        variables: {
            filter: {
                productID: {
                    eq: product.id
                }
            }
        }
    })
    const fetchedComments = response.data.listComments.items.map((comment) => ({
        ...comment,
        product: product,
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

export { addComment , fetchCommentByProduct}