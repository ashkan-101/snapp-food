import { BaseEntity } from "src/common/abstracts/Base-Entity.abstract";
import { EntityName } from "src/common/enums/entity-name.enum";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity(EntityName.USER_ADDRESS)
export class UserAddressEntity extends BaseEntity{
  @Column({ type: 'varchar', length: 20, nullable: false })
  title: string

  @Column({ nullable: false })
  province: string

  @Column({ nullable: false })
  city: string

  @Column({ type: 'text', nullable: false })
  address: string

  @Column({ nullable: true })
  postal_code: string

  @Column({ nullable: false })
  user_id: number

  //relations
  @ManyToOne(()=> UserEntity, user => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'user_id'})
  user: UserEntity
}