import { atom } from 'recoil';
import { PersonNodeType, MaritalNodeType } from '../types/PersonNodeType';

export const initialNode: (PersonNodeType | MaritalNodeType) = {
  id: '0',
  type: 'person',
  data: {
    label: 'Node',
    birthYear: undefined,
    birthMonth: undefined,
    birthDate: undefined,
    gender: undefined,
    profilePicture: undefined,
    profilePictureURL: '',
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
  position: { x: 0,
y: 0 },
};

export const wholeNodesState = atom<(PersonNodeType | MaritalNodeType)[]>({
  key: 'wholeNodesState',
  default: [initialNode],
  dangerouslyAllowMutability: true,
});
