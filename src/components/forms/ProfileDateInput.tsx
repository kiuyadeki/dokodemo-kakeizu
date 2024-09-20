import { FormControl, FormLabel, HStack, Select, Input, VStack } from '@chakra-ui/react';
import { FC, memo, useState } from 'react';
import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ja from 'date-fns/locale/ja';

interface DateInputProps {
  label: string;
  dateValue: string;
  register: UseFormRegister<FieldValues>;
  control: Control;
}

export const ProfileDateInput: FC<DateInputProps> = memo(({ label, register, dateValue, control }) => {
  registerLocale('ja', ja as any);

  return (
    <>
      <FormControl>
      <FormLabel mt={6}>{label}</FormLabel>
        <Controller
          control={control}
          name={dateValue}
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
      </FormControl>
    </>
  );
});

ProfileDateInput.displayName = 'ProfileDateInput';
