import { createConnection, Connection } from "typeorm";

const connectdb = async (): Promise<Connection> => {
  return createConnection();
};

export { connectdb };
