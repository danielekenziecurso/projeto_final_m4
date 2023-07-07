import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Schedule from "./schedules.entity";
import { getRounds, hashSync } from "bcryptjs";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45, type: "varchar" })
  name: string;

  @Column({ length: 45, type: "varchar", unique: true })
  email: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ length: 120, type: "varchar" })
  password: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date",  nullable: true })
  updatedAt: string | undefined | null;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string | undefined | null;

  @OneToMany(() => Schedule, (s) => s.user)
  schedules: Array<Schedule>;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hasRounds: number = getRounds(this.password);
    if (!hasRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export default User;
