import { createNewFamilyTree } from '@/services/createNewFamilyTree';
import { Box, Button, Flex, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { FC, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactFlowJsonObject } from 'reactflow';

const initialFamilyTree: ReactFlowJsonObject = {
  nodes: [],
  edges: [],
  viewport: { x: 1, y: 1, zoom: 1 },
};
// const demoNodes = [
//   {
//       "id": "0",
//       "type": "person",
//       "data": {
//           "label": "Node",
//           "birthYear": null,
//           "birthMonth": null,
//           "birthDate": null,
//           "profilePicture": null,
//           "profilePictureURL": null,
//           "parents": [],
//           "children": [
//               "3"
//           ],
//           "spouse": [
//               "2"
//           ],
//           "siblings": [
//               "0"
//           ],
//           "descendants": 0,
//           "descendantsWidth": 1380,
//           "maritalPosition": "left",
//           "ancestors": 1,
//           "selected": true,
//           "isDivorced": false,
//           "maritalNodeId": "1"
//       },
//       "position": {
//           "x": -110,
//           "y": -500
//       }
//   },
//   {
//       "type": "marital",
//       "id": "1",
//       "data": {
//           "isDivorced": false
//       },
//       "position": {
//           "x": 55,
//           "y": -465
//       }
//   },
//   {
//       "type": "person",
//       "id": "2",
//       "data": {
//           "label": "2",
//           "parents": [],
//           "children": [
//               "3"
//           ],
//           "spouse": [
//               "0"
//           ],
//           "siblings": [
//               "2"
//           ],
//           "descendants": 0,
//           "descendantsWidth": 1380,
//           "ancestors": 1,
//           "maritalPosition": "right",
//           "selected": false,
//           "isDivorced": false,
//           "maritalNodeId": "1"
//       },
//       "position": {
//           "x": 150,
//           "y": -500
//       }
//   },
//   {
//       "type": "person",
//       "id": "3",
//       "data": {
//           "label": "3",
//           "parents": [
//               "0",
//               "2"
//           ],
//           "children": [
//               "6",
//               "7",
//               "8",
//               "9"
//           ],
//           "spouse": [
//               "5",
//               "5",
//               "5",
//               "5"
//           ],
//           "siblings": [
//               "3"
//           ],
//           "descendants": 0,
//           "descendantsWidth": 1380,
//           "ancestors": 2,
//           "maritalPosition": "left",
//           "selected": false,
//           "isDivorced": false,
//           "maritalNodeId": "4"
//       },
//       "position": {
//           "x": 150,
//           "y": -250
//       }
//   },
//   {
//       "type": "marital",
//       "id": "4",
//       "data": {
//           "isDivorced": false
//       },
//       "position": {
//           "x": 315,
//           "y": -215
//       }
//   },
//   {
//       "type": "person",
//       "id": "5",
//       "data": {
//           "label": "5",
//           "parents": [],
//           "children": [
//               "6",
//               "7",
//               "8",
//               "9"
//           ],
//           "spouse": [
//               "3"
//           ],
//           "siblings": [
//               "5"
//           ],
//           "descendants": 0,
//           "descendantsWidth": 1380,
//           "ancestors": 1,
//           "maritalPosition": "right",
//           "selected": false,
//           "isDivorced": false,
//           "maritalNodeId": "4"
//       },
//       "position": {
//           "x": 410,
//           "y": -250
//       }
//   },
//   {
//       "type": "person",
//       "id": "6",
//       "data": {
//           "label": "6",
//           "parents": [
//               "3",
//               "5"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "6",
//               "7",
//               "8",
//               "9"
//           ],
//           "descendants": 0,
//           "descendantsWidth": 280,
//           "ancestors": 3,
//           "maritalPosition": null,
//           "selected": false,
//           "isDivorced": false
//       },
//       "position": {
//           "x": 0,
//           "y": 0
//       }
//   },
//   {
//       "type": "person",
//       "id": "7",
//       "data": {
//           "label": "7",
//           "parents": [
//               "3",
//               "5"
//           ],
//           "children": [
//               "12"
//           ],
//           "spouse": [
//               "11"
//           ],
//           "siblings": [
//               "6",
//               "7",
//               "8",
//               "9"
//           ],
//           "descendants": 0,
//           "descendantsWidth": 540,
//           "ancestors": 3,
//           "maritalPosition": "left",
//           "selected": false,
//           "isDivorced": false,
//           "maritalNodeId": "10"
//       },
//       "position": {
//           "x": 280,
//           "y": 0
//       }
//   },
//   {
//       "type": "person",
//       "id": "8",
//       "data": {
//           "label": "8",
//           "parents": [
//               "3",
//               "5"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "6",
//               "7",
//               "8",
//               "9"
//           ],
//           "descendants": 0,
//           "descendantsWidth": 280,
//           "ancestors": 3,
//           "maritalPosition": null,
//           "selected": false,
//           "isDivorced": false
//       },
//       "position": {
//           "x": 820,
//           "y": 0
//       }
//   },
//   {
//       "type": "person",
//       "id": "9",
//       "data": {
//           "label": "9",
//           "parents": [
//               "3",
//               "5"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "6",
//               "7",
//               "8",
//               "9"
//           ],
//           "descendants": 0,
//           "descendantsWidth": 280,
//           "ancestors": 3,
//           "maritalPosition": null,
//           "selected": false,
//           "isDivorced": false
//       },
//       "position": {
//           "x": 1100,
//           "y": 0
//       }
//   },
//   {
//       "type": "marital",
//       "id": "10",
//       "data": {
//           "isDivorced": false
//       },
//       "position": {
//           "x": 445,
//           "y": 35
//       }
//   },
//   {
//       "type": "person",
//       "id": "11",
//       "data": {
//           "label": "11",
//           "parents": [],
//           "children": [
//               "12"
//           ],
//           "spouse": [
//               "7"
//           ],
//           "siblings": [
//               "11"
//           ],
//           "descendants": 0,
//           "descendantsWidth": 540,
//           "ancestors": 1,
//           "maritalPosition": "right",
//           "selected": false,
//           "isDivorced": false,
//           "maritalNodeId": "10"
//       },
//       "position": {
//           "x": 540,
//           "y": 0
//       }
//   },
//   {
//       "type": "person",
//       "id": "12",
//       "data": {
//           "label": "12",
//           "parents": [
//               "7",
//               "11"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "12"
//           ],
//           "descendants": 0,
//           "descendantsWidth": 280,
//           "ancestors": 4,
//           "maritalPosition": null,
//           "selected": false,
//           "isDivorced": false
//       },
//       "position": {
//           "x": 280,
//           "y": 250
//       }
//   }
// ];

// const demoEdges = [
//   {
//       "type": "smoothstep",
//       "id": "edge-0-1",
//       "source": "0",
//       "sourceHandle": "personSourceRight",
//       "target": "1",
//       "targetHandle": "maritalTargetLeft",
//       "focusable": false,
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "smoothstep",
//       "id": "edge-2-1",
//       "source": "2",
//       "sourceHandle": "personSourceLeft",
//       "target": "1",
//       "targetHandle": "maritalTargetRight",
//       "focusable": false,
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "parentChild",
//       "id": "edge-3-1",
//       "source": "3",
//       "sourceHandle": "personSourceTop",
//       "target": "1",
//       "targetHandle": "maritalTargetBottom",
//       "focusable": false,
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "smoothstep",
//       "id": "edge-3-4",
//       "source": "3",
//       "sourceHandle": "personSourceRight",
//       "target": "4",
//       "targetHandle": "maritalTargetLeft",
//       "focusable": false,
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "smoothstep",
//       "id": "edge-5-4",
//       "source": "5",
//       "sourceHandle": "personSourceLeft",
//       "target": "4",
//       "targetHandle": "maritalTargetRight",
//       "focusable": false,
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "parentChild",
//       "id": "edge-6-4",
//       "source": "6",
//       "sourceHandle": "personSourceTop",
//       "target": "4",
//       "targetHandle": "maritalTargetBottom",
//       "focusable": false,
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "parentChild",
//       "id": "edge-7-4",
//       "source": "7",
//       "sourceHandle": "personSourceTop",
//       "target": "4",
//       "targetHandle": "maritalTargetBottom",
//       "focusable": false,
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "parentChild",
//       "id": "edge-8-4",
//       "source": "8",
//       "sourceHandle": "personSourceTop",
//       "target": "4",
//       "targetHandle": "maritalTargetBottom",
//       "focusable": false,
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "parentChild",
//       "id": "edge-9-4",
//       "source": "9",
//       "sourceHandle": "personSourceTop",
//       "target": "4",
//       "targetHandle": "maritalTargetBottom",
//       "focusable": false,
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "smoothstep",
//       "id": "edge-7-10",
//       "source": "7",
//       "sourceHandle": "personSourceRight",
//       "target": "10",
//       "targetHandle": "maritalTargetLeft",
//       "focusable": false,
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "smoothstep",
//       "id": "edge-11-10",
//       "source": "11",
//       "sourceHandle": "personSourceLeft",
//       "target": "10",
//       "targetHandle": "maritalTargetRight",
//       "focusable": false,
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "parentChild",
//       "id": "edge-12-10",
//       "source": "12",
//       "sourceHandle": "personSourceTop",
//       "target": "10",
//       "targetHandle": "maritalTargetBottom",
//       "focusable": false,
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "parentChild",
//       "id": "edge-13-10",
//       "source": "13",
//       "sourceHandle": "personSourceTop",
//       "target": "10",
//       "targetHandle": "maritalTargetBottom",
//       "focusable": false,
//       "style": {
//           "stroke": "#FF0072"
//       }
//   }
// ]
// const initialFamilyTree: ReactFlowJsonObject = {nodes: demoNodes, edges: demoEdges, viewport: {x: 1, y: 1, zoom: 1}};

type formInputs = {
  projectName: string;
};

export const CreateNewProject: FC = memo(function CreateNewProjectComponent() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  const onSubmit = handleSubmit((data) => {
    createNewFamilyTree(initialFamilyTree, data.projectName);
    console.log(data.projectName);
  });

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <FormControl mb={6} isInvalid={!!errors.projectName}>
          <Input
            size="md"
            placeholder="〇〇家"
            {...register('projectName', {
              required: '家系図名を入力してください',
              maxLength: { value: 20, message: '20文字以内で入力してください' },
            })}
          />
          {errors.projectName && <FormErrorMessage>{errors.projectName.message}</FormErrorMessage>}
        </FormControl>
        <Flex justify="flex-start">
          <Button paddingInline="40px" type="submit" colorScheme="blue" isLoading={isSubmitting}>
            作成
          </Button>
        </Flex>
      </form>
    </Box>
  );
});
