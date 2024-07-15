import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface TextInputProps {
  textValue: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errorMessage?: string;
}

export const ProfileTextInput: FC<TextInputProps> = ({textValue, label, register, errorMessage}) => {
  return (
    <FormControl>
      <FormLabel htmlFor={textValue}>{label}</FormLabel>
      <Input type='text' id={textValue} placeholder={label} {...register(textValue)} />
      {errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
};
