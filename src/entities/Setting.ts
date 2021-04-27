import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn
} from "typeorm";
import { v4 as uuid } from "uuid";
@Entity("settings")
class Setting {
  @PrimaryColumn() //if you want to rename the entity name to something diferent in table, you can pass into the decoration
  id: string;

  @Column()
  username: string;

  @Column()
  chat: boolean;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    //this method will be called when the class is created
    if (!this.id) {
      this.id = uuid(); // when we can update something, this is not good to work.
    }
  }
}

export { Setting };
