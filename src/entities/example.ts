import { $api } from "./axios-instance"

export const getCalls = async () => {
  return $api.request({
    url: `api/get-calls`,
    method: "get",
  }).then((response) => response.data)
}

export const getAvg = async () => {
  return $api.request({
    url: `api/get-avg`,
    method: "get",
  }).then((response) => response.data)
}

export const uploadAudio = async (audioFile: string | Blob) => {
  const formData = new FormData();
  formData.append('audioFile', audioFile);
  formData.append('managerId', '1');
  formData.append('tel', '+7 (999) 999 99 99');

  return $api.request({
    url: `api/process-call`,
    method: "post",
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((response) => response.data);
};