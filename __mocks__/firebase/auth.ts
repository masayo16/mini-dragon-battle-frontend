import { vi } from 'vitest';

export class GoogleAuthProvider
  implements
    Pick<
      InstanceType<typeof import('firebase/auth').GoogleAuthProvider>,
      'providerId'
    >
{
  providerId = 'google.com';
}

export const signInWithPopup =
  vi.fn<typeof import('firebase/auth').signInWithPopup>();
export const signOut = vi.fn<typeof import('firebase/auth').signOut>();
