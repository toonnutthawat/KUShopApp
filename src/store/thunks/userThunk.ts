import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, updateUser } from "../../graphql/mutations";
import { getUser } from "../../graphql/queries";
import { getCurrentUser } from "aws-amplify/auth";

const client = generateClient({authMode: 'apiKey'});
const privateClient = generateClient();

const addUser = createAsyncThunk(
  "addUser",
  async ({
    usernameOfUser,
    emailOfUser,
  }: {
    usernameOfUser: string;
    emailOfUser: string;
  }) => {
    const response = await client.graphql({
      query: createUser,
      variables: {
        input: {
          id: usernameOfUser,
          email: emailOfUser,
          credit: false,
        },
      },
    });
    console.log("response", response.data.createUser);
    return response.data.createUser;
  }
);

const fetchMyUser = createAsyncThunk("fetchMyUser", async () => {
  try {
    const userInfo = await getCurrentUser();
    //console.log("123",userInfo);
    const response = await privateClient.graphql({
      query: getUser,
      variables: {
        id: userInfo.username,
      },
    });
    //console.log(response);
    return response.data.getUser;

  } catch (e) {
    console.log((e as Error).message);
    throw e;
  }
});

const editImgUser = createAsyncThunk("editImgUser" , async ({userID , imgPath} : {userID : string , imgPath: string}) => {
  const response = await privateClient.graphql({
    query: updateUser,
    variables: {
      input: {
        id: userID,
        profile: imgPath
      }
    }
  })

  return response.data.updateUser.profile
})

export { addUser, fetchMyUser , editImgUser};
