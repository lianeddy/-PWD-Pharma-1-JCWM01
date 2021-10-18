const init_state = {
  id_user: 0,
  nama_depan: "",
  nama_belakang: "",
  jenis_kelamin: "",
<<<<<<< HEAD
  status: "",
=======
  tanggal_lahir: "",
>>>>>>> a34c9109ce4df6f73badc68744654356107b11cb
  email: "",
  password: "",
  status: "",
  role: "",
  foto_profile: "",
  errMsg: "",
  searchProduct: "",
  storageIsChecked: false,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, ...action.payload, storageIsChecked: true };
    case "SEARCH_PRODUCT":
      return { ...state, ...action.payload };
    case "USER_ERROR":
      return { ...state, errMsg: action.payload };
    case "USER_LOGOUT":
      return { ...init_state, storageIsChecked: true };
    case "CHECK_STORAGE":
      return { ...state, storageIsChecked: true };
    default:
      return state;
  }
};
