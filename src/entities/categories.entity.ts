import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import RealEstate from "./real_estate.entity";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45, type: "varchar", unique: true, nullable: false })
  name: string;

  @OneToMany(() => RealEstate, (r) => r.category)
  realEstate: RealEstate[]
}

export default Category;
