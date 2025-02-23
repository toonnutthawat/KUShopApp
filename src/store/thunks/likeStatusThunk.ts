import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser } from "aws-amplify/auth";
import { getLikeStatus, listLikeStatuses } from "../../graphql/queries";
import { createLikeStatus, updateLikeStatus , updateProduct } from "../../graphql/mutations";

const client = generateClient()

const fetchLikeStatus = createAsyncThunk("fetchLikeStatus", async (productID : string) => {
    const user = getCurrentUser()
    const response = await client.graphql({
        query: getLikeStatus,
        variables: {
            id: productID + ":" + (await user).username
        }
    })
    if(response.data.getLikeStatus === null){
        const newLikeStatus = await client.graphql({
            query: createLikeStatus,
            variables: {
                input: {
                    id: productID + ":" + (await user).username,
                    status: false,
                    productID: productID,
                    userID: (await user).username
                }
            }
        })
        return newLikeStatus.data.createLikeStatus
    }

    return response.data.getLikeStatus
})

const changeLikeStatus = createAsyncThunk("changeLikeStatus", async (productID : string) => {
    const user = await getCurrentUser()
    const fetchedLikeStatus = await client.graphql({
        query: getLikeStatus,
        variables: {
            id: productID + ":" + user.username
        }
    })

    const response = await client.graphql({
        query: updateLikeStatus,
        variables: {
            input: {
                id:productID + ":" + user.username,
                status: !fetchedLikeStatus.data.getLikeStatus.status
            }
        }
    })

    return response.data.updateLikeStatus
})

const updateTotalLikes = createAsyncThunk("updateTotalLikes", async (productID : string) => {
    const list = await client.graphql({
        query: listLikeStatuses,
        variables: {
            filter: {
                productID: {
                    eq: productID
                },
                status: {
                    eq: true
                }
            }
        }
    })
    const response = await client.graphql({
        query: updateProduct,
        variables: {
            input: {
                id: productID,
                likes: list.data.listLikeStatuses.items.length
            }
        }
    })
    return response.data.updateProduct
})



export { fetchLikeStatus , changeLikeStatus , updateTotalLikes}

