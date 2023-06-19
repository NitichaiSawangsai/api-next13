import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectType } from './entities/project-type.entity';
import { ProjectGroup } from './entities/project-group.entity';
import { ProjectStatus } from './entities/project-status.entity';
import { Repository } from 'typeorm';
import { QuerySelectionDto } from '../common/dtos/selection.dto';
import { PaginationResponse } from '../common/interface/pagination.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectType)
    private readonly projectTypeRepository: Repository<ProjectType>,
    @InjectRepository(ProjectGroup)
    private readonly projectGroupRepository: Repository<ProjectGroup>,
    @InjectRepository(ProjectStatus)
    private readonly projectStatusRepository: Repository<ProjectStatus>,
  ) {}

  async getProjectType(
    query: QuerySelectionDto,
  ): Promise<PaginationResponse<ProjectType>> {
    let queryBuilder =
      this.projectTypeRepository.createQueryBuilder('projectType');

    if (query.query) {
      queryBuilder = queryBuilder.andWhere('projectType.name = :name', {
        name: query.query,
      });
    }

    let page: number = null;
    let perPage: number = null;
    if (query.page && query.perPage) {
      page = query.page;
      perPage = query.perPage;
      queryBuilder = queryBuilder
        .orderBy('projectType.id', 'ASC')
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

  async getProjectGroup(
    query: QuerySelectionDto,
  ): Promise<PaginationResponse<ProjectGroup>> {
    let queryBuilder =
      this.projectGroupRepository.createQueryBuilder('projectGroup');

    if (query.query) {
      queryBuilder = queryBuilder.andWhere('projectGroup.name = :name', {
        name: query.query,
      });
    }

    let page: number = null;
    let perPage: number = null;
    if (query.page && query.perPage) {
      page = query.page;
      perPage = query.perPage;
      queryBuilder = queryBuilder
        .orderBy('projectGroup.id', 'ASC')
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

  async getProjectStatus(
    query: QuerySelectionDto,
  ): Promise<PaginationResponse<ProjectStatus>> {
    let queryBuilder =
      this.projectStatusRepository.createQueryBuilder('projectStatus');

    if (query.query) {
      queryBuilder = queryBuilder.andWhere('projectStatus.name = :name', {
        name: query.query,
      });
    }

    let page: number = null;
    let perPage: number = null;
    if (query.page && query.perPage) {
      page = query.page;
      perPage = query.perPage;
      queryBuilder = queryBuilder
        .orderBy('projectStatus.id', 'ASC')
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
