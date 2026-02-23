const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();
  return data.response; 
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  const data = await response.json();
  return data.response;
};