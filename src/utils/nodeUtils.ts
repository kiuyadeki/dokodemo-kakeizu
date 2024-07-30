import { getAddedNodeId } from './getAddedNodeId';
import { PersonNodeData, MaritalNodeData, PersonData } from '../types/PersonNodeData';
import { Node } from 'reactflow';

export const createMaritalNode = (position: Node<PersonData>['position']): Node<PersonData> => {
  const maritalId = getAddedNodeId();
  return {
    type: 'marital',
    id: maritalId,
    data: { isDivorced: false },
    position: { x: position.x,
y: position.y },
  };
};

export const createPersonNode = (position: PersonNodeData['position'], dataOverrides = {}): PersonNodeData => {
  const nodeId = getAddedNodeId();
  return {
    type: 'person',
    id: nodeId,
    data: {
      label: nodeId,
      parents: [],
      children: [],
      spouse: [],
      siblings: [nodeId],
      descendants: 0,
      descendantsWidth: 0,
      ancestors: 0,
      maritalPosition: undefined,
      selected: false,
      isDivorced: false,
      ...dataOverrides,
    },
    position: { ...position },
  };
};
