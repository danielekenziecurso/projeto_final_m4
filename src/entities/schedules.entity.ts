import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import RealEstate from "./real_estate.entity";
import User from "./user.entity";

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: false })
  date: string;

  @Column({ type: "time", nullable: false })
  hour: string;

  @ManyToOne(() => RealEstate, (r) => r.schedule)
  realEstate: RealEstate;

  @ManyToOne(() => User, (u) => u.schedules)
  user: User;
}

export default Schedule;
