import { Node } from 'reactflow';

export interface PersonData {
  createdAt: number;
  birthDay?: Date;
  deathDay?: Date;
  givenName?: string;
  familyName?: string;
  gender?: string;
  profilePictureURL?: string;
  label?: string;
  selected?: boolean;
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
  isVisible?: boolean;
}

export interface MaritalData {
  isDivorced: boolean;
}

export type NodeData = PersonData | MaritalData;

