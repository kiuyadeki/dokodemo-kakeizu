import { calculateChildNodePosition } from "../calculateChildNodePosition";
import { NodeData, PersonData } from "@/types/NodeData";
import { BASE_GENERATIONS_SPACING, BASE_MARITAL_SPACING } from "../../common/constants";
import { Node } from "reactflow";

describe("calculateChildNodePosition", () => {
  const createPersonNode = (id: string, maritalPosition: "right" | "left" | undefined, descendantsWidth = 0, children = [], spouse = [], siblings = []): Node<PersonData> => ({
    id,
    type: "person",
    data: {
      createdAt: new Date().getTime(),
      maritalPosition,
      descendantsWidth,
      children,
      spouse,
      siblings,
      selected: false,
      parents: [],
      descendants: 0,
      ancestors: 0,
    },
    position: { x: 0, y: 0 },
  });

  const createMaritalNode = (id: string): Node<NodeData> => ({
    id: id,
    type: "marital",
    position: { x: 0, y: 0 },
    data: {
      isDivorced: false,
    }
  });

  it("should calculate position for a single person node", () => {
    const node = createPersonNode("1", "left");
    calculateChildNodePosition([node], node, 0, 0);
    expect(node.position).toEqual({ x: BASE_MARITAL_SPACING, y: 0 });
  });

  it("should calculate position for a person node with children", () => {
    const childNode = createPersonNode("2", "left");
    const node = createPersonNode("1", "left", 0, ["2"]);
    calculateChildNodePosition([node, childNode], node, 0, 0);
    expect(node.position).toEqual({ x: BASE_MARITAL_SPACING, y: 0 });
    expect(childNode.position).toEqual({ x: BASE_MARITAL_SPACING, y: BASE_GENERATIONS_SPACING });
  });

  it("should calculate position for a person node with spouse", () => {
    const spouseNode = createPersonNode("2", "right");
    const node = createPersonNode("1", "left", 0, [], ["2"]);
    calculateChildNodePosition([node, spouseNode], node, 0, 0);
    expect(node.position).toEqual({ x: BASE_MARITAL_SPACING, y: 0 });
    expect(spouseNode.position).toEqual({ x: BASE_MARITAL_SPACING * 3, y: 0 });
  });

  it("should calculate position for a person node with marital node", () => {
    const maritalNode = createMaritalNode("2");
    const node = createPersonNode("1", "left", 0, [], [], [], "2");
    calculateChildNodePosition([node, maritalNode], node, 0, 0);
    expect(node.position).toEqual({ x: BASE_MARITAL_SPACING, y: 0 });
    expect(maritalNode.position.y).toBeGreaterThan(0);
  });

  it("should calculate position for a person node with siblings", () => {
    const siblingNode = createPersonNode("2", "right");
    const node = createPersonNode("1", "left", 0, [], [], ["2"]);
    calculateChildNodePosition([node, siblingNode], node, 0, 0);
    expect(node.position).toEqual({ x: BASE_MARITAL_SPACING, y: 0 });
    expect(siblingNode.position).toEqual({ x: 0, y: 0 });
  });
});