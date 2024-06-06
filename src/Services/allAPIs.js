import { serverURL } from "./serverURL";
import { commonAPI } from "./commonAPI"
// Register API CALl
export const registerAPI = async(user) => {
    return await commonAPI("post",`${serverURL}/register`,user,"")
}
export const loginAPI = async(user)=>{
    return await commonAPI("post",`${serverURL}/login`,user,"")
}
export const  addRecipientAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${serverURL}/add-recipient`,reqBody,reqHeader)
}
export const allRecipientAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${serverURL}/allRecipient?search=${searchKey}`,"",reqHeader)
}
export const deleteRecipientAPI = async(patientId,reqHeader)=>{
    return await commonAPI("delete",`${serverURL}/recipient/delete/${patientId}`,{},reqHeader)
}
export const updateRecipientAPI = async(patientId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${serverURL}/update-recipient/${patientId}`,reqBody,reqHeader)
}
export const viewRecipientAPI = async(userId,reqHeader)=>{
    return await commonAPI("get",`${serverURL}/viewRecipient/${userId}`,"",reqHeader)
}

export const  addDonorAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${serverURL}/add-donor`,reqBody,reqHeader)
}
export const allDonorsAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${serverURL}/allDonors?search=${searchKey}`,"",reqHeader)
}
export const deleteDonorAPI = async(patientId,reqHeader)=>{
    return await commonAPI("delete",`${serverURL}/donor/delete/${patientId}`,{},reqHeader)
}
export const updateDonorAPI = async(patientId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${serverURL}/update-donor/${patientId}`,reqBody,reqHeader)
}
export const viewDonorAPI = async(userId,reqHeader)=>{
    return await commonAPI("get",`${serverURL}/viewDonor/${userId}`,"",reqHeader)
}