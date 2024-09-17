import { isPersonNodeType } from "@/typeGuards/personTypeGuards";
import { MaritalNodeType, PersonNodeType } from "@/types/PersonNodeType";

export const sortNodesByAge = (nodes: (PersonNodeType | MaritalNodeType)[]) => {
  const sortedNodes = nodes.sort((a, b) => {
    const getAge = (node: PersonNodeType) => {
      const birthDay = node.data.birthDay;
      return birthDay ? new Date().getTime() - new Date(birthDay).getTime() : -Infinity;
    };
    if (!isPersonNodeType(a) || !isPersonNodeType(b)) return 0;
    const ageA = getAge(a);
    const ageB = getAge(b);

    if (ageA !== undefined && ageB === undefined) return -1;
    if (ageA === undefined && ageB !== undefined) return 1;

    if (ageA !== undefined && ageB !== undefined) {
      return ageA - ageB;
    }

    return a.data.createdAt - b.data.createdAt;
  });

  return sortedNodes;
}
