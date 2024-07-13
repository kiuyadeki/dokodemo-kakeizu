import { atom } from 'recoil';
import { PersonNodeData, MaritalNodeData } from '../types/PersonNodeData';

export const initialNode: PersonNodeData | MaritalNodeData = {
  id: '0',
  type: 'person',
  data: {
    label: 'Node',
    birthYear: undefined,
    birthMonth: undefined,
    birthDate: undefined,
    gender: undefined,
    profilePicture: undefined,
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
  },
  position: { x: 0,
y: 0 },
};

export const wholeNodesState = atom<(PersonNodeData | MaritalNodeData)[]>({
  key: 'wholeNodesState',
  default: [initialNode],
  dangerouslyAllowMutability: true,
});
