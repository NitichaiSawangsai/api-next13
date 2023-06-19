import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestUtil } from './utils/test-util';
import { ScgDepartment } from '../src/master/entities/scg-department.entity';
import { DoDepartment } from '../src/master/entities/do-department.entity';
import { ScgPosition } from '../src/master/entities/scg-position.entity';
import { Section } from '../src/master/entities/section.entity';
import { SubDivision } from '../src/master/entities/sub-division.entity';
import { Workforce } from '../src/master/entities/workforce.entity';
import { Company } from '../src/master/entities/company.entity';
import { MasterModule } from '../src/master/master.module';
import { AuthService } from '../src/auth/auth.service';
import { User } from '../src/user-management/entities/user.entity';
import { UserStatusType } from '../src/user-management/user-management.enum';
import { Role } from '../src/user-management/entities/role.entity';

describe('Master module', () => {
  let app: NestFastifyApplication;
  let scgDepartmentRepository: Repository<ScgDepartment>;
  let doDepartmentRepository: Repository<DoDepartment>;
  let scgPositionRepository: Repository<ScgPosition>;
  let sectionRepository: Repository<Section>;
  let subDivisionRepository: Repository<SubDivision>;
  let workforceRepository: Repository<Workforce>;
  let companyRepository: Repository<Company>;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await TestUtil.createTestingModule({
      imports: [MasterModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    scgDepartmentRepository = app.get(getRepositoryToken(ScgDepartment));
    doDepartmentRepository = app.get(getRepositoryToken(DoDepartment));
    scgPositionRepository = app.get(getRepositoryToken(ScgPosition));
    sectionRepository = app.get(getRepositoryToken(Section));
    subDivisionRepository = app.get(getRepositoryToken(SubDivision));
    workforceRepository = app.get(getRepositoryToken(Workforce));
    companyRepository = app.get(getRepositoryToken(Company));
    userRepository = app.get(getRepositoryToken(User));
    roleRepository = app.get(getRepositoryToken(Role));

    authService = moduleRef.get<AuthService>(AuthService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  beforeEach(async () => {
    roleRepository.save([
      roleRepository.create({
        id: 1,
        name: 'admin',
        createdBy: 'admin@scg.com',
      }),
    ]);
    const user = userRepository.create({
      id: 1,
      roleId: 1,
      email: 'admin@scg.com',
      name: 'admin',
      status: UserStatusType.active,
      createdBy: 'admin@scg.com',
    });
    userRepository.save([user]);

    jest.spyOn(authService, 'decodeJwt').mockImplementation(() => {
      return user;
    });

    const ScgDepartment1 = scgDepartmentRepository.create({
      id: 1,
      name: 'Scg Department 1',
      createdBy: 'test@scg.com',
      updatedBy: 'test1@scg.com',
    });
    await scgDepartmentRepository.save([ScgDepartment1]);

    const DoDepartment1 = doDepartmentRepository.create({
      id: 1,
      name: 'Do Department 1',
      createdBy: 'test@scg.com',
      updatedBy: 'test1@scg.com',
    });
    await doDepartmentRepository.save([DoDepartment1]);

    const ScgPosition1 = scgPositionRepository.create({
      id: 1,
      name: 'Scg Position 1',
      createdBy: 'test@scg.com',
      updatedBy: 'test1@scg.com',
    });
    await scgPositionRepository.save([ScgPosition1]);

    const Section1 = sectionRepository.create({
      id: 1,
      name: 'Section 1',
      createdBy: 'test@scg.com',
      updatedBy: 'test1@scg.com',
    });
    await sectionRepository.save([Section1]);

    const SubDivision1 = subDivisionRepository.create({
      id: 1,
      name: 'Subdivision 1',
      createdBy: 'test@scg.com',
      updatedBy: 'test1@scg.com',
    });
    await subDivisionRepository.save([SubDivision1]);

    const Workforce1 = workforceRepository.create({
      id: 1,
      name: 'Workforce 1',
      createdBy: 'test@scg.com',
      updatedBy: 'test1@scg.com',
    });
    await workforceRepository.save([Workforce1]);

    const company1 = companyRepository.create({
      id: 1,
      name: 'Company 1',
      createdBy: 'test@scg.com',
      updatedBy: 'test1@scg.com',
    });
    await companyRepository.save([company1]);
  });

  afterEach(async () => {
    await roleRepository.delete({});
    await userRepository.delete({});
    await scgDepartmentRepository.delete({});
    await doDepartmentRepository.delete({});
    await scgPositionRepository.delete({});
    await sectionRepository.delete({});
    await subDivisionRepository.delete({});
    await workforceRepository.delete({});
    await companyRepository.delete({});
  });

  describe('/GET /selection/scg-department', () => {
    it('Should return all ScgDepartment', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/scg-department',
          headers: {
            Authorization: `Bearer mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Scg Department 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: null, perPage: null, totalItem: 1 },
          });
        }));

    it('Should return data query', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/scg-department',
          query: {
            query: 'Scg Department 1',
            page: '1',
            'per-page': '10',
          },
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Scg Department 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: 1, perPage: 10, totalItem: 1 },
          });
        }));
  });

  describe('/GET /selection/do-department', () => {
    it('Should return all DoDepartment', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/do-department',
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Do Department 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: null, perPage: null, totalItem: 1 },
          });
        }));

    it('Should return data query', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/do-department',
          query: {
            query: 'Do Department 1',
            page: '1',
            'per-page': '10',
          },
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Do Department 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: 1, perPage: 10, totalItem: 1 },
          });
        }));
  });

  describe('/GET /selection/scg-position', () => {
    it('Should return all ScgPosition', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/scg-position',
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Scg Position 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: null, perPage: null, totalItem: 1 },
          });
        }));

    it('Should return data query', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/scg-position',
          query: {
            query: 'Scg Position 1',
            page: '1',
            'per-page': '10',
          },
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Scg Position 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: 1, perPage: 10, totalItem: 1 },
          });
        }));
  });
  describe('/GET /selection/section', () => {
    it('Should return all Section', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/section',
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Section 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: null, perPage: null, totalItem: 1 },
          });
        }));

    it('Should return data query', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/section',
          query: {
            query: 'Section 1',
            page: '1',
            'per-page': '10',
          },
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Section 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: 1, perPage: 10, totalItem: 1 },
          });
        }));
  });

  describe('/GET /selection/sub-division', () => {
    it('Should return all SubDivision', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/sub-division',
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Subdivision 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: null, perPage: null, totalItem: 1 },
          });
        }));

    it('Should return data query', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/sub-division',
          query: {
            query: 'Subdivision 1',
            page: '1',
            'per-page': '10',
          },
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Subdivision 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: 1, perPage: 10, totalItem: 1 },
          });
        }));
  });

  describe('/GET /selection/workforce', () => {
    it('Should return all Workforce', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/workforce',
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Workforce 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: null, perPage: null, totalItem: 1 },
          });
        }));

    it('Should return data query', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/workforce',
          query: {
            query: 'Workforce 1',
            page: '1',
            'per-page': '10',
          },
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Workforce 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: 1, perPage: 10, totalItem: 1 },
          });
        }));
  });

  describe('/GET /selection/company', () => {
    it('Should return all Company', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/company',
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Company 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: null, perPage: null, totalItem: 1 },
          });
        }));

    it('Should return data query', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/master/selection/company',
          query: {
            query: 'Company 1',
            page: '1',
            'per-page': '10',
          },
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Company 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: 1, perPage: 10, totalItem: 1 },
          });
        }));
  });
});
