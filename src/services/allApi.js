import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//register
export const registerApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

//login
export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}
//admin
export const adminApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/admin`,reqBody,"")
}

//add  formData
export const addFormDataApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-formdata`,reqBody,reqHeader)
}

//get formdata
export const getFormDataApi = async()=>{
    return await commonApi('GET',`${serverUrl}/all-formdata`)
}