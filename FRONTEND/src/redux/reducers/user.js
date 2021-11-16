const init_state = {
  id_user: 0,
  nama_depan: "",
  nama_belakang: "",
  jenis_kelamin: "",
  tanggal_lahir: "",
  email: "",
  password: "",
  status: "",
  role: "",
  foto_profile: "",
  errMsg: "",
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
