const prod = {
    API_URL: 'https://multi-planner-api.herokuapp.com/'
}

const dev = {
    API_URL: 'http://127.0.0.1:8001/'
}

const config = process.env.NODE_ENV === 'development' ? dev : prod;
export default config