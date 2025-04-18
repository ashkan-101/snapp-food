import { BaseEntity } from "src/common/abstracts/Base-Entity.abstract";
import { EntityName } from "src/common/enums/entity-name.enum";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity(EntityName.CATEGORY)
export class CategoryEntity extends BaseEntity{
  @Column({ type: 'varchar', length: '25', nullable: false, unique: true })
  title: string

  @Column({ type: 'varchar', length: '25', nullable: false, unique: true })
  slug: string

  @Column({ type: 'text', nullable: false })
  image: string

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @Column({ nullable: true })
  parent_id: string
  
  //relations
  @ManyToOne(() => CategoryEntity, category => category.children, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'parent_id'})
  parent: CategoryEntity

  @OneToMany(() => CategoryEntity, categories => categories.parent)
  children: CategoryEntity[]
}