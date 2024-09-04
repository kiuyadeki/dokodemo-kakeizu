import { atom } from 'recoil';
import { PersonNodeType } from '../types/PersonNodeType';

export const selectedNodeState = atom<PersonNodeType | undefined>({
  key: 'selectedNode',
  default: undefined,
});
