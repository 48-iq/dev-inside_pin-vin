import { $api } from "./axios-instance"

export const getAllGroups = async () => {
  return $api.request({
    url: `process-call`,
    method: "get",
  }).then((response) => response.data)
}

export const uploadAudio = async (audioFile: string | Blob) => {
  const formData = new FormData();
  formData.append('audio', audioFile);

  return $api.request({
    url: ``,
    method: "post",
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((response) => response.data);
};