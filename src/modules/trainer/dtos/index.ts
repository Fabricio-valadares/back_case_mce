interface IDataTrainer {
  id?: string;
  name: string;
  email: string;
  password_hash: string;
  avatar?: string;
  telefone: string;
  isTrainer?: boolean;
}

interface IDataTrainerService {
  id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  telefone: string;
  isTrainer?: boolean;
}

interface IReturnTrainer {
  id: string;
  name: string;
  email: string;
  telefone: string;
}

interface IUpdateAvatar {
  trainer_id: string;
  avatarFileName: string;
}

interface IUpadateTrainer {
  id: string;
  name: string;
  email: string;
  telefone: string;
  password: string;
}

interface IReturnUpadateTrainer {
  id: string;
  name: string;
  email: string;
  telefone: string;
}

interface IReturnOnerTrainer {
  id: string;
  name: string;
  email: string;
  telefone: string;
}

export {
  IReturnUpadateTrainer,
  IDataTrainer,
  IReturnTrainer,
  IDataTrainerService,
  IUpdateAvatar,
  IUpadateTrainer,
  IReturnOnerTrainer,
};
