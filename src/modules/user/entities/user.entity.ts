import { BaseEntity } from "src/common/abstracts/Base-Entity.abstract";
import { EntityName } from "src/common/enums/entity-name.enum";
import { Column, Entity, OneToMany } from "typeorm";
import { UserAddressEntity } from "./user-address.entity";

@Entity(EntityName.USER)
export class UserEntity extends BaseEntity{
  @Column({ type: 'varchar', length: 25, nullable: true })
  first_name: string

  @Column({ type: 'varchar', length: 35, nullable: true })
  last_name: string

  @Column({ type: 'varchar', unique: true })
  mobile: string

  @Column({ type: 'varchar', nullable: true , unique: true })
  email: string

  @Column({ type: 'varchar', unique: true })
  invate_code: string

  @Column({ type: 'numeric', default: 0 })
  score: number

  @Column({ nullable: true })
  agentId: number

  //relations
  @OneToMany(()=> UserAddressEntity, address => address.user)
  addresses: UserAddressEntity[]
}