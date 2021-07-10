interface IDataLogin {
  email: string;
  password: string;
}

interface IReturnDataTokenLogin {
  token: string;
}

interface IDataResetPassword {
  token: string;
  password: string;
}

export { IDataLogin, IReturnDataTokenLogin, IDataResetPassword };
