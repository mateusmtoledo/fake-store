import { capitalizeString } from '../stringUtils';

describe('capitalizeString', () => {
  it('capitalizes only the first letter', () => {
    expect(capitalizeString('sOme RanDOm stRING')).toBe('Some random string');
  });
});
