
import axios from "axios";
export let apiURL = "https://66bb35c36a4ab5edd6379bb4.mockapi.io/crud/"

export const getAll = async () => {
  const res = await axios({
    method: "GET",
    url: apiURL,
  })
  return res
}
export const getItem = async (id) => {
  console.log(id);
  const res = await axios({
    method: "GET",
    url: `${apiURL}${id}`,
  });
  return res;
}
export const postItem = async (data) => {
  const res = await axios({
    method: "POST",
    url: apiURL,
     data,
  });
  return res
}
export const putItem = async (data, id) => {
  const res = await axios({
    method: "PUT",
    url: `${apiURL}${id}`,
    data,
  });
  return res;
}

export const deleteItem = async (id) => {
  const res = await axios({
    method: "DELETE",
    url: `${apiURL}${id}`,
  });
  return res;
}


