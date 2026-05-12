'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    // PASSWORD_RECOVERY fires after Supabase parses the URL hash
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true);
        setChecking(false);
      }
    });

    // Also handle the case where Supabase already established a session
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
      setChecking(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const validate = (password: string) => {
    if (password.length < 8) return 'At least 8 characters';
    if (!/[A-Z]/.test(password)) return 'One uppercase letter required';
    if (!/[a-z]/.test(password)) return 'One lowercase letter required';
    if (!/[0-9]/.test(password)) return 'One number required';
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const v = validate(pw);
    if (v) return setError(v);
    if (pw !== confirm) return setError('Passwords do not match.');

    setStatus('saving');
    const { error: updErr } = await supabase.auth.updateUser({ password: pw });
    if (updErr) {
      setStatus('idle');
      setError(updErr.message);
      return;
    }
    setStatus('done');
    // Sign out the recovery session so the user must log in fresh in the app.
    await supabase.auth.signOut();
  };

  if (checking) {
    return (
      <main className="reset-wrap">
        <p>Verifying your reset link…</p>
      </main>
    );
  }

  if (!ready) {
    return (
      <main className="reset-wrap">
        <h1 className="reset-h1">Invalid or expired link</h1>
        <p>
          This password reset link is invalid or has expired. Please open the
          Pawgress app and request a new one.
        </p>
        <style jsx>{baseStyles}</style>
      </main>
    );
  }

  if (status === 'done') {
    return (
      <main className="reset-wrap">
        <h1 className="reset-h1">Password updated</h1>
        <p>You can now open the Pawgress app and log in with your new password.</p>
        <style jsx>{baseStyles}</style>
      </main>
    );
  }

  return (
    <main className="reset-wrap">
      <h1 className="reset-h1">Reset your password</h1>
      <form onSubmit={submit} className="reset-form">
        <label className="reset-label">
          New password
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="reset-input"
            autoComplete="new-password"
            required
          />
        </label>
        <label className="reset-label">
          Confirm password
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="reset-input"
            autoComplete="new-password"
            required
          />
        </label>
        {error && <p className="reset-error">{error}</p>}
        <button
          type="submit"
          disabled={status === 'saving'}
          className="reset-button"
        >
          {status === 'saving' ? 'Saving…' : 'Update password'}
        </button>
        <p className="reset-hint">
          Must be at least 8 characters with an uppercase letter, lowercase
          letter, and number.
        </p>
      </form>
      <style jsx>{baseStyles}</style>
    </main>
  );
}

const baseStyles = `
  .reset-wrap {
    max-width: 420px;
    margin: 64px auto;
    padding: 24px;
    font-family: var(--font-inter), system-ui, sans-serif;
    color: #171717;
  }
  .reset-h1 {
    font-family: var(--font-baloo), system-ui, sans-serif;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  .reset-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .reset-label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
  }
  .reset-input {
    padding: 10px 12px;
    border: 1px solid #d4d4d8;
    border-radius: 10px;
    font-size: 16px;
    outline: none;
  }
  .reset-input:focus {
    border-color: #ff6b9d;
    box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.2);
  }
  .reset-button {
    padding: 12px 16px;
    border-radius: 12px;
    border: none;
    background: #ff6b9d;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }
  .reset-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .reset-error {
    color: #c0392b;
    font-size: 14px;
    margin: 0;
  }
  .reset-hint {
    color: #666;
    font-size: 12px;
    margin-top: 4px;
  }
`;
