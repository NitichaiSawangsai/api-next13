import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Menu } from './menu.entity';
import { User } from './user.entity';

@Entity({
  name: 'role',
  schema: 'user-management',
})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ name: 'created_by', nullable: false })
  createdBy: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy?: string;

  @VersionColumn()
  version: number;

  @OneToMany(() => User, (user) => user.role)
  users?: User[];

  @ManyToMany(() => Menu, (menu) => menu.roles)
  menus?: Menu[];
}
