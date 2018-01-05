import * as h from 'lib/helpers';

describe('Helpers', () => {

  it('makeString', () => {
    const obj = { param1: 12, param2: 8 };
    const str = h.makeString`/home/${'param1'}`;
    const str2 = h.makeString`/home/${'param1'}/${'param2'}`;
    const str3 = h.makeString`/home`;
    expect(str(obj)).toEqual('/home/12');
    expect(str2(obj)).toEqual('/home/12/8');
    expect(str3(obj)).toEqual('/home');
  });

  it('makeString without params', () => {
    const str = h.makeString`/home/${'param1'}/${'param2'}`;
    expect(str()).toEqual('/home/:param1/:param2');
  });

});
