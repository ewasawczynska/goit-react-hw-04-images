import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  key: '38224986-73ed753b6801a898f531e9036',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
});

export async function fetchImagesWithQuery(query, page) {
  try {
    const url = `?${searchParams}&q=${encodeURIComponent(query)}&page=${page}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Houston, we have a problem:', error);
    throw error;
  }
}
