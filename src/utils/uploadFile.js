import axios from "axios";

export const uploadFile = function (file, folderPath = '/') {
  const formData = new FormData();
  formData.append('file', file)

  return axios.post(
    `${process.env.VUE_APP_UPLOAD_URL}/v2/accounts/${process.env.VUE_APP_UPLOAD_ACCOUNT_ID}/uploads/form_data?folderPath=${folderPath}`,
    formData,
    {
      headers: {
        'Authorization': 'Bearer public_W142hZVDAFGkXa3J2qwRrAonHARN',
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}