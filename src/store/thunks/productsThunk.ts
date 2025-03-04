import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, updateProduct } from "../../graphql/mutations";
import { getCurrentUser } from "aws-amplify/auth";
import { getProduct, getUser, listLikeStatuses, listProducts } from "../../graphql/queries";
import { Product, ProductStatus, User } from "../../API";
import { ProductCategory } from "../../types/ProductCategory";

const client = generateClient({authMode: "userPool"})

const addProduct = createAsyncThunk("addProduct", async ({ titlePost , contentPost, imgPath, productPrice , category} : 
    {titlePost : string , contentPost : string, imgPath: string , productPrice: number , category: ProductCategory}) => {

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
                image: imgPath,
                price: productPrice,
                category: category,
                status: ProductStatus.AVAILABLE
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

const fetchAllProducts = createAsyncThunk("fetchAllProducts" , async ( {category} : {category: string | null}) => {
    try{
    let response
    if(category) {
        response = await client.graphql({
            query: listProducts,
            variables: {
                filter: {
                    category: {
                        eq: category
                    }
                }
            }
        })
    }
    else{
        response = await client.graphql({
        query: listProducts
    })
    }

   
    
    
    const userPromises = response.data.listProducts.items.map(async (product) => {
        const userResponse = await client.graphql({
            query: getUser,
            variables: { id: product.userID }
        });
        return { ...product, user: userResponse.data.getUser as User}; 
    });
    const productsWithUsers = await Promise.all(userPromises);
    
    return productsWithUsers
    }
    catch(error){
        console.log(error);
        
    }
})

const fetchMyProductsPurchased = createAsyncThunk("fetchMyProductsPurchased", async () => {
    const user = await getCurrentUser()
    const response = await client.graphql({
        query: listProducts,
        variables: {
            filter: {
                buyerID: {
                    eq: user.username
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

const fetchFavoriteProducts = createAsyncThunk("fetchFavoriteProduct", async () => {
    try{
    const user = await getCurrentUser()
    const favoriteStatusLists = await client.graphql({
        query: listLikeStatuses,
        variables: {
            filter: {
                userID: {
                    eq: user.username
                },
                status: {
                    eq: true
                }
            }
        }
    })
    console.log("favoriteStatusLists : ",favoriteStatusLists);
    
    let favoriteProductList = []

    for(let i = 0; i < favoriteStatusLists.data.listLikeStatuses.items.length; i++){
        const response = await client.graphql({
            query: getProduct,
            variables: {
                id: favoriteStatusLists.data.listLikeStatuses.items[i].productID
            }
        })

        console.log(`[${i}]`,response.data.getProduct);
        

        const product = response.data.getProduct;
    
        favoriteProductList.push(product);
      }
      console.log("favoriteProducts: ", favoriteProductList);

      return favoriteProductList;
    }
    
    catch(error){
        console.log((error as Error).message);
        
    }
    }
    )

const removeProduct = createAsyncThunk("removeProduct", async (id: string) => {
    const response = await client.graphql({
        query: deleteProduct,
        variables: {
            input: {id}
        }
    })
    return response.data.deleteProduct
})

const changeToSoldProductStatus = createAsyncThunk("changeToSoldProductStatus", async ({productID, buyerID} : {productID : string , buyerID : string}) => {
    try{
    const response = await client.graphql({
        query: updateProduct,
        variables: {
            input: {
                id: productID,
                status: ProductStatus.SOLD,
                buyerID: buyerID
            }
        }
    })
    console.log(response);
    
    return response.data.updateProduct
}
    catch(e){
        console.log((e as Error).message);
    }
})

export { addProduct , fetchMyProducts , fetchAllProducts , removeProduct , changeToSoldProductStatus ,fetchFavoriteProducts , fetchMyProductsPurchased }