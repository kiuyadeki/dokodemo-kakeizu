import { atom } from 'recoil';
import { PersonNodeType } from '../types/PersonNodeType';

export const selectedNodeState = atom<PersonNodeType | null>({
  key: 'selectedNode',
  default: null,
});
