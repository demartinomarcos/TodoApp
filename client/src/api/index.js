export const url = 'http://localhost:8024/api';

export const setHeaders = () => {
  const header = {
    headers: {
      'authorization' : localStorage.getItem('token')
    }
  };
  return header;
};