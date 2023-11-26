import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsOptional()
  tag: string;

  @ApiProperty()
  @IsOptional()
  memberLevel: number = 1;

  @ApiProperty()
  @IsOptional()
  topic: number = 1;

  @ApiProperty()
  @IsOptional()
  createTime: Date = new Date();
}
