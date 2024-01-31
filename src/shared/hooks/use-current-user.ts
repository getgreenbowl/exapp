import { useEffect, useState } from 'react';
import { Storage } from '../utils/storage';
import { TUser } from 'greenbowl-schema';

export const useCurrentUser = () => {
  const [user, setuser] = useState<TUser | null>(null);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    const user = await Storage.currentUser();
    setuser(user);
  };

  return user;
};
