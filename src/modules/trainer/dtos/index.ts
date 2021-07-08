interface IDataTrainer {
  id?: string;
  name: string;
  email: string;
  password_hash: string;
  avatar?: string;
  isTrainer?: boolean;
}

interface IDataTrainerService {
  id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  isTrainer?: boolean;
}

interface IReturnTrainer {
  id: string;
  name: string;
  email: string;
}

interface IUpdateAvatar {
  trainer_id: string;
  avatarFileName: string;
}

export { IDataTrainer, IReturnTrainer, IDataTrainerService, IUpdateAvatar };
