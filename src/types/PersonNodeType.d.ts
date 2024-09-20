import { Node } from 'reactflow';

export interface BirthInfo {
  birthYear?: number;
  birthMonth?: number;
  birthDate?: number;
}

export interface FamilyInfo {
  createdAt: number;
  birthDay?: Date;
  deathDay?: Date;
  givenName?: string;
  familyName?: string;
  gender?: string;
  profilePictureURL?: string;
  label: string;
  selected: boolean;
  parents: string[];
  children: string[];
  spouse: string[];
  descendants: number;
  descendantsWidth: number;
  ancestors: number;
  siblings?: string[];
  maritalPosition?: 'right' | 'left';
  maritalNodeId?: string;
  isDivorced: boolean;
  isVisible?: boolean;
}

export interface MaritalData {
  isDivorced: boolean;
}

export type PersonData = BirthInfo & FamilyInfo;
export interface NodeData<T> extends Node<T> {
  type: string;
  data: T;
}

export type MaritalNodeType = NodeData<MaritalData>;
export type PersonNodeType = NodeData<PersonData>;
