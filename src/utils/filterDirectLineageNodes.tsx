import { isPersonNodeType } from '@/typeGuards/personTypeGuards';
import { PersonNodeType, MaritalNodeType } from '../types/PersonNodeType';
import { Edge } from 'reactflow';

export function filterDirectLineagesNodes(wholeNodes: (PersonNodeType | MaritalNodeType)[], wholeEdges: Edge[], selectedNode: PersonNodeType | undefined) {
  const findDirectLineage = () => {
    if (!selectedNode || !isPersonNodeType(selectedNode)) {
      return { directLineageNodes: wholeNodes, directLineageEdges: wholeEdges };
    }

    const lineageNodes = new Set<PersonNodeType | MaritalNodeType>();
    const lineageEdges = new Set<Edge>();
    const findRelatedNodesAndEdges = (nodeId: PersonNodeType['id'], selectedNodeId: PersonNodeType['id'], lineage: 'isSibling' | 'isParent' | 'isChild' | 'isSelected') => {
      const node = wholeNodes.find((n) => n.id === nodeId);
      if (!node || lineageNodes.has(node)) return;
      lineageNodes.add(node);

      if (isPersonNodeType(node)) {
        if (node.data.spouse.length && lineage !== 'isParent') {
          node.data.spouse.forEach((spouseId) => {
            const spouseNode = wholeNodes.find((n) => n.id === spouseId);
            if (spouseNode) {
              lineageNodes.add(spouseNode);
            }
          });
        }
        switch (lineage) {
          case 'isSibling':
            node.data.children.forEach((childId) => findRelatedNodesAndEdges(childId, selectedNodeId, 'isChild'));
            node.data.parents.forEach((parentId) => findRelatedNodesAndEdges(parentId, selectedNodeId, 'isParent'));
            break;
          case 'isParent':
            node.data.parents.forEach((parentId) => findRelatedNodesAndEdges(parentId, selectedNodeId, 'isParent'));
            break;
          case 'isChild':
            node.data.children.forEach((childId) => findRelatedNodesAndEdges(childId, selectedNodeId, 'isChild'));
            break;
          case 'isSelected':
            node.data.siblings?.forEach((siblingsId) => findRelatedNodesAndEdges(siblingsId, selectedNodeId, 'isSibling'));
            node.data.children.forEach((childId) => findRelatedNodesAndEdges(childId, selectedNodeId, 'isChild'));
            node.data.parents.forEach((parentId) => findRelatedNodesAndEdges(parentId, selectedNodeId, 'isParent'));
            break;
        }

        lineageNodes.forEach((node) => {
          if (isPersonNodeType(node)) {
            const maritalNode = wholeNodes.find((n) => n.id === node.data.maritalNodeId);
            maritalNode && lineageNodes.add(maritalNode);
          }
        });
      }
    };

    findRelatedNodesAndEdges(selectedNode.id, selectedNode.id, 'isSelected');

    lineageNodes.forEach((node) => {
      const lineageEdgeList = wholeEdges.filter((edge) => edge.source === node.id);
      if (lineageEdgeList) {
        lineageEdgeList.forEach((edge) => {
          lineageEdges.add(edge);
        });
      }
    });

    return {
      directLineageNodes: Array.from(lineageNodes),
      directLineageEdges: Array.from(lineageEdges),
    };
  };
  const { directLineageNodes, directLineageEdges } = findDirectLineage();

  return { directLineageNodes, directLineageEdges };
}
