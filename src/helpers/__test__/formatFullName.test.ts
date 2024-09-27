import { formatFullName } from '../formatFullName';

describe('formatFullName', () => {
  it('should return an empty string if both familyName and givenName are missing', () => {
    expect(formatFullName({})).toBe('');
  });

  it('should return givenName if familyName is missing', () => {
    expect(formatFullName({ givenName: 'John' })).toBe('John');
  });

  it('should return familyName if givenName is missing', () => {
    expect(formatFullName({ familyName: 'Doe' })).toBe('Doe');
  });

  it('should return "familyName givenName" if both are provided', () => {
    expect(formatFullName({ familyName: 'Doe', givenName: 'John' })).toBe('Doe John');
  });

  it('should handle names with special characters', () => {
    expect(formatFullName({ familyName: 'Döe', givenName: 'Jöhn' })).toBe('Döe Jöhn');
  });

  it('should handle names with spaces', () => {
    expect(formatFullName({ familyName: 'Van Dyke', givenName: 'Dick' })).toBe('Van Dyke Dick');
  });
});