import { FormLabel, HStack, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Gender {
  label: string;
  value: string;
}
const genders: Gender[] = [
  {
    label: '男性',
    value: 'male',
  },
  {
    label: '女性',
    value: 'female',
  },
  {
    label: 'その他',
    value: 'others',
  },
];

interface GenderInputProps {
  genderValue: string;
  register: UseFormRegister<FieldValues>;
}

export const ProfileGenderInput: FC<GenderInputProps> = memo(({ register, genderValue }) => {
  return (
    <>
      <FormLabel mt={6}>性別</FormLabel>
      <HStack>
        <RadioGroup>
          <Stack direction="row" spacing={6}>
            {genders.map((gender) => (
              <Radio key={gender.value} value={gender.value} {...register(genderValue)}>
                {gender.label}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </HStack>
    </>
  );
});

ProfileGenderInput.displayName = 'ProfileGenderInput';
