import { createNewFamilyTree } from "@/utils/createNewFamilyTree";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { FC, memo } from "react";
import { ReactFlowJsonObject } from "reactflow";

const initialFamilyTree: ReactFlowJsonObject = {nodes: [], edges: [], viewport: {x: 1, y: 1, zoom: 1}};

export const CreateProjectModal:FC = memo(function CreateProjectModalComponent() {
  return (
    <Box p={12}>
      <Input mb={6} size="md" placeholder="〇〇家" />
      <Flex justify="flex-end">
      <Button onClick={createNewFamilyTree}>作成</Button>
      </Flex>
    </Box>
  )
})