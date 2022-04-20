/*import {API_URLS, LocalStorage_Token_Key} from "../utils";
//body like email, password or null
//instead exporting each and every variable
const customFetch = async(url,{body, ...customconfig}) => {
  //getting token
  const token = window.localStorage.getItem(LocalStorage_Token_Key); 
  const headers = {
    'content-type' :'application/json',
    Accept : 'application/json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config={
    ...customconfig,
    headers:{
      ...headers,
      ...customconfig.header,
    }
  };

  if(body){
    console.log(body);
    config.body = JSON.stringify(body);
  }
 
  try{
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }
    throw new Error(data.message);
  }

  catch(error){
    console.error('error');
    return{
      message:"error message",
      success:false,
    }
  }
};

export const getPosts = (page=1, limit=5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};
*/
import { API_URLS, LocalStorage_Token_Key } from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LocalStorage_Token_Key);

  const headers = {
    'content-type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error('error');
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};
