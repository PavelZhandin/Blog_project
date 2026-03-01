import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4444',
    headers: { 'Cache-Control': 'no-cache' }
});

export default instance;
