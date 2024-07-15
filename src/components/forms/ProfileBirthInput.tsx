import { FormControl, FormLabel, HStack, Select } from '@chakra-ui/react';
import { FC } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface BirthInputProps {
  yearValue: string,
  monthValue: string,
  dateValue: string, 
  register: UseFormRegister<FieldValues>;
}

export const ProfileBirthInput: FC<BirthInputProps> = ({ register, yearValue, monthValue, dateValue }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <>
      <FormLabel mt={6}>生年月日</FormLabel>
      <HStack>
        <FormControl>
          <Select placeholder='年' {...register(yearValue)}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select placeholder='月' {...register(monthValue)}>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select placeholder="日" {...register(dateValue)}>
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </Select>
        </FormControl>
      </HStack>
    </>
  );
};
