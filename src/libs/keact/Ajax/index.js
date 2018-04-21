import axios from 'axios'

export default function (url, method, headers = {}, params, fn, errFn) {
  return axios({
    url: url,
    method: method,
    headers: headers,
    data: params
  }).then((res) => {
    if (res.status) {
      fn(res.data)
    } else {
      if (errFn) {
        errFn(res)
      } else {
        console.log(res)
      }
    }
  }, (error) => {
    if (errFn) {
      errFn(error)
    } else {
      console.log(error)
    }
  })
}
