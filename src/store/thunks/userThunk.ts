import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, updateUser } from "../../graphql/mutations";
import { getUser, listUsers } from "../../graphql/queries";
import { getCurrentUser } from "aws-amplify/auth";
import { CreditStatus } from "../../API";

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
          credit: CreditStatus.NOT_YET_VERIFIED,
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

const changeCreditStatus = createAsyncThunk("changeCreditStatus" , async ({userID , creditStatus} : {userID : string , creditStatus : CreditStatus}) => {
  const response = await privateClient.graphql({
    query: updateUser,
    variables: {
      input: {
        id: userID,
        credit: creditStatus
      }
    }
  })
  return response.data.updateUser
})

const changePhoneNumber = createAsyncThunk("changePhoneNumber" , async ({phoneNumber} : {phoneNumber: string}) => {
  try{
  const user = await getCurrentUser()
  const response = await privateClient.graphql({
    query: updateUser,
    variables: {
      input: {
        id: user.username,
        phone: phoneNumber
      }
    }
  })
  console.log(response);
  
  return response.data.updateUser
}
catch(e){
  console.log((e as Error).message);
  
}
})

const fetchPendingStatusUsers = createAsyncThunk("fetchPendingStatusUsers" , async () => {
  const response = await privateClient.graphql({
    query: listUsers,
    variables: {
      filter: {
        credit: {
          eq : CreditStatus.PENDING
        }
      }
    }
  })
  return response.data.listUsers.items
})

export { addUser, fetchMyUser , editImgUser , changeCreditStatus, fetchPendingStatusUsers , changePhoneNumber};
