interface NameData {
  familyName?: string;
  givenName?: string;
}

export function formatFullName(data: NameData): string {
  const { familyName, givenName } = data;
  if (!familyName && !givenName) return '';
  if (!familyName) return `${givenName}`;
  if (!givenName) return `${familyName}`;
  return `${familyName} ${givenName}`;
}
