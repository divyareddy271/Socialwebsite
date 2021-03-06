import { API_URLS, getFormBody, LocalStorage_Token_Key } from '../utils';


const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LocalStorage_Token_Key);

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    
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
    config.body = getFormBody(body);
    console.log(body);
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
    
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 2, limit = 4) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};
export const login = (email,password) =>{
  return customFetch(API_URLS.login(),{
    method: 'POST',
    body: {email,password}
  });
}
export const register = (email,name, password,confirm_password) =>{
  return customFetch(API_URLS.signup(),{
    method: 'POST',
    body: {email,name, password,confirm_password}
  });
}
export const editprofile = (id, password,confirm_password,name) =>{
  return customFetch(API_URLS.editUser(),{
    method: 'POST',
    body: {id,password,confirm_password,name}
  });
}
export const userinformation= (userId) =>{
  return customFetch(API_URLS.userInfo(userId),{
    method: 'GET',
  });
}
export const addfriend = (id) =>{
  console.log("api",id);
  return customFetch(API_URLS.createFriendship(id),{
    method: 'POST',
  });
}
export const removefriendship = (id) =>{
  console.log("api",id);
  return customFetch(API_URLS.removeFriend(id),{
    method: 'POST',
  });
}

export const fetchfriends= () =>{
  return  customFetch(API_URLS. friends(),{
    method: 'GET',
  });
}

export const postCreation = (content) =>{
  return  customFetch(API_URLS.createPost(),{
    method: 'POST',
    body: {content}
  });
}
export const createcomment  = (postid, content) =>{
  return  customFetch(API_URLS.comment(),{
    method: 'POST',
    body: {
      post_id:postid, 
      content}
  });
}
export const ToggleLike  = (itemid, itemtype) =>{
  return  customFetch(API_URLS.toggleLike(itemid, itemtype),{
    method: 'POST',
  });
}
export const Userfind  = (text) =>{
  return  customFetch(API_URLS.searchUsers(text),{
    method: 'GET',
  });
}

