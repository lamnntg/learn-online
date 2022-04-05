import axios from "axios";
import { env } from "../config/environments";
import FormData from "form-data";
import { defaultsDeep } from "lodash";

export const uploadImage = async (imageBase64) => {
  var bodyFormData = new FormData();
  let base64Content = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "")
  bodyFormData.append('image', base64Content);

  try {
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${env.IMGBB_API_KEY}`, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
    console.log(res)
  } catch (error) {
    
  }
    

}