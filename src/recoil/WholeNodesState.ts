import { atom } from 'recoil';
import { NodeData } from '@/types/NodeData';
import { Node } from 'reactflow';

export const initialNode: Node<NodeData> = {
  id: '0',
  type: 'person',
  data: {
    label: '',
    createdAt: new Date().getTime(),
    birthDay: undefined,
    deathDay: undefined,
    gender: undefined,
    profilePictureURL: undefined,
    parents: [],
    children: [],
    spouse: [],
    siblings: ['0'],
    descendants: 0,
    descendantsWidth: 0,
    maritalPosition: undefined,
    ancestors: 0,
    selected: true,
    isDivorced: false,
    isVisible: true,
  },
  position: { x: 0, y: 0 },
};

export const wholeNodesState = atom<Node<NodeData>[]>({
  key: 'wholeNodesState',
  default: [initialNode],
  dangerouslyAllowMutability: true,
});
