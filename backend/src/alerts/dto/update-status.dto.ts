import { IsEnum, IsNotEmpty } from 'class-validator';
import { AlertStatus } from '../../common/enums/alert-status.enum';

export class UpdateStatusDto {
  @IsEnum(AlertStatus)
  @IsNotEmpty()
  status: AlertStatus;
}
