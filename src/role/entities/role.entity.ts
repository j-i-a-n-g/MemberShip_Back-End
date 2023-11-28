import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  tag: string

  @Column()
  roleName: string

  @Column()
  roleDesc: string

  @Column()
  roleLevel: string

  @CreateDateColumn(
    {
      type: 'timestamp',
      comment: '创建时间',
      name: 'createTime'
    }
  )
  createTime: Date
}
