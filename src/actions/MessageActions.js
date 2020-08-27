import axios from "axios";
import { LIST_MESSAGES, CREATE_MESSAGES } from "../routes/backendRoutes";

export const listMessages = () => {
  return axios
    .get(LIST_MESSAGES)
    .then(response => response)
    .catch(error => error.response);
};

export const createMessages = (values) => {
  return axios
    .post(CREATE_MESSAGES, {
      ...values,
    })
    .then(response => response)
    .catch(error => error.response);
};