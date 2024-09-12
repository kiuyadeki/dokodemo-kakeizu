import { FormLabel, HStack, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { FC, memo, useEffect, useState } from 'react';
import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form';

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
  control: Control<FieldValues>;
  defaultGender: string;
}

export const ProfileGenderInput: FC<GenderInputProps> = memo(({ control, genderValue, defaultGender }) => {
  const [selectedGender, setSelectedGender] = useState(defaultGender);

  useEffect(() => {
    setSelectedGender(defaultGender);
  }, [defaultGender]);

  return (
    <>
      <FormLabel mt={6}>性別</FormLabel>
      <HStack>
        <Controller
        name={genderValue}
        control={control}
        defaultValue={defaultGender}
        render={({ field }) => (
        <RadioGroup {...field}>
          <Stack direction="row" spacing={6}>
            {genders.map((gender) => (
              <Radio key={gender.value} value={gender.value}>
                {gender.label}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
        )}
        />
      </HStack>
    </>
  );
});

ProfileGenderInput.displayName = 'ProfileGenderInput';
