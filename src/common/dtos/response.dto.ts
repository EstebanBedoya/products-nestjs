/** @package */
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Expose()
export class ResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty()
  readonly data: unknown[];
}
