import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  ManyToMany,
  JoinTable,
  Tree,
  TreeParent,
  TreeChildren,
} from 'typeorm';
import {
  MenuLevel,
  MenuUrlType,
  MenuStatusType,
} from '../user-management.enum';
import { Role } from './role.entity';

@Entity({
  name: 'menu',
  schema: 'user-management',
})
@Tree('closure-table', {
  closureTableName: 'menu',
})
@Index('menu_level_idx', ['level'])
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('menu_order_no_idx')
  @Column({ name: 'order_no', default: 99999 })
  orderNo: number;

  @Column({ type: 'simple-enum', enum: MenuLevel, nullable: true })
  level?: MenuLevel;

  @Index('menu_parent_id_idx')
  @Column({ name: 'parent_id', nullable: true })
  parentId?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false })
  icon: string;

  @Column({ type: 'simple-enum', nullable: true, enum: MenuUrlType })
  urlType: MenuUrlType;

  @Column({
    type: 'simple-enum',
    nullable: false,
    enum: MenuStatusType,
    default: MenuStatusType.inactive,
  })
  status: MenuStatusType;

  @Column({ default: false })
  editable: boolean;

  @Column({ name: 'created_by', nullable: false })
  createdBy: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @TreeParent()
  parent?: Menu;

  @TreeChildren()
  children?: Menu[];

  @ManyToMany(() => Role, (role) => role.menus, { cascade: true })
  @JoinTable({ name: 'roles_menus' })
  roles?: Role[];
}
