const devUrl = 'http://127.0.0.1:8001/'
const prodUrl = 'https://multi-planner-api.herokuapp.com/'

const API_URL = process.env.NODE_ENV === 'development' ? devUrl : prodUrl;

export default API_URL