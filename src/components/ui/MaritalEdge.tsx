import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

export const MaritalEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const gap = 3;
  const strokeWidth = 2;
  const customPathUpper = `M${sourceX},${sourceY + gap} L${targetX},${targetY + gap}`;
  const customPathLower = `M${sourceX},${sourceY - gap} L${targetX},${targetY - gap}`;

  return (
    <>
      <path
        id={id}
        style={{ ...style,  strokeWidth: strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' }}
        className="react-flow__edge-path"
        d={customPathUpper}
      />
      <path
        id={`${id}-inner`}
        style={{ ...style, strokeWidth: strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' }}
        className="react-flow__edge-path"
        d={customPathLower}
      />
    </>
  );
};

export default MaritalEdge;
