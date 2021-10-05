const init_state = {
  nama_depan: "",
  nama_belakang: "",
  jenis_kelamin: "",
  username: "",
  email: "",
  password: "",
  role: "",
  errMsg: "",
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, ...action.payload };
    case "USER_ERROR":
      return { ...state, errMsg: action.payload };
    default:
      return state;
  }
};
