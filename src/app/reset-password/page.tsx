'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle');
  const [error, setError] = useState('');

  // TEMP: ?preview=1 shows the form UI without a real recovery link. Remove before launch.
  const isPreview =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('preview') === '1';

  useEffect(() => {
    if (isPreview) {
      setReady(true);
      setChecking(false);
      return;
    }

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
  }, [isPreview]);

  // Live password requirement checks
  const reqs = [
    { label: 'At least 8 characters', ok: pw.length >= 8 },
    { label: 'One uppercase letter', ok: /[A-Z]/.test(pw) },
    { label: 'One lowercase letter', ok: /[a-z]/.test(pw) },
    { label: 'One number', ok: /[0-9]/.test(pw) },
  ];
  const allReqsMet = reqs.every((r) => r.ok);
  const passwordsMatch = pw.length > 0 && pw === confirm;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!allReqsMet) return setError('Please meet all password requirements.');
    if (pw !== confirm) return setError('Passwords do not match.');

    setStatus('saving');

    // TEMP: in preview mode, simulate a successful update without calling Supabase.
    if (isPreview) {
      setTimeout(() => setStatus('done'), 700);
      return;
    }

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

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-400/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/pawgress-logo.png"
            alt="Pawgress"
            width={64}
            height={64}
            className="rounded-2xl shadow-lg"
            priority
          />
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-600/10 border border-white/60 p-8 sm:p-10">
          {checking ? (
            <div className="flex flex-col items-center py-8">
              <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
              <p className="mt-4 text-gray-600 text-sm">Verifying your reset link…</p>
            </div>
          ) : !ready ? (
            <div className="text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 4h.01M4.93 19.07A10 10 0 1119.07 4.93 10 10 0 014.93 19.07z" />
                </svg>
              </div>
              <h1 className="font-baloo text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Invalid or expired link
              </h1>
              <p className="text-gray-600 leading-relaxed">
                This password reset link is invalid or has expired. Please open the
                Pawgress app and request a new one.
              </p>
            </div>
          ) : status === 'done' ? (
            <div className="text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-baloo text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Password updated
              </h1>
              <p className="text-gray-600 leading-relaxed">
                You can now open the Pawgress app and log in with your new password.
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-baloo text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Reset your password
              </h1>
              <p className="text-center text-gray-600 mb-7 text-sm">
                Choose a new password for your Pawgress account.
              </p>

              <form onSubmit={submit} className="space-y-4" noValidate>
                {/* New password */}
                <div>
                  <label htmlFor="new-password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    New password
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showPw ? 'text' : 'password'}
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      autoComplete="new-password"
                      required
                      className="w-full px-4 py-3 pr-16 rounded-xl border border-gray-200 bg-white/70 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 transition"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold px-2 py-1 rounded"
                      aria-label={showPw ? 'Hide password' : 'Show password'}
                    >
                      {showPw ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
                </div>

                {/* Confirm */}
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Confirm password
                  </label>
                  <input
                    id="confirm-password"
                    type={showPw ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    required
                    className={`w-full px-4 py-3 rounded-xl border bg-white/70 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 transition ${
                      confirm.length === 0
                        ? 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/15'
                        : passwordsMatch
                        ? 'border-green-400 focus:border-green-500 focus:ring-green-500/15'
                        : 'border-red-300 focus:border-red-500 focus:ring-red-500/15'
                    }`}
                    placeholder="••••••••"
                  />
                </div>

                {/* Requirements checklist */}
                <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs pt-1">
                  {reqs.map((r) => (
                    <li
                      key={r.label}
                      className={`flex items-center gap-1.5 transition-colors ${
                        r.ok ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      <span
                        className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${
                          r.ok ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {r.ok ? '✓' : '•'}
                      </span>
                      {r.label}
                    </li>
                  ))}
                </ul>

                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'saving' || !allReqsMet || !passwordsMatch}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 rounded-full font-semibold text-base shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-xl"
                >
                  {status === 'saving' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Saving…
                    </>
                  ) : (
                    'Update password'
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Pawgress · Connecting ethical breeders & trusted shelters
        </p>
      </div>
    </main>
  );
}
