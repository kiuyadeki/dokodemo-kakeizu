import { Node } from 'reactflow';

export interface PersonInfo {
  firstName?: string;
  lastName?: string;
  gender?: string;
  profilePicture?: File;
  profilePictureURL?: string;
  label: string;
  selected: boolean;
}

export interface BirthInfo {
  birthYear?: number;
  birthMonth?: number;
  birthDate?: number;
}

export interface FamilyInfo {
  parents: string[];
  children: string[];
  spouse: string[];
  descendants: number;
  descendantsWidth: number;
  ancestors: number;
  siblings: string[];
  maritalPosition?: 'right' | 'left';
  maritalNodeId?: string;
  isDivorced?: boolean;
}

export interface MaritalData {
  isDivorced: boolean;
}

export type PersonData = PersonInfo & BirthInfo & FamilyInfo;

// export interface PersonData extends PersonInfo, BirthInfo, FamilyInfo {
  
// }

interface NodeData<T> extends Node<T> {
  type: 'person' | 'marital';
  data: T;
}

export type PersonNodeData = NodeData<PersonData>;
export type MaritalNodeData = NodeData<Partial<PersonData>>;
// export type MaritalNodeData = NodeData<MaritalData>;

// export interface MaritalData {
//   isDivorced: boolean;
// }

// export interface PersonNodeData extends Node<PersonData> {
//   type: 'person';
//   data: PersonData;
// }

// export interface MaritalNodeData extends Node<PersonData | MaritalData> {
//   type: 'marital';
//   data: PersonData | MaritalData;
// }
