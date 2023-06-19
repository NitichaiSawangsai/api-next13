import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestUtil } from './utils/test-util';
import { EmployeeModule } from '../src/employee/employee.module';
import { EmployeeType } from '../src/employee/entities/employee-type.entity';
import { EmployeeGroup } from '../src/employee/entities/employee-group.entity';
import { Role } from '../src/user-management/entities/role.entity';
import { User } from '../src/user-management/entities/user.entity';
import { AuthService } from '../src/auth/auth.service';
import { UserStatusType } from '../src/user-management/user-management.enum';

describe('Employee module', () => {
  let app: NestFastifyApplication;
  let employeeTypeRepository: Repository<EmployeeType>;
  let employeeGroupRepository: Repository<EmployeeGroup>;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await TestUtil.createTestingModule({
      imports: [EmployeeModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    employeeTypeRepository = app.get(getRepositoryToken(EmployeeType));
    employeeGroupRepository = app.get(getRepositoryToken(EmployeeGroup));
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

    const employeeType1 = employeeTypeRepository.create({
      id: 1,
      name: 'Type 1',
      createdBy: 'test@scg.com',
      updatedBy: 'test1@scg.com',
    });
    await employeeTypeRepository.save([employeeType1]);

    const employeeGroup1 = employeeGroupRepository.create({
      id: 1,
      name: 'Group 1',
      createdBy: 'test@scg.com',
      updatedBy: 'test1@scg.com',
    });
    await employeeGroupRepository.save([employeeGroup1]);
  });

  afterEach(async () => {
    await roleRepository.delete({});
    await userRepository.delete({});
    await employeeTypeRepository.delete({});
    await employeeGroupRepository.delete({});
  });

  describe('/GET /selection/type', () => {
    it('Should return all EmployeeType', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/employees/selection/type',
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual(
            expect.objectContaining({
              data: expect.arrayContaining([
                expect.objectContaining({
                  name: 'Type 1',
                  createdBy: 'test@scg.com',
                  updatedBy: 'test1@scg.com',
                }),
              ]),
              meta: { page: null, perPage: null, totalItem: 1 },
            }),
          );
        }));

    it('Should return data query', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/employees/selection/type',
          query: {
            query: 'Type 1',
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
                name: 'Type 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: 1, perPage: 10, totalItem: 1 },
          });
        }));
  });

  describe('/GET /selection/group', () => {
    it('Should return all EmployeeGroup', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/employees/selection/group',
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual(
            expect.objectContaining({
              data: expect.arrayContaining([
                expect.objectContaining({
                  name: 'Group 1',
                  createdBy: 'test@scg.com',
                  updatedBy: 'test1@scg.com',
                }),
              ]),
              meta: { page: null, perPage: null, totalItem: 1 },
            }),
          );
        }));

    it('Should return data query', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/employees/selection/group',
          query: {
            query: 'Group 1',
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
                name: 'Group 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: 1, perPage: 10, totalItem: 1 },
          });
        }));
  });
});
