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
    if (
      nama_depan == "" ||
      nama_belakang == "" ||
      jenis_kelamin == "" ||
      username == "" ||
      email == "" ||
      password == ""
    ) {
      dispatch({
        type: "USER_ERROR",
        payload: "Mohon isi semua form",
      });
    } else {
      Axios.post(`${API_URL}/user/add-user`, {
        nama_depan,
        nama_belakang,
        jenis_kelamin,
        status: "UNVERIFIED",
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
//         localStorage.setItem("token_amr", res.data.token);
//         dispatch({
//           type: "USER_LOGIN",
//           payload: res.data[0],
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/user/get`, {
      params: {
        username,
        password,
      },
    })
      .then((result) => {
        if (result.data.length) {
          // if (password === result.data[0].password) {
          localStorage.setItem("userDataAMR", JSON.stringify(result.data[0]));
          dispatch({
            type: "USER_LOGIN",
            payload: result.data[0],
          });
          // } else {
          // handle wrong password
          // dispatch({
          //   type: "USER_ERROR",
          //   payload: "Password salah!",
          // });
        }
        // } else {
        // handle username not found
        // dispatch({
        //   type: "USER_ERROR",
        //   payload: "User tidak ditemukan",
        // });
        // }
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
        id: userData.id_user
      }
    })
      .then((result) => {
        delete result.data[0].password
        localStorage.setItem("userDataAMR", JSON.stringify(result.data[0]));
        dispatch({
          type: "USER_LOGIN",
          payload: result.data[0],
        });
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
