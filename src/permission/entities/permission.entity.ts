import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "permission" })
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  tag: string;

  @Column()
  permiKey: string;

  @Column()
  permiName: string;

  @Column()
  permiTitle: string;
}
