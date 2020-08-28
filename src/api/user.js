import instance from './instance';
import cookies from 'universal-cookie';
const Cookies = new cookies();



export const login = (user) => instance.post(`/users/login`, { ...user }, {
  auth: {
    username: "app",
    password: 'qwewqinasdoinoinacino'
  },
})
  .then((response) => {
    return (response);
  }).catch(error => {
    return (error.response)
  });


export const signup = (user) => instance.post(`/users/signup`, { ...user }, {
  auth: {
    username: "app",
    password: 'qwewqinasdoinoinacino'
  },
})
  .then((response) => {
    return (response);
  }).catch(error => {
    return (error.response)
  });

export const verifyOTP = (user) => instance.post(`/users/verify`, { ...user }, {
  auth: {
    username: "app",
    password: 'qwewqinasdoinoinacino'
  },
})
  .then((response) => {
    return (response);
  }).catch(error => {
    return (error.response)
  });

export const resendOTP = (user) => instance.post(`/users/sendCode`, { ...user }, {
  auth: {
    username: "app",
    password: 'qwewqinasdoinoinacino'
  },
})
  .then((response) => {
    return (response);
  }).catch(error => {
    return (error.response)
  });

export const saveForgotPass = (user) => instance.post(`/users/reset/password`, { ...user }, {
  auth: {
    username: "app",
    password: 'qwewqinasdoinoinacino'
  },
})
  .then((response) => {
    return (response);
  }).catch(error => {
    return (error.response)
  });


export const profile = () => instance.get('/users/profile', {
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
})
  .then((response) => {
    return (response);
  })

export const activateUser = (token) => instance.get(`/users/activate?token=${token}`, {
  auth: {
    username: "app",
    password: 'qwewqinasdoinoinacino'
  },
})


export const logoutUser = (token) => instance.post(`/users/logout`, {}, {
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
})

export const patchProfile = (data) => instance.patch('/users/profile', data, {
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
})
  .then((response) => {
    return (response);
  });

export const patchPassword = (data) => instance.patch('/users/password', data, {
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
})
  .then((response) => {
    return (response);
  });

export const submitKyc = (formData) => instance.post(`/users/kyc`, formData, {
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
})

export const submitBank = (formData) => instance.post(`/users/bank`, formData, {
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
})

export const withdraw = (formData) => instance.post(`/users/withdraw`, formData, {
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
}).catch(err => err)


export const uploadImage = (formData) => instance.post(`/image/upload`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `${Cookies.get("token")}`,
  }
}).catch(err => err)