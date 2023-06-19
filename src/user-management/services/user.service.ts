import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, QueryUserDto } from '../dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserStatusType } from '../user-management.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(user: User, dto: CreateUserDto): Promise<User> {
    const payload = this.userRepository.create({
      ...dto,
      email: dto?.email?.toLowerCase()?.trim(),
      createdBy: user.email,
    });
    return this.userRepository.save(payload);
  }

  async getUser(user: unknown, query: QueryUserDto) {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .where('TRIM(LOWER(user.email)) = TRIM(LOWER(:email))', {
        email: user?.['email'],
      })
      .andWhere('user.status = :status', { status: UserStatusType.active });

    if (user?.['id']) {
      qb.andWhere('user.id = :id', { id: user['id'] });
    }

    if (user?.['roleId']) {
      qb.andWhere('user.roleId = :roleId', { roleId: user['roleId'] });
    }

    if (query?.relations) {
      const relation = query.relations && query.relations.split(',');
      relation.forEach((rel, index) => {
        qb.leftJoinAndSelect(`${rel.trim()}`, 'user' + (index + 1));
      });
    }

    if (query?.orderBy) {
      const orderBy = query.orderBy.split(',');
      orderBy.forEach((order) => {
        const [column, orderType] = order.split(':');
        qb.addOrderBy(
          `${column.trim()}`,
          orderType.trim().toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
        );
      });
    }

    const userDB = await qb.getOne();

    if (!userDB) {
      throw new NotFoundException('User not found', 'USER_NOT_FOUND');
    }

    return userDB;
  }
}
