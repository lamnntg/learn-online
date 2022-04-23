import Axios from 'axios';

export const cropQuestionFromImage = async urlImage => {
  await Axios({
    method: 'get',
    url: `https://crop-questions-api.herokuapp.com/get-image-questions?image_url=${urlImage}`,
  })
    .then(res => {
      response = res.data;
    })
    .catch(error => {
      console.log(error);
      return error;
    });

    return response;
};

