import { getAddedNodeId } from './getAddedNodeId';
import { MaritalData, PersonData } from '../../types/NodeData';
import { Node } from 'reactflow';

export const createMaritalNode = (position: Node<MaritalData>['position']): Node<MaritalData> => {
  const maritalId = getAddedNodeId();
  return {
    type: 'marital',
    id: maritalId,
    data: { isDivorced: false },
    position: { x: position.x, y: position.y },
  };
};

export const createPersonNode = (position: Node<PersonData>['position'], dataOverrides = {}): Node<PersonData> => {
  const nodeId = getAddedNodeId();
  return {
    type: 'person',
    id: nodeId,
    data: {
      createdAt: new Date().getTime(),
      birthDay: undefined,
      deathDay: undefined,
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
      isVisible: true,
      ...dataOverrides,
    },
    position: { ...position },
  };
};
