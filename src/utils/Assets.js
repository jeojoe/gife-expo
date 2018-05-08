import authBg1 from '../assets/images/auth-bg-1.png';
import authBg2 from '../assets/images/auth-bg-2.png';
import authBg3 from '../assets/images/auth-bg-3.png';

export function randomBg() {
  const ran = Math.random();
  if (ran < 0.33) {
    return authBg1;
  } else if (ran < 0.66) {
    return authBg2;
  }
  return authBg3;
}

export const temp = '';
