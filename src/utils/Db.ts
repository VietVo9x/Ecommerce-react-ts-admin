import axios from "axios";
import { baseApi } from "../apis";

//get data
export const getData = async (pathName: string) => {
  try {
    const response = await axios.get(baseApi + pathName);
    return response.data;
  } catch (e) {}
};
//get full data
export const getFullData = async (pathName: string) => {
  try {
    const response = await axios.get(baseApi + pathName);
    return response;
  } catch (e) {}
};
//create data
export const createData = async (pathName: string, data: any) => {
  try {
    const response = await axios.post(baseApi + pathName, data);
    return response.data;
  } catch (e) {}
};
//update data
export const updateData = async (pathName: string, id: any, data: any) => {
  try {
    const response = await axios.patch(baseApi + pathName + "/" + id, data);
    return response.data;
  } catch (e) {}
};
//delete data

export const deleteData = async (pathName: string, id: any) => {
  try {
    const response = await axios.delete(baseApi + pathName + "/" + id);
    return response.data;
  } catch (e) {}
};
