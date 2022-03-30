import axios from "axios";
import { env } from "../config/environments";
import FormData from "form-data";

export const uploadImage = async (imageBase64) => {
  var bodyFormData = new FormData();
  bodyFormData.append('image', imageBase64);
  
  axios({
    method: "post",
    url: `https://api.imgbb.com/1/upload?key=${env.IMGBB_API_KEY}`,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}