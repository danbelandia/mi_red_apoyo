import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { AlertType } from '../../common/enums/alert-type.enum';

export class CreateAlertDto {
  @IsInt()
  userId: number;

  @IsEnum(AlertType)
  @IsNotEmpty()
  type: AlertType;

  @IsOptional()
  @IsNotEmpty()
  message?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;
}
