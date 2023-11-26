import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  memberLevel: number;

  @Column()
  topic: number;

  @CreateDateColumn(
    {
      type: 'timestamp',
      comment: '注册时间',
      name: 'createTime'
    }
  )
  createTime: Date;
}
