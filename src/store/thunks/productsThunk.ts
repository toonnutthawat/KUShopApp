import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, deleteProduct } from "../../graphql/mutations";
import { getCurrentUser } from "aws-amplify/auth";
import { getUser, listProducts } from "../../graphql/queries";
import { User } from "../../API";

const client = generateClient({authMode: "userPool"})

const addProduct = createAsyncThunk("addProduct", async ({ titlePost , contentPost, imgPath} : 
    {titlePost : string , contentPost : string, imgPath?: string | null}) => {

    try{
    const user = await getCurrentUser()
    const response = await client.graphql({
        query: createProduct,
        variables: {
            input: {
                title: titlePost,
                content: contentPost,
                likes: 0,
                userID: user.username,
                image: imgPath
            }
        }
    })
    console.log(response.data.createProduct);
    return response.data.createProduct
    }
    catch(e){
        console.log((e as Error).message);
    }
})

const fetchMyProducts = createAsyncThunk("fetchMyProducts", async () => {
    const user = await getCurrentUser()
    const response = await client.graphql({
        query: listProducts,
        variables: {
            filter: {
                userID : { 
                    eq : user.username
                }
            }
        }
    })
    const userPromises = response.data.listProducts.items.map(async (product) => {
        const userResponse = await client.graphql({
            query: getUser,
            variables: { id: product.userID }
        });
        return { ...product, user: userResponse.data.getUser as User}; 
    });
    const productsWithUsers = await Promise.all(userPromises);
   
    return productsWithUsers
})

const fetchAllProducts = createAsyncThunk("fetchAllProducts" , async () => {
    const response = await client.graphql({
        query: listProducts,
    })
    const userPromises = response.data.listProducts.items.map(async (product) => {
        const userResponse = await client.graphql({
            query: getUser,
            variables: { id: product.userID }
        });
        return { ...product, user: userResponse.data.getUser as User}; 
    });
    const productsWithUsers = await Promise.all(userPromises);
    
    return productsWithUsers
})

const removeProduct = createAsyncThunk("removeProduct", async (id: string) => {
    const response = await client.graphql({
        query: deleteProduct,
        variables: {
            input: {id}
        }
    })
    return response.data.deleteProduct
})

export { addProduct , fetchMyProducts , fetchAllProducts , removeProduct }