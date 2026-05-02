import { imgBaseUrl } from "./axiosInstance"

export const imageUrl = (url) => `${imgBaseUrl}/${url}`;

 export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };
