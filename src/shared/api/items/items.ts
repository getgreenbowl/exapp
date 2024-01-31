import axios from "axios";

export const fetchItems = () => {
    return axios.get('http://192.168.29.193:3000/items')
}