import { TimestampWithSoftDelete } from '@/@types/model-dates';

export interface UserDto {
  name: string;
  email: string;
  password: string;
}

export interface User extends UserDto, TimestampWithSoftDelete {
  id: number;
}
