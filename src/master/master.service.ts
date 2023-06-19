import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScgDepartment } from './entities/scg-department.entity';
import { DoDepartment } from './entities/do-department.entity';
import { ScgPosition } from './entities/scg-position.entity';
import { Section } from './entities/section.entity';
import { Workforce } from './entities/workforce.entity';
import { SubDivision } from './entities/sub-division.entity';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { QuerySelectionDto } from '../common/dtos/selection.dto';
import { PaginationResponse } from '../common/interface/pagination.interface';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(ScgDepartment)
    private readonly scgDepartmentRepository: Repository<ScgDepartment>,
    @InjectRepository(DoDepartment)
    private readonly doDepartmentRepository: Repository<DoDepartment>,
    @InjectRepository(ScgPosition)
    private readonly scgPositionRepository: Repository<ScgPosition>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    @InjectRepository(SubDivision)
    private readonly subdivisionRepository: Repository<SubDivision>,
    @InjectRepository(Workforce)
    private readonly workforceRepository: Repository<Workforce>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async getScgDepartment(
    query: QuerySelectionDto,
  ): Promise<PaginationResponse<ScgDepartment>> {
    let queryBuilder =
      this.scgDepartmentRepository.createQueryBuilder('ScgDepartment');

    if (query.query) {
      queryBuilder = queryBuilder.andWhere('ScgDepartment.name = :name', {
        name: query.query,
      });
    }

    let page: number = null;
    let perPage: number = null;
    if (query.page && query.perPage) {
      page = query.page;
      perPage = query.perPage;
      queryBuilder = queryBuilder
        .orderBy('ScgDepartment.id', 'ASC')
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

  async getDoDepartment(
    query: QuerySelectionDto,
  ): Promise<PaginationResponse<ScgDepartment>> {
    let queryBuilder =
      this.doDepartmentRepository.createQueryBuilder('DoDepartment');

    if (query.query) {
      queryBuilder = queryBuilder.andWhere('DoDepartment.name = :name', {
        name: query.query,
      });
    }

    let page: number = null;
    let perPage: number = null;
    if (query.page && query.perPage) {
      page = query.page;
      perPage = query.perPage;
      queryBuilder = queryBuilder
        .orderBy('DoDepartment.id', 'ASC')
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

  async getScgPosition(
    query: QuerySelectionDto,
  ): Promise<PaginationResponse<ScgPosition>> {
    let queryBuilder =
      this.scgPositionRepository.createQueryBuilder('ScgPosition');

    if (query.query) {
      queryBuilder = queryBuilder.andWhere('ScgPosition.name = :name', {
        name: query.query,
      });
    }

    let page: number = null;
    let perPage: number = null;
    if (query.page && query.perPage) {
      page = query.page;
      perPage = query.perPage;
      queryBuilder = queryBuilder
        .orderBy('ScgPosition.id', 'ASC')
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

  async getSection(
    query: QuerySelectionDto,
  ): Promise<PaginationResponse<Section>> {
    let queryBuilder = this.sectionRepository.createQueryBuilder('ScgPosition');

    if (query.query) {
      queryBuilder = queryBuilder.andWhere('ScgPosition.name = :name', {
        name: query.query,
      });
    }

    let page: number = null;
    let perPage: number = null;
    if (query.page && query.perPage) {
      page = query.page;
      perPage = query.perPage;
      queryBuilder = queryBuilder
        .orderBy('ScgPosition.id', 'ASC')
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

  async getSubdivision(
    query: QuerySelectionDto,
  ): Promise<PaginationResponse<SubDivision>> {
    let queryBuilder =
      this.subdivisionRepository.createQueryBuilder('SubDivision');

    if (query.query) {
      queryBuilder = queryBuilder.andWhere('SubDivision.name = :name', {
        name: query.query,
      });
    }

    let page: number = null;
    let perPage: number = null;
    if (query.page && query.perPage) {
      page = query.page;
      perPage = query.perPage;
      queryBuilder = queryBuilder
        .orderBy('SubDivision.id', 'ASC')
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

  async getWorkforce(
    query: QuerySelectionDto,
  ): Promise<PaginationResponse<Workforce>> {
    let queryBuilder = this.workforceRepository.createQueryBuilder('Workforce');

    if (query.query) {
      queryBuilder = queryBuilder.andWhere('Workforce.name = :name', {
        name: query.query,
      });
    }

    let page: number = null;
    let perPage: number = null;
    if (query.page && query.perPage) {
      page = query.page;
      perPage = query.perPage;
      queryBuilder = queryBuilder
        .orderBy('Workforce.id', 'ASC')
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

  async getCompany(
    query: QuerySelectionDto,
  ): Promise<PaginationResponse<Company>> {
    let queryBuilder = this.companyRepository.createQueryBuilder('company');

    if (query.query) {
      queryBuilder = queryBuilder.andWhere('company.name = :name', {
        name: query.query,
      });
    }

    let page: number = null;
    let perPage: number = null;
    if (query.page && query.perPage) {
      page = query.page;
      perPage = query.perPage;
      queryBuilder = queryBuilder
        .orderBy('company.id', 'ASC')
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
