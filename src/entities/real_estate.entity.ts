import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Address from "./address.entity";
import Category from "./categories.entity";
import Schedule from "./schedules.entity";

@Entity("real_estate")
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "boolean", default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  value: number | string;

  @Column({ type: "integer", nullable: false })
  size: number;

  @CreateDateColumn({ type: "date", nullable: false})
  createdAt: string;

  @UpdateDateColumn({ type: "date", nullable: false})
  updatedAt: string;

  @OneToOne(() => Address, (a) => a.realEstate)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category, (c) => c.realEstate)
  category: Category;

  @OneToMany(() => Schedule, (s) => s.realEstate)
  schedule: Schedule;


}

export default RealEstate;
