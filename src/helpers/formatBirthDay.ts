import { BirthInfo } from '../types/PersonNodeType';

export function formatBirthDay(data: BirthInfo): string {
  const { birthYear, birthMonth, birthDate } = data;
  if (!birthYear) return '';
  if (!birthMonth) return `${birthYear}`;
  if (!birthDate) return `${birthYear}/${birthMonth}`;

  return `${birthYear}/${birthMonth}/${birthDate}`;
}
