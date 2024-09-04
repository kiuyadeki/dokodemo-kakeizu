import { PersonNodeType } from '../types/PersonNodeType';
import { isPersonNodeType } from '../typeGuards/personTypeGuards';

export function getMaritalPosition(node: PersonNodeType) {
  const maritalPosition = node.data.maritalPosition || 'left';
  return maritalPosition;
}