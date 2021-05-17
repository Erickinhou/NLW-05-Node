import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne
} from "typeorm";

import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("connections")
class Connection {
  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;

  @Column()
  socket_id: string;

  //way to define the relation between tables
  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User) // many messages to one User
  user: User; // the cool part is I don't need to really do a relation,
  //it's kind the user data is already on the object
  @Column()
  user_id: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Connection };
