import { atom } from 'recoil';
import { User } from '../types/api/User';

type LoginUser = User & { isAdmin: boolean };

export const LoginUser = atom<LoginUser | null>({
  key: 'LoginUser',
  default: null
})
