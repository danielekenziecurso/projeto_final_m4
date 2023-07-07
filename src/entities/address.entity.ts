import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import RealEstate from "./real_estate.entity";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45, type: "varchar" })
  street: string;

  @Column({ length: 8, type: "varchar" })
  zipCode: string;

  @Column({ length: 7, type: "varchar", nullable: true })
  number: string | undefined | null;

  @Column({ length: 20, type: "varchar" })
  city: string;

  @Column({ length: 2, type: "varchar" })
  state: string;
 
  @OneToOne(() => RealEstate, (r) => r.address)
  realEstate: RealEstate
}

export default Address;
