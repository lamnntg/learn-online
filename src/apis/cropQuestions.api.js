import Axios from "axios";

export const cropQuestionFromImage = async (urlImage) => {
  await Axios({
    method: "get",
    url: `https://crop-questions-api.herokuapp.com/get-image-questions`,
    data: {
      image_url: urlImage,
    },
  })
    .then((resolve) => {
      return resolve.images;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
