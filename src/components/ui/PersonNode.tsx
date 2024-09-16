import { Handle, NodeProps, Position } from 'reactflow';
import { BASE_PERSON_NODE_WIDTH } from '../../utils/constants';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { selectedNodeState } from '../../recoil/selectedNodeState';
import { BiSolidUser } from 'react-icons/bi';
import styled, { css, keyframes } from 'styled-components';
import { formatBirthDay } from '../../helpers/formatBirthDay';
import { formatFullName } from '../../helpers/formatFullName';
import { memo, useEffect, useState } from 'react';
import { PersonNodeType } from '@/types/PersonNodeType';
import { Text } from '@chakra-ui/react';
import { getS3ImageUrl } from '@/utils/getS3ImageUrl';

interface StyledBoxProps {
  isSelected: boolean;
  gender?: string;
}
const variants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 16,
  },
};

const StyledHandle = styled(Handle)`
  opacity: 0;
  border: none;
  pointer-events: none;
  background: #ccc;
`;

const selectedAnimation = keyframes`
0% {
transform: translate(-50%, -50%) scale(1, 1);
opacity: 1;
}
100% {
transform: translate(-50%, -50%) scale(1.8, 1.8);
opacity: 0;
}
`;

const selectedStyle = css`
  &::before {
    content: '';
    animation: ${selectedAnimation} 1.5s linear infinite;
  }
`;

const StyledBox = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isSelected', 'gender'].includes(prop),
})<StyledBoxProps>`
  position: relative;
  width: ${BASE_PERSON_NODE_WIDTH}px;
  ${({ isSelected }) => isSelected && selectedStyle};
  border-radius: 50%;
  aspect-ratio: 1;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  &::before {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transition: opacity linear 0.4s;
    z-index: -1;
    border: 1px solid #90cdf4;
  }
`;

const IconBox = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isSelected'].includes(prop),
})<StyledBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  background-color: ${({ isSelected }) => (isSelected ? '#3182ce' : '#ccc')};
  border-width: 2px;
  border-style: solid;
  border-color: ${({ gender }) => (gender === 'male' ? '#3182ce' : gender === 'female' ? '#E53E3E' : '#ccc')};
  transform: scale(1.1);
`;

const IconInner = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
`;

const DefaultProfileIcon = styled.div`
  margin-top: 14px;
`;

const CustomProfileIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InformationBox = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  text-align: center;
`;

export const PersonNode = memo((props: NodeProps<PersonNodeType['data']>) => {
  const { id, data } = props;
  const { birthDay, givenName, familyName, profilePictureURL } = data;
  const selectedNode = useRecoilValue(selectedNodeState);
  const isSelected = id === selectedNode?.id;
  const fullName = formatFullName({ familyName, givenName });
  const formattedBirthDay = birthDay
    ? new Date(birthDay).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
    : '';
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (profilePictureURL) {
      getS3ImageUrl(profilePictureURL).then((sourceUrl) => {
        console.log('existingSourceUrl', sourceUrl);
        setImageUrl(sourceUrl);
      });
    } else {
      console.log('no profilePictureURL');
    }
  }, [profilePictureURL]);

  return (
    <>
      <StyledHandle type="source" position={Position.Right} id="personSourceRight" />
      <StyledHandle type="source" position={Position.Left} id="personSourceLeft" />
      <StyledHandle type="source" position={Position.Top} id="personSourceTop" />
      <AnimatePresence>
        {data.isVisible && (
          <motion.div
            key={data.label}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onAnimationComplete={(definition) => {
              if (definition === 'exit') {
              }
            }}
          >
            <StyledBox isSelected={isSelected}>
              <IconBox isSelected={isSelected} gender={data.gender}>
                <IconInner>
                  {imageUrl ? (
                    <CustomProfileIcon src={imageUrl} />
                  ) : (
                    <DefaultProfileIcon>
                      <BiSolidUser size={100} color="#ffffff" />
                    </DefaultProfileIcon>
                  )}
                </IconInner>
              </IconBox>

              <InformationBox>
                <Text>{id}</Text>
                <Text>{fullName}</Text>
                <Text>{formattedBirthDay}</Text>
              </InformationBox>
            </StyledBox>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

PersonNode.displayName = 'PersonNode';
