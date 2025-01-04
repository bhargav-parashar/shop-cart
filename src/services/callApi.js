import axios from "axios";

const getProducts = async (url) => {
  try {
    const res = await axios.get(url);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export { getProducts };
