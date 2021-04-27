import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;
  @Column()
  email: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  constructor() {
    //this method will be called when the class is created
    if (!this.id) {
      this.id = uuid(); // when we can update something, this is not good to work.
    }
  }
}

export { User };
