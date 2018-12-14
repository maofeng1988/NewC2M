import { BASEURL } from '../Global';

const globalToast = {
  info: () => {},
  show: () => {},
  success: () => {},
  fail: () => {},
  offline: () => {},
  loading: () => {},
  hide: () => {},
};

let loading = false;

// const catchError = (url, error) => {
//   // console.log('====networkError=======', url, error);
//   if (error.text) {
//     globalToast.show(error.text, 1);
//   }
//   return error;
// };

export async function request(url, options, params) {
  const requestUrl = BASEURL + url;
  try {
    if (!params || !params.hiddenLoading) {
      loading = true;
      setTimeout(() => {
        if (loading) {
          globalToast.hide();
          globalToast.loading('', 10);
        }
      }, 300);
    }
    const defaultOptions = {
      // credentials: 'include',
    };
    // IMPORTANT: 写死token不要提交到git, 提交前检查下
    const token = null;
    if (token) {
      defaultOptions.headers = {
        Authorization: `Bearer ${token}`,
        token,
      };
    }
    const newOptions = { ...defaultOptions, ...options };
    if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
      newOptions.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...defaultOptions.headers,
        ...newOptions.headers,
      };
    }
    console.log('==requestUrl==newOptions==', requestUrl, newOptions);
    debugger
    const response = await fetch(requestUrl, newOptions);
    // if (!params || !params.hiddenLoading) {
    //   loading = false;
    //   globalToast.hide();
    // }
    console.log('=====response======', response);
    const result = await response.json();
    console.log('=====result======', result);
    return result;
  } catch (error) {
    console.log(error.toString());
  }
}

export function postRequst(url, body, params) {
  return request(url, { method: 'POST', body: JSON.stringify(body) }, params);
}

export function postForm(url, data, params) {
  const formData = new FormData();
  if (data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
  }
  return request(url, { method: 'POST', headers: {'Content-Type': 'multipart/form-data'}, body: formData }, params);
}

export function putForm(url, data, params) {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  return request(url, { method: 'PUT', headers: {'Content-Type': 'multipart/form-data'}, body: formData }, params);
}

export function requestNoLoading(url, options) {
  return request(url, options, { hiddenLoading: true });
}

export async function fetchService(url, setting, baseusrl = 'http://mobiletest.ehaier.com:38080/') {
  const userToken = await global.getItem('userToken');
  const reqSetting = {
      ...setting,
      headers: {
          Accept: 'application/json',
          ...setting.headers,
          TokenAuthorization: userToken,
      },
  };

  // console.log(reqSetting);
  const resp = await fetch(
      baseusrl + url,
      reqSetting,
  );
  if (!resp.ok) {
      const error = new Error(`${baseusrl}${url} is not OK!`);
      error.code = resp.status;
      error.text = resp.statusText;
      throw error;
  }
  return resp;
}

export async function getAppJSON(
  url,
  data,
  setting,
  hiddenLoading,
  customBaseUrl,
  hiddenErrorMsg,
) {
  let tmp = (url.indexOf('?') === -1) ? url + '?' : url + '&';
  for (const [key, value] of Object.entries(data)) {
  tmp = tmp + key + '=' + value + '&';
  }
  tmp = tmp.substring(0, tmp.length - 1);
  const resp = await fetchService(tmp, {
    ...setting,
    method: 'GET',
  }, customBaseUrl);
  const result = await resp.json();
  return result;
}
