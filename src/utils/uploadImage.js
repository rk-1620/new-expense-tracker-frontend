import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosinstance";


const uploadImage = async(imageFile)=>{
    const formData = new FormData();

    formData.append('image', imageFile);

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData,{
            headers:{
                'Content-Type' : 'multipart/form-data',
            },
        });
        return response.data;
    }catch(err){
        console.error('error in uploading image', err);
        throw err;
    }
};
export default uploadImage;