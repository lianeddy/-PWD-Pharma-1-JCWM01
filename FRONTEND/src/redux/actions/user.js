import Axios from "axios";
import { API_URL } from "../../constants/API";

export const registerUser = ({
  nama_depan,
  nama_belakang,
  jenis_kelamin,
  username,
  email,
  password,
}) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/user/add-user`, {
      nama_depan,
      nama_belakang,
      jenis_kelamin,
      username,
      email,
      password,
      role: "USER",
    })
      .then((result) => {
        delete result.data.password;
        dispatch({
          type: "USER_LOGIN",
          payload: result.data,
        });
        alert("Berhasil Mendaftar");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/user/get`, {
      params: {
        username,
      },
    })
      .then((result) => {
        if (result.data.length) {
          if (password === result.data[0].password) {
            dispatch({
              type: "USER_LOGIN",
              payload: result.data[0],
            });
          } else {
            // handle wrong password
            dispatch({
              type: "USER_ERROR",
              payload: "Password salah!",
            });
          }
        } else {
          // handle username not found
          dispatch({
            type: "USER_ERROR",
            payload: "User tidak ditemukan",
          });
        }
      })
      .catch((err) => {
        alert("Terjadi kesalahan di server");
      });
  };
};
