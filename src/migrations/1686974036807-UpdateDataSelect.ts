import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDataSelect1686974036807 implements MigrationInterface {
  name = 'UpdateDataSelect1686974036807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        select setval('public.migrations_id_seq', 
            (SELECT CASE WHEN  (SELECT  t.id FROM public.migrations t ORDER BY t.id DESC limit 1) > 0
                          THEN (SELECT  t.id FROM public.migrations t ORDER BY t.id DESC limit 1) + 1      
                        ELSE 1  END  as id)
            , true);
     `);

    await queryRunner.query(`
        select setval('public.company_id_seq', 
        (SELECT CASE WHEN  (SELECT  t.id FROM public.company t ORDER BY t.id DESC limit 1) > 0
                      THEN (SELECT  t.id FROM public.company t ORDER BY t.id DESC limit 1) + 1      
                    ELSE 1  END  as id)
        , true);
  
        select setval('public.section_id_seq', 
        (SELECT CASE WHEN  (SELECT  t.id FROM public.section t ORDER BY t.id DESC limit 1) > 0
                      THEN (SELECT  t.id FROM public.section t ORDER BY t.id DESC limit 1) + 1      
                    ELSE 1  END  as id)
        , true);
  
        select setval('public.scg_position_id_seq', 
        (SELECT CASE WHEN  (SELECT  t.id FROM public.scg_position t ORDER BY t.id DESC limit 1) > 0
                      THEN (SELECT  t.id FROM public.scg_position t ORDER BY t.id DESC limit 1) + 1      
                    ELSE 1  END  as id)
        , true);
  
        select setval('public.sub_division_id_seq',
        (SELECT CASE WHEN  (SELECT  t.id FROM public.sub_division t ORDER BY t.id DESC limit 1) > 0
                      THEN (SELECT  t.id FROM public.sub_division t ORDER BY t.id DESC limit 1) + 1
                    ELSE 1  END  as id)
        , true);
  
        select setval('public.scg_department_id_seq',
        (SELECT CASE WHEN  (SELECT  t.id FROM public.scg_department t ORDER BY t.id DESC limit 1) > 0
                      THEN (SELECT  t.id FROM public.scg_department t ORDER BY t.id DESC limit 1) + 1
                    ELSE 1  END  as id)
        , true);
  
      select setval('public.do_department_id_seq', 
      (SELECT CASE WHEN  (SELECT  t.id FROM public.do_department t ORDER BY t.id DESC limit 1) > 0
                    THEN (SELECT  t.id FROM public.do_department t ORDER BY t.id DESC limit 1) + 1      
                  ELSE 1  END  as id)
        , true); 
        
      select setval('public.workforce_id_seq',
      (SELECT CASE WHEN  (SELECT  t.id FROM public.workforce t ORDER BY t.id DESC limit 1) > 0
                    THEN (SELECT  t.id FROM public.workforce t ORDER BY t.id DESC limit 1) + 1
                  ELSE 1  END  as id)
        , true);
      `);

    await queryRunner.query(`
  
        select setval('public.employee_group_id_seq', 
        (SELECT CASE WHEN  (SELECT  t.id FROM public.employee_group t ORDER BY t.id DESC limit 1) > 0
                      THEN (SELECT  t.id FROM public.employee_group t ORDER BY t.id DESC limit 1) + 1      
                    ELSE 1  END  as id)
        , true);
  
        select setval('public.employee_type_id_seq', 
        (SELECT CASE WHEN  (SELECT  t.id FROM public.employee_type t ORDER BY t.id DESC limit 1) > 0
                      THEN (SELECT  t.id FROM public.employee_type t ORDER BY t.id DESC limit 1) + 1      
                    ELSE 1  END  as id)
        , true);
      `);

    await queryRunner.query(`
        select setval('public.project_status_id_seq', 
        (SELECT CASE WHEN  (SELECT  t.id FROM public.project_status t ORDER BY t.id DESC limit 1) > 0
                      THEN (SELECT  t.id FROM public.project_status t ORDER BY t.id DESC limit 1) + 1      
                    ELSE 1  END  as id)
        , true);
  
        select setval('public.project_group_id_seq', 
        (SELECT CASE WHEN  (SELECT  t.id FROM public.project_group t ORDER BY t.id DESC limit 1) > 0
                      THEN (SELECT  t.id FROM public.project_group t ORDER BY t.id DESC limit 1) + 1      
                    ELSE 1  END  as id)
        , true);
  
        select setval('public.project_type_id_seq', 
        (SELECT CASE WHEN  (SELECT  t.id FROM public.project_type t ORDER BY t.id DESC limit 1) > 0
                      THEN (SELECT  t.id FROM public.project_type t ORDER BY t.id DESC limit 1) + 1      
                    ELSE 1  END  as id)
        , true);
      `);

    await queryRunner.query(`
      -- insert data for master
      INSERT INTO "public"."company"("id", "name", "created_by", "updated_by") VALUES(1, 'Adecco', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."company"("id", "name", "created_by", "updated_by") VALUES(2, 'Calcal', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."company"("id", "name", "created_by", "updated_by") VALUES(3, 'CMCG', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."company"("id", "name", "created_by", "updated_by") VALUES(4, 'Freelance', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."company"("id", "name", "created_by", "updated_by") VALUES(5, 'Getlink', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."company"("id", "name", "created_by", "updated_by") VALUES(6, 'Hitachi Vantara', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."company"("id", "name", "created_by", "updated_by") VALUES(7, 'Kelly', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."company"("id", "name", "created_by", "updated_by") VALUES(8, 'Oitolabs', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."company"("id", "name", "created_by", "updated_by") VALUES(9, 'PP&P Advance', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."company"("id", "name", "created_by", "updated_by") VALUES(10, 'Profess-One', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."company"("id", "name", "created_by", "updated_by") VALUES(11, 'SAVVYCOM', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."company"("id", "name", "created_by", "updated_by") VALUES(12, 'SCG Digital Office', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."company"("id", "name", "created_by", "updated_by") VALUES(13, 'SmartOSC', 'watcyota@scg.com', 'watcyota@scg.com');

      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(1, 'A Team', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(2, 'Administration', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(3, 'AI ML', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(4, 'Attraction', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(5, 'BA', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(6, 'BD', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(7, 'BPA', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(8, 'Business Developer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(9, 'Business Incubator', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(10, 'COE', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(11, 'Communication', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(12, 'COO', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(13, 'Data Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(14, 'Data Science', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(15, 'Design Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(16, 'Developer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(17, 'Developer - UI', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(18, 'Digital Design', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(19, 'Executive Assistant', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(20, 'Executive Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(21, 'Finance', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(22, 'Graphic', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(23, 'HCI', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(24, 'Head of', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(25, 'HR', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(26, 'HR & Finance', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(27, 'India Office', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(28, 'IoT', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(29, 'MIS & Analytics', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(30, 'NLP', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(31, 'Office Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(32, 'Office Management ', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(33, 'Partnership Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(34, 'PC', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(35, 'PD', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(36, 'Physical Design', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(37, 'Planning', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(38, 'PM', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(39, 'Product Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(40, 'QA', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(41, 'Research', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(42, 'Retention', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(43, 'RM', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(44, 'SA', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(45, 'SCG ID', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(46, 'SCM', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(47, 'SDE', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(48, 'SEC', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(49, 'Security Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(50, 'Sourcing', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(51, 'SRE', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(52, 'Team Lead', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."section"("id", "name", "created_by", "updated_by") VALUES(53, 'TM', 'watcyota@scg.com', 'watcyota@scg.com');

      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(1, 'Administrative Officer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(2, 'Architect', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(3, 'Associate Administration Officer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(4, 'Associate Assembly Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(5, 'Associate Data Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(6, 'Associate Data Scientist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(7, 'Associate Digital Business Development', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(8, 'Associate Digital Business Development Coordinator', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(9, 'Associate Digital Business Partnership', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(10, 'Associate Digital Business Partnerships', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(11, 'Associate Digital Campaign Specialist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(12, 'Associate Digital Content & Campaign Specialist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(13, 'Associate Digital Experience Designer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(14, 'Associate Digital Finance Administrator', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(15, 'Associate Digital Performance Excellences Specialist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(16, 'Associate Digital Project Manager', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(17, 'Associate Digital Resource Attraction Specialist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(18, 'Associate Digital Strategic Partnership Coordinator', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(19, 'Associate Digital Vendor Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(20, 'Associate Innovation Developer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(21, 'Associate Interface Designer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(22, 'Associate Marketing Coordinator (SCG ID)', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(23, 'Associate Marketing Corrdinator (SCGID)', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(24, 'Associate Product Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(25, 'Associate SCM Administrator', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(26, 'Associate Software Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(27, 'Associate Technology Analyst', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(28, 'Associate Technology Developer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(29, 'Associate Technology Developer  ', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(30, 'Associate Technology Evangelist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(31, 'Associate Technology QA', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(32, 'Associate Vice President', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(33, 'Associated Technology Operation Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(34, 'Business Operation Architect', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(35, 'Chief Operation Officer และดูแลงาน Head of Digital Business Development', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(36, 'Cyber Security Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(37, 'Data Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(38, 'Data Intelligence Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(39, 'Data Scientist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(40, 'Data Specialist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(41, 'Dev Freelance', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(42, 'Digital Business Developer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(43, 'Digital Business Development', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(44, 'Digital Business Implementer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(45, 'Digital Business Incubator', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(46, 'Digital Campaign Specialist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(47, 'Digital Content & Campaign Specialist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(48, 'Digital Content and Campaign Specialist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(49, 'Digital Content and Campaign Specilaist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(50, 'Digital Graphic Designer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(51, 'Digital Media Designer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(52, 'Digital Performance Excellences Specialist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(53, 'Digital Project Manager', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(54, 'Digital Resource & Community Development Strategist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(55, 'Digital Resource Attraction Specialist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(56, 'Digital Resource Attraction Specialist ', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(57, 'Digital Resource Development & Project Coordinator', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(58, 'Digital Resource Development Specialist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(59, 'Digital Resource Office Management Specialist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(60, 'Digital Service & Finance Administrator', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(61, 'Director - Product Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(62, 'Director - Robotic Process Automation', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(63, 'Executive Assistant', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(64, 'Experience Designer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(65, 'Head of Digital Data Engineering', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(66, 'Head of Digital Data Technology', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(67, 'Head of Digital Design', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(68, 'Head of Digital Process Architecture', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(69, 'Head of Digital Product Development', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(70, 'Head of Digital Resources & Services Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(71, 'Head of Digital Technology', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(72, 'Head of Digital Technology Architecture', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(73, 'Head of Smart Device Engineering', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(74, 'Innovation Developer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(75, 'Innovative Developer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(76, 'Interface Designer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(77, 'Lead Business Operation Architect', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(78, 'Lead Data Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(79, 'Lead Data Intelligence Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(80, 'Lead Data Scientist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(81, 'Lead Design Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(82, 'Lead Digital Experience Designer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(83, 'Lead Digital Graphic Designer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(84, 'Lead Digital Interface Designer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(85, 'Lead Digital Project Manager', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(86, 'Lead Digital Resource Management Manager', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(87, 'Lead Digital Service & Finance', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(88, 'Lead Engineer - Systems & Operations', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(89, 'Lead Human Resources Officer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(90, 'Lead Product Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(91, 'Lead Site Reliability and Software Excellence Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(92, 'Lead Software Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(93, 'Lead Supply Chain Planning', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(94, 'Lead Technical Support Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(95, 'Lead Technology Analyst', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(96, 'Lead Technology Architect', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(97, 'Lead Technology Developer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(98, 'Lead Technology Evangelist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(99, 'Lead Technology Operation Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(100, 'Lead Test Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(101, 'Lead UX Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(102, 'Manager - Finance & Accounting', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(103, 'Manager - Software Engineering', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(104, 'Manager - Talent Acquisition', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(105, 'Managing Director', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(106, 'Manger - Production Support', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(107, 'Principal Data Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(108, 'Principal Digital Business Incubator', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(109, 'Principal Digital Center of Excellences', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(110, 'Principal Digital Product Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(111, 'Principal Digital Security', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(112, 'Principal Digital Service & Finance', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(113, 'Principal Digital Technology Evangelist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(114, 'Principal Digital Technology Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(115, 'Principal Site Reliability and Software Excellence Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(116, 'Principal Site Reliability Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(117, 'Principal Software Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(118, 'Principal Technology Developer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(119, 'Principal Technology Manager', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(120, 'Principal Test Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(121, 'Principal UX Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(122, 'Product Designer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(123, 'Product Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(124, 'Product Marketing Manager', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(125, 'Product Sales Manager', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(126, 'Project Coordinator', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(127, 'Security Operations Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(128, 'Senior Architect', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(129, 'Senior Business Implementater', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(130, 'Senior Business Operation Architect', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(131, 'Senior Cyber Security Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(132, 'Senior Data Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(133, 'Senior Data Intelligence Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(134, 'Senior Digital Business Developer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(135, 'Senior Digital Business Incubator', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(136, 'Senior Digital Business Operation Architect', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(137, 'Senior Digital Experience Designer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(138, 'Senior Digital Graphic Designer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(139, 'Senior Digital Media Designer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(140, 'Senior Digital Performance Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(141, 'Senior Digital Product Development', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(142, 'Senior Digital Project Manager', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(143, 'Senior Digital Resource Management Manager', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(144, 'Senior Digital Strategic Partnership Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(145, 'Senior Director - Product Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(146, 'Senior Innovation Developer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(147, 'Senior Lead Production Support Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(148, 'Senior Manager - Data Science', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(149, 'Senior Manager - Human Resources', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(150, 'Senior Manager - Software Engineering', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(151, 'Senior Principal Data Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(152, 'Senior Principal Software Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(153, 'Senior Principal Test Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(154, 'Senior Product Manager', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(155, 'Senior Site Reliability Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(156, 'Senior Software Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(157, 'Senior Technical Resource & Community Development Manager', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(158, 'Senior Technical Support Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(159, 'Senior Technology Analyst', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(160, 'Senior Technology Architect', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(161, 'Senior Technology Developer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(162, 'Senior Technology Evangelist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(163, 'Senior Technology Operation Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(164, 'Senior Technology QA', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(165, 'Senior Test Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(166, 'Software Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(167, 'Software Engineering Intern', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(168, 'Sr. Lead Software Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(169, 'Supply Chain Sourcing Manager', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(170, 'Supply Chain Sourcing Officer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(171, 'Technology Analyst', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(172, 'Technology Architect', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(173, 'Technology Developer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(174, 'Technology Evangelist', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(175, 'Technology QA', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(176, 'UX Engineer', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_position"("id", "name", "created_by", "updated_by") VALUES(177, 'Warehouse Staff', 'watcyota@scg.com', 'watcyota@scg.com');

      INSERT INTO "public"."sub_division"("id", "name", "created_by", "updated_by") VALUES(1, 'Digital Office', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."sub_division"("id", "name", "created_by", "updated_by") VALUES(2, 'Oitolabs', 'watcyota@scg.com', 'watcyota@scg.com');

      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(1, 'Data Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(2, 'Data Technology - India', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(3, 'Delivery - India', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(4, 'Development', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(5, 'DevOps', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(6, 'Digital Business Development', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(7, 'Digital Data Technology', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(8, 'Digital Design', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(9, 'Digital Labs', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(10, 'Digital Process Architecture', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(11, 'Digital Resource & Service Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(12, 'Digital Security', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(13, 'Digital Smart Device Engineering ', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(14, 'Digital Technology', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(15, 'Digital Technology - India', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(16, 'Digital Technology Architecture', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(17, 'Digital Technology Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(18, 'Executive Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(19, 'Oitolabs', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(20, 'Product Development - India', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(21, 'Product Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(22, 'Quality Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(23, 'Resource & Service Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(24, 'Resource & Service Management - India', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."scg_department"("id", "name", "created_by", "updated_by") VALUES(25, 'SRE - India', 'watcyota@scg.com', 'watcyota@scg.com');

      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(1, 'Business Development', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(2, 'Business Process Architecture', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(3, 'Center of Excellences', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(4, 'Data Technology', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(5, 'Delivery', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(6, 'Design', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(7, 'Digital Technology', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(8, 'DO', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(9, 'Finance', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(10, 'Labs', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(11, 'Product Development', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(12, 'Resource Development', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(13, 'Resource Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(14, 'SCG ID', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(15, 'Security', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(16, 'Smart Device Engineering', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(17, 'Solution Architect', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(18, 'SRE', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(19, 'Supply Chain Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."do_department"("id", "name", "created_by", "updated_by") VALUES(20, 'Technology Management', 'watcyota@scg.com', 'watcyota@scg.com');

      INSERT INTO "public"."workforce"("id", "name", "created_by", "updated_by") VALUES(1, 'BU', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."workforce"("id", "name", "created_by", "updated_by") VALUES(2, 'Management', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."workforce"("id", "name", "created_by", "updated_by") VALUES(3, 'R & D', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."workforce"("id", "name", "created_by", "updated_by") VALUES(4, 'Support', 'watcyota@scg.com', 'watcyota@scg.com');
    `);

    await queryRunner.query(`
      -- insert data for employee
      INSERT INTO "public"."employee_group"("id", "name", "created_by", "updated_by") VALUES(1, 'Contract Employee', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."employee_group"("id", "name", "created_by", "updated_by") VALUES(2, 'Contractor', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."employee_group"("id", "name", "created_by", "updated_by") VALUES(3, 'Freelance', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."employee_group"("id", "name", "created_by", "updated_by") VALUES(4, 'India Employee', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."employee_group"("id", "name", "created_by", "updated_by") VALUES(5, 'Inter staff – Home', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."employee_group"("id", "name", "created_by", "updated_by") VALUES(6, 'Outsource', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."employee_group"("id", "name", "created_by", "updated_by") VALUES(7, 'Permanent Employee', 'watcyota@scg.com', 'watcyota@scg.com');
      
      INSERT INTO "public"."employee_type"("id", "name", "created_by", "updated_by") VALUES(1, 'Payroll', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."employee_type"("id", "name", "created_by", "updated_by") VALUES(2, 'Non-Payroll', 'watcyota@scg.com', 'watcyota@scg.com');
    `);

    await queryRunner.query(`
      -- insert data for project
      INSERT INTO "public"."project_status"("id", "name", "created_by", "updated_by") VALUES(1, 'Cancel', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_status"("id", "name", "created_by", "updated_by") VALUES(2, 'Go Live', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_status"("id", "name", "created_by", "updated_by") VALUES(3, 'Hold', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_status"("id", "name", "created_by", "updated_by") VALUES(4, 'New', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_status"("id", "name", "created_by", "updated_by") VALUES(5, 'On-going', 'watcyota@scg.com', 'watcyota@scg.com');
      
      INSERT INTO "public"."project_group"("id", "name", "created_by", "updated_by") VALUES(1, 'Data Project', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_group"("id", "name", "created_by", "updated_by") VALUES(2, 'DO Project', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_group"("id", "name", "created_by", "updated_by") VALUES(3, 'Incubation', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_group"("id", "name", "created_by", "updated_by") VALUES(4, 'Others', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_group"("id", "name", "created_by", "updated_by") VALUES(5, 'Smart City&Building', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_group"("id", "name", "created_by", "updated_by") VALUES(6, 'Smart Industry', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_group"("id", "name", "created_by", "updated_by") VALUES(7, 'Smart Living', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_group"("id", "name", "created_by", "updated_by") VALUES(8, 'Smart Wellness', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_group"("id", "name", "created_by", "updated_by") VALUES(9, 'Solution Delivery', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_group"("id", "name", "created_by", "updated_by") VALUES(10, 'Warmbody', 'watcyota@scg.com', 'watcyota@scg.com');
      
      INSERT INTO "public"."project_type"("id", "name", "created_by", "updated_by") VALUES(1, 'CR', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_type"("id", "name", "created_by", "updated_by") VALUES(2, 'Lab Project', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_type"("id", "name", "created_by", "updated_by") VALUES(3, 'Product', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_type"("id", "name", "created_by", "updated_by") VALUES(4, 'Project', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_type"("id", "name", "created_by", "updated_by") VALUES(5, 'Subscription Service', 'watcyota@scg.com', 'watcyota@scg.com');
      INSERT INTO "public"."project_type"("id", "name", "created_by", "updated_by") VALUES(6, 'Warmbody', 'watcyota@scg.com', 'watcyota@scg.com');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }
}
