import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserStatusType } from '../user-management.enum';
import { Role } from './role.entity';

@Entity({
  name: 'user',
  schema: 'user-management',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'role_id', nullable: false })
  roleId: number;

  @Column({ nullable: false })
  name: string;

  @Index()
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'simple-enum', nullable: false, enum: UserStatusType })
  status: UserStatusType;

  @Column({ nullable: true })
  avatar?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ name: 'created_by', nullable: false })
  createdBy: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy?: string;

  @VersionColumn()
  version?: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role?: Role;
}
