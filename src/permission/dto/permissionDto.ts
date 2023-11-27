import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class PermissionDto {
  @ApiProperty()
  @IsNotEmpty()
  tag: string;

  @ApiProperty()
  @IsNotEmpty()
  permiKey: string;

  @ApiProperty()
  @IsNotEmpty()
  permiName: string;

  @ApiProperty()
  @IsNotEmpty()
  permiTitle: string;
}