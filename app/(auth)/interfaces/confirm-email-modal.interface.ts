import { ModalProps } from '@/components/UI';
import { BaseEntity } from '@/interfaces/base=entity';

export type ConfirmEmailModalProps = ModalProps & {
  onClick: () => void;
};

export enum Role {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  INSTITUTION = 'INSTITUTION',
}

export type User = BaseEntity & {
  email: string;
  name: string;
  dni: string;
  role: Role;
};
export interface AuthUser {
  id: string;
  teacherId?: string;
  studentId?: string;
  role: Role;
  email: string;
  name?: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  accessToken: string;
  expiresAt: number;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    teacherId?: string;
    studentId?: string;
    email: string;
    name: string | null;
    role: Role;
  };
}
