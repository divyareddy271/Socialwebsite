
export * from './constants';

export const SetItemonLocalStorage = (key, value) => {
    if(!key || ! value){
      console.log("Unable to store value in local storage");
      return;
    }
    const valueToStore = typeof value !== "string" ? JSON.stringify(value) : value;
    localStorage.setItem(key, valueToStore);
}
export const getItemfromLocalStorage = (key, value) => {
  if(!key){
    console.log("Unable to get key from local storage");
    return;
  }
  return localStorage.getItem(key);
}
export const removeItemfromLocalStorage = (key) => {
  if(!key){
    console.log("Unable to remove key from local storage");
    return;
  }
  localStorage.removeItem(key);
}





export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); // 'username=aakash&password=123213'
};
