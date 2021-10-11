import Axios from "axios";
import { API_URL } from "../../constants/API";

export const getCartData = (id_user) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/cart/render-cart`, {
      params: {
        id_user: id_user,
      },
    })
      .then((result) => {
        //dispatch to cart reducer dengan payload => result.data
        dispatch({
          type: "FILL_CART",
          payload: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
        alert(`Gagal mengambil data cart`);
      });
  };
};
