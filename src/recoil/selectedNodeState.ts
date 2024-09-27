import { atom } from 'recoil';
import { PersonData } from '@/types/NodeData';
import { Node } from 'reactflow';

export const selectedNodeState = atom<Node<PersonData> | undefined>({
  key: 'selectedNode',
  default: undefined,
});
