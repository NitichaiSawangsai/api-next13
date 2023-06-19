import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationResponse } from '../common/interface/pagination.interface';
import { QuerySelectionDto } from '../common/dtos/selection.dto';
import { EmployeeGroup } from './entities/employee-group.entity';
import { EmployeeType } from './entities/employee-type.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeGroup)
    private readonly employeeGroupRepository: Repository<EmployeeGroup>,
    @InjectRepository(EmployeeType)
    private readonly employeeTypeRepository: Repository<EmployeeType>,
  ) {}

  async getEmployeeGroup(
    query: QuerySelectionDto,
  ): Promise<PaginationResponse<EmployeeGroup>> {
    let queryBuilder =
      this.employeeGroupRepository.createQueryBuilder('employeeGroup');

    if (query.query) {
      queryBuilder = queryBuilder.andWhere('employeeGroup.name = :name', {
        name: query.query,
      });
    }

    let page: number = null;
    let perPage: number = null;
    if (query.page && query.perPage) {
      page = query.page;
      perPage = query.perPage;
      queryBuilder = queryBuilder
        .orderBy('employeeGroup.id', 'ASC')
        .skip((page - 1) * perPage)
        .take(perPage);
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      meta: {
        page,
        perPage,
        totalItem: total,
      },
    };
  }

  async getEmployeeType(
    query: QuerySelectionDto,
  ): Promise<PaginationResponse<EmployeeType>> {
    let queryBuilder =
      this.employeeTypeRepository.createQueryBuilder('employeeType');

    if (query.query) {
      queryBuilder = queryBuilder.andWhere('employeeType.name = :name', {
        name: query.query,
      });
    }

    let page: number = null;
    let perPage: number = null;
    if (query.page && query.perPage) {
      page = query.page;
      perPage = query.perPage;
      queryBuilder = queryBuilder
        .orderBy('employeeType.id', 'ASC')
        .skip((page - 1) * perPage)
        .take(perPage);
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      meta: {
        page,
        perPage,
        totalItem: total,
      },
    };
  }
}
