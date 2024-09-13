import { FormControl, FormLabel, HStack, Select, Input } from '@chakra-ui/react';
import { FC, memo, useState } from 'react';
import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ja from 'date-fns/locale/ja';
import { ProfileEditorInputs } from '@/types/profileEditorInputs';

interface BirthInputProps {
  birthValue: string;
  register: UseFormRegister<FieldValues>;
  control: Control<ProfileEditorInputs>;
}

export const ProfileBirthInput: FC<BirthInputProps> = memo(({ register, birthValue, control }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  registerLocale('ja', ja as any);

  return (
    <>
      <FormLabel mt={6}>生年月日</FormLabel>
      <HStack>
        <Controller
          control={control}
          name="birthDay"
          render={({ field }) => (
            <DatePicker
              locale="ja"
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={'yyyy/MM/dd'}
              calendarStartDay={1}
              customInput={<Input />}
            />
          )}
        />
      </HStack>
    </>
  );
});

ProfileBirthInput.displayName = 'ProfileBirthInput';
