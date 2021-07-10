interface IDataUser {
  id?: string;
  name: string;
  email: string;
  password_hash: string;
  telefone: string;
  avatar?: string;
  isTrainer?: boolean;
}

interface IDataUserService {
  id?: string;
  name: string;
  email: string;
  password: string;
  telefone: string;
  avatar?: string;
  isTrainer?: boolean;
}

interface IReturnUser {
  id: string;
  name: string;
  email: string;
}

interface IUpdateAvatar {
  user_id: string;
  avatarFileName: string;
}

interface IUpadateUser {
  id: string;
  name: string;
  email: string;
  telefone: string;
  password: string;
}

interface IReturnUpadateUser {
  id: string;
  name: string;
  telefone: string;
  email: string;
}

interface IReturnOneUser {
  id: string;
  name: string;
  telefone: string;
  email: string;
}

export {
  IUpadateUser,
  IReturnUpadateUser,
  IDataUser,
  IReturnUser,
  IDataUserService,
  IUpdateAvatar,
  IReturnOneUser,
};
