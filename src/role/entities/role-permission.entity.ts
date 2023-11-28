import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 're_role_permission' })
export class RoleAndPermissionEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  roleTag: string

  @Column()
  roleName: string

  @Column()
  permiTag: string

  @Column()
  permiKey: string;

  @Column()
  permiName: string;
}
