import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectType } from '../src/project/entities/project-type.entity';
import { ProjectModule } from '../src/project/project.module';
import { TestUtil } from './utils/test-util';
import { ProjectGroup } from '../src/project/entities/project-group.entity';
import { ProjectStatus } from '../src/project/entities/project-status.entity';
import { AuthService } from '../src/auth/auth.service';
import { Role } from '../src/user-management/entities/role.entity';
import { User } from '../src/user-management/entities/user.entity';
import { UserStatusType } from '../src/user-management/user-management.enum';

describe('Project module', () => {
  let app: NestFastifyApplication;
  let projectTypeRepository: Repository<ProjectType>;
  let projectGroupRepository: Repository<ProjectGroup>;
  let projectStatusRepository: Repository<ProjectStatus>;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await TestUtil.createTestingModule({
      imports: [ProjectModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    projectTypeRepository = app.get(getRepositoryToken(ProjectType));
    projectGroupRepository = app.get(getRepositoryToken(ProjectGroup));
    projectStatusRepository = app.get(getRepositoryToken(ProjectStatus));
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

    const projectType1 = projectTypeRepository.create({
      id: 1,
      name: 'Type 1',
      createdBy: 'test@scg.com',
      updatedBy: 'test1@scg.com',
    });
    await projectTypeRepository.save([projectType1]);

    const projectGroup1 = projectGroupRepository.create({
      id: 1,
      name: 'Group 1',
      createdBy: 'test@scg.com',
      updatedBy: 'test1@scg.com',
    });
    await projectGroupRepository.save([projectGroup1]);

    const projectStatus1 = projectStatusRepository.create({
      id: 1,
      name: 'Status 1',
      createdBy: 'test@scg.com',
      updatedBy: 'test1@scg.com',
    });
    await projectStatusRepository.save([projectStatus1]);
  });

  afterEach(async () => {
    await roleRepository.delete({});
    await userRepository.delete({});
    await projectTypeRepository.delete({});
    await projectGroupRepository.delete({});
    await projectStatusRepository.delete({});
  });

  describe('/GET /selection/type', () => {
    it('Should return all ProjectType', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/projects/selection/type',
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
            meta: { page: null, perPage: null, totalItem: 1 },
          });
        }));

    it('Should return data query', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/projects/selection/type',
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

  describe('/GET/ selection/group', () => {
    it('Should return all ProjectGroup', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/projects/selection/group',
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
            meta: { page: null, perPage: null, totalItem: 1 },
          });
        }));

    it('Should return data query', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/projects/selection/group',
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

  describe('/GET/ selection/status', () => {
    it('Should return all ProjectStatus', () =>
      app
        .inject({
          method: 'GET',
          url: '/api/v1/projects/selection/status',
          headers: {
            Authorization: `Bearer $mocked-token`,
          },
        })
        .then((result) => {
          const json = result.json();
          expect(json).toEqual({
            data: expect.arrayContaining([
              expect.objectContaining({
                name: 'Status 1',
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
          url: '/api/v1/projects/selection/status',
          query: {
            query: 'Status 1',
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
                name: 'Status 1',
                createdBy: 'test@scg.com',
                updatedBy: 'test1@scg.com',
              }),
            ]),
            meta: { page: 1, perPage: 10, totalItem: 1 },
          });
        }));
  });
});
