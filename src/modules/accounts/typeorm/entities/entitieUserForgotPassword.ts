import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("tokenUser")
class EntitieUserForgotPassword {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column()
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }

    if (!this.token) {
      this.token = uuidV4();
    }
  }
}

export { EntitieUserForgotPassword };
