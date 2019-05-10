// import { getToken } from '../Auth';

// provides an easy way for saga to call the BFF
const callBff = (suffix, type, body, returnJson = true) => {
  const payload = {};
  payload.method = type;
  payload.headers = {
    "Content-Type": "application/json"
    // Authorization: `bearer ${getToken()}`,
  };

  if (body) {
    payload.body = JSON.stringify(body);
  }

  try {
    return fetch(
      `${process.env.REACT_APP_BFF_BASE_URL}/yumbff/${suffix}`,
      payload
    ).then(response => {
      if (response.ok) {
        if (returnJson) {
          return response.json();
        }
        return response;
      }
      console.log(response.json());
      console.log("0000000response^ before callBff throws Error 0000000");
      throw Error(
        `Api request failed with status code: ${response.status}, @callBff`
      );
    });
  } catch (e) {
    console.log(e);
    console.log("______e^ before callBff catch logs e(Error) ______");
  }
};

export default callBff;
