import { vi } from 'vitest';
import type { DeepPartial } from 'utility-types';
import type { UserCredential } from 'firebase/auth';

export class GoogleAuthProvider
  implements
    Pick<
      InstanceType<typeof import('firebase/auth').GoogleAuthProvider>,
      'providerId'
    >
{
  providerId = 'google.com';
}

export const signInWithPopup = vi
  .fn<typeof import('firebase/auth').signInWithPopup>()
  .mockResolvedValue({
    user: {
      uid: 'test-uid',
      displayName: 'Test User',
    },
  } satisfies DeepPartial<UserCredential> as UserCredential);

export const signOut = vi
  .fn<typeof import('firebase/auth').signOut>()
  .mockResolvedValue();
