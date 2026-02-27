const API_URL = `${import.meta.env.VITE_API_URL}/api`;

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