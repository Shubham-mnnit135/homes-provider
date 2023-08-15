import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";




export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllProperties = async () => {

  try {
    const response = await api.get("/residency/allresidencies", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getResidency = async (id) => {
  console.log("getResidency");
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const registerUser = async (userInfo) => {
  try {
    const res = await api.post("/user/register", userInfo);
       
    if (res.data.message) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.error);
    }
  } catch (error) {
    toast.error("something wrong");
    throw error;
  }
};


//login
export const loginUser = async (userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post("/user/login", userInfo);
     
      if (res.data.error) {
        toast.error(res.data.error);
        reject(res.data.error);
      } else {
        toast.success(res.data.message);
        resolve(res.data);
      }
    } catch (error) {
      toast.error("something went wrong");
      reject(error);
    }
  });
};


// export const isLogin = async (userInfo) => {
//   console.log("isLogin : ",userInfo)
//   try {
//     const res = await api.post("/user/profile",userInfo);
//     console.log(res.data.message);
//     console.log(res.data);
//     console.log("done")
//   } catch (err) {
//     throw err;
//   }
// }

export const bookVisit = async(detailsToBook,propertyId) => {
    try {
      const res = await api.post(`/user/bookVisit/${propertyId}`,detailsToBook);
      if(res.data.error){
        toast.error(res.data.error);
        return;
      }else{
        // setUser
        toast.success(res.data.message);
        return res.data.user;
      }
    } catch (err) {
      toast.error("something went wrong");
      throw err;
    }
}

export const updateFavList = async(detailsToUpdate,propertyId) => {

  try {

    const res =  await api.post(`/user/updateFavList/${propertyId}`,detailsToUpdate);
    if(res.data.message){
      toast.success(res.data.message);
      return res.data.user;
    }
    else{
      toast.error(res.data.error);
      return;
    }
  } catch (error) {
    toast.error("something went wrong");
    throw error;
  }
}


export const createResidency = async(propertyDetails,userInfo) => {

  const details = {
    token: userInfo.token,
    user:userInfo.user,
    propertyDetails:{...propertyDetails,userEmail:userInfo.user.email}
  }
  try {


       const res = await api.post("/residency/create",details)
       if(res.data.message){
          return res.data;
       }
       else{
        toast.error("something went wrong");
        return;
       }
  } catch (error) {
    toast.error("something went wrong");
    throw error;
  }
}

export const cancelBooking = async(detailsToCancel,propertyId) => {
     
     try {
        const res = await api.post(`/user/cancelBooking/${propertyId}`,detailsToCancel);
        if (res.data.message) {
          toast.success(res.data.message);
          return res.data.user;
        } else {
          toast.error("something went wrong");
          return;
        }
     } catch (error) {
       toast.error("something went wrong");
        throw error;
     }
}