import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser } from "aws-amplify/auth";
import { getLikeStatus, listLikeStatuses } from "../../graphql/queries";
import { createLikeStatus, updateLikeStatus, updatePost } from "../../graphql/mutations";

const client = generateClient()

const fetchLikeStatus = createAsyncThunk("fetchLikeStatus", async (postId : string) => {
    const user = getCurrentUser()
    const response = await client.graphql({
        query: getLikeStatus,
        variables: {
            id: postId + ":" + (await user).username
        }
    })
    if(response.data.getLikeStatus === null){
        const newLikeStatus = await client.graphql({
            query: createLikeStatus,
            variables: {
                input: {
                    id: postId + ":" + (await user).username,
                    status: false,
                    postID: postId,
                    userID: (await user).username
                }
            }
        })
        return newLikeStatus.data.createLikeStatus
    }

    return response.data.getLikeStatus
})

const changeLikeStatus = createAsyncThunk("changeLikeStatus", async (postID : string) => {
    const user = await getCurrentUser()
    const fetchedLikeStatus = await client.graphql({
        query: getLikeStatus,
        variables: {
            id: postID + ":" + user.username
        }
    })

    const response = await client.graphql({
        query: updateLikeStatus,
        variables: {
            input: {
                id:postID + ":" + user.username,
                status: !fetchedLikeStatus.data.getLikeStatus.status
            }
        }
    })

    return response.data.updateLikeStatus
})

const updateTotalLikes = createAsyncThunk("updateTotalLikes", async (postID : string) => {
    const list = await client.graphql({
        query: listLikeStatuses,
        variables: {
            filter: {
                postID: {
                    eq: postID
                },
                status: {
                    eq: true
                }
            }
        }
    })
    const response = await client.graphql({
        query: updatePost,
        variables: {
            input: {
                id: postID,
                likes: list.data.listLikeStatuses.items.length
            }
        }
    })
    return response.data.updatePost
})



export { fetchLikeStatus , changeLikeStatus , updateTotalLikes}

