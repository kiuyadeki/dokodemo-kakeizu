import { initialNode } from '@/recoil/WholeNodesState';
import { createNewFamilyTree } from '@/services/createNewFamilyTree';
import { Box, Button, Flex, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactFlowJsonObject } from 'reactflow';

const initialFamilyTree: ReactFlowJsonObject = {
  nodes: [initialNode],
  edges: [],
  viewport: { x: 1, y: 1, zoom: 1 },
};

type formInputs = {
  projectName: string;
};

export const CreateNewProject: FC = memo(function CreateNewProjectComponent() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<formInputs>();

  const projectName = watch('projectName');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const res = await createNewFamilyTree(initialFamilyTree, data.projectName);
      if (res) {
        console.log('create family tree', res.id);
        await router.push(`/app/${res.id}`);
      }
    } finally {
      setIsLoading(false);
    }
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
          <Button
            paddingInline="40px"
            type="submit"
            colorScheme="blue"
            isLoading={isLoading}
            isDisabled={!projectName}
            loadingText="作成しています"
          >
            作成する
          </Button>
        </Flex>
      </form>
    </Box>
  );
});
