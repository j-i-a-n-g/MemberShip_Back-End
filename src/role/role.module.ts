import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleEntity } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule { }
