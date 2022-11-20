import axios from "axios";
import { getSource } from "../pages/db/server";

export const token_header =   {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_token"),
    },
  };


export const token_header_withFile =   {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("user_token"),
    'Content-Type': 'multipart/form-data'
  },
};
