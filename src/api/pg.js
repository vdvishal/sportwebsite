import instance  from './instance';
import cookies from 'universal-cookie';
const Cookies = new cookies();

export const stripe = (data) => instance.post(`/payment`, {
  amount: data
}, {
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
})
  .then((response) => {
    return (response);
  })

export const success = (data) => instance.post(`/payment/success`, data, {
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
})
  .then((response) => {
    return (response);
  });


export const transaction = (data) => instance.get(`/payment/transaction?page=${data}`, {
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
}).then((response) => {
  return (response);
});  