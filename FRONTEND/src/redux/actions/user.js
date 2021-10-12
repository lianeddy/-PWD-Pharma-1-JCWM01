import Axios from "axios";
import { API_URL } from "../../constants/API";
import { getCartData } from "./cart";

export const registerUser = ({
  nama_depan,
  nama_belakang,
  jenis_kelamin,
  tanggal_lahir,
  email,
  password,
  konfirmasi_password,
}) => {
  return (dispatch) => {
    if (
      nama_depan === "" ||
      nama_belakang === "" ||
      jenis_kelamin === "" ||
      tanggal_lahir === "" ||
      email === "" ||
      password === "" ||
      konfirmasi_password === ""
    ) {
      return dispatch({
        type: "USER_ERROR",
        payload: "Mohon isi semua form",
      });
    } else if (password !== konfirmasi_password) {
      return dispatch({
        type: "USER_ERROR",
        payload: "Mohon sesuaikan password dan konfirmasi password",
      });
    } else {
      return Axios.post(`${API_URL}/user/add-user`, {
        nama_depan,
        nama_belakang,
        email,
        password,
        jenis_kelamin,
        status: "UNVERIFIED",
        tanggal_lahir,
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
    }
  };
};

// export const loginUser = (username, password) => {
//   return (dispatch) => {
//     Axios.post(`${API_URL}/user/login`, {
//       username,
//       password,
//     })
//       .then((res) => {
//         localStorage.setItem("userDataAMR", res.data.token);
//         dispatch({
//           type: "USER_LOGIN",
//           payload: res.data[0],
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/user/get`, {
      params: {
        email,
        password,
      },
    })
      .then((result) => {
        if (result.data.length) {
          if (password === result.data[0].password) {
            localStorage.setItem("userDataAMR", JSON.stringify(result.data[0]));
            dispatch({
              type: "USER_LOGIN",
              payload: result.data[0],
            });
            dispatch(getCartData(result.data[0].id_user));
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
            payload: "Akun tidak ditemukan",
          });
        }
      })
      .catch((err) => {
        alert("Terjadi kesalahan di server");
      });
  };
};

export const logoutUser = () => {
  localStorage.removeItem("userDataAMR");
  return {
    type: "USER_LOGOUT",
  };
};

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/user/get`, {
      params: {
        email: userData.email,
      },
    })
      .then((result) => {
        localStorage.setItem("userDataAMR", JSON.stringify(result.data[0]));
        dispatch({
          type: "USER_LOGIN",
          payload: result.data[0],
        });
        dispatch(getCartData(result.data[0].id_user));
      })
      .catch(() => {
        alert(`Terjadi kesalahan di server`);
      });
  };
};

export const checkStorage = () => {
  return {
    type: "CHECK_STORAGE",
  };
};
