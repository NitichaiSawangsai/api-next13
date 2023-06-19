import { Injectable } from '@nestjs/common';
import { CreateRoleDto, QueryRoleDto } from '../dtos/role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(user: User, dto: CreateRoleDto): Promise<Role> {
    const payload = await this.roleRepository.create({
      ...dto,
      createdBy: user.email,
    });

    return this.roleRepository.save(payload);
  }

  getRoles(query: QueryRoleDto) {
    const relations: string[] = [];

    if (query?.relations) {
      const relation = query.relations && query.relations.split(',');
      relations.push(...relation);
    }

    return this.roleRepository.find({
      relations,
    });
  }
}
