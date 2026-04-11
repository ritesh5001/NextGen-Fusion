'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '../../src/components/Button';

const initialFormState = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Unable to sign in.');
      }

      router.replace('/admin');
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">
          Admin email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="admin@nextgenfusion.in"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5f19c] focus:bg-white/10"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-white/70">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your admin password"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#f5f19c] focus:bg-white/10"
        />
      </div>

      {errorMessage ? (
        <p className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </p>
      ) : null}

      <Button
        bgColor="bg-[#f5f19c]"
        text={isSubmitting ? 'Signing in' : 'Sign in'}
        type="submit"
        disabled={isSubmitting}
      />
    </form>
  );
}