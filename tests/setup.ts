import { vi } from 'vitest';

vi.mock('firebase/auth', () => import('../__mocks__/firebase/auth'));
