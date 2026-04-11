'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '../../src/components/Button';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      router.replace('/login');
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      bgColor="bg-[#f5f19c]"
      text={isLoggingOut ? 'Signing out' : 'Sign out'}
      onClick={handleLogout}
      disabled={isLoggingOut}
    />
  );
}