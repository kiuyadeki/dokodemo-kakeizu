import { Node } from 'reactflow';

export interface BirthInfo {
  birthYear?: number;
  birthMonth?: number;
  birthDate?: number;
}

export interface FamilyInfo {
  firstName?: string;
  lastName?: string;
  gender?: string;
  profilePicture?: File;
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
}

export interface MaritalData {
  isDivorced: boolean;
}

export type PersonData = BirthInfo & FamilyInfo;
export interface NodeData<T, U> extends Node<T> {
  type: U;
  data: T;
}

export type PersonNodeType = NodeData<PersonData, 'person'>;
export type MaritalNodeType = NodeData<MaritalData, 'marital'>;
