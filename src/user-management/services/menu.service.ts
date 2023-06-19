import { Injectable } from '@nestjs/common';
import { Menu } from '../entities/menu.entity';
import { TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuDto, QueryMenuDto } from '../dtos/menu.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: TreeRepository<Menu>,
  ) {}

  async createMenu(user: User, dto: CreateMenuDto): Promise<Menu> {
    const payload = await this.menuRepository.create({
      ...dto,
      createdBy: user.email,
    });
    return this.menuRepository.save(payload);
  }

  async getMenus(user: User, query: QueryMenuDto): Promise<Menu[]> {
    const qb = this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.roles', 'roles')
      .leftJoinAndSelect('roles.users', 'user');

    qb.where('TRIM(LOWER(user.email)) = TRIM(LOWER(:email))', {
      email: user?.email,
    });

    if (query?.name) {
      qb.andWhere('menu.name ILIKE :name', { name: `%${query.name}%` });
    }

    if (query?.withParent) {
      qb.leftJoinAndSelect('menu.parent', 'parent');
    }

    if (query?.withChild) {
      qb.leftJoinAndSelect('menu.children', 'children');
      qb.leftJoinAndSelect('children.children', 'grandchildren');
    }

    if (query?.level) {
      qb.andWhere('menu.level = :level', { level: query.level });
    }

    if (query?.editable) {
      qb.andWhere('menu.editable = :editable', { editable: query.editable });
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
    } else {
      qb.addOrderBy('menu.parent', 'ASC');
      qb.addOrderBy('menu.orderNo', 'ASC');
    }

    return qb.getMany();
  }
}
