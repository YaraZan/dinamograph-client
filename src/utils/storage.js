import { EncryptStorage } from 'encrypt-storage';
export const encryptStorage = new EncryptStorage(import.meta.env.SECRET_STORAGE, {
    prefix: '@storage',
});