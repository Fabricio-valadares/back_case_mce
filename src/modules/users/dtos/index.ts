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

export { IDataUser, IReturnUser, IDataUserService, IUpdateAvatar };
