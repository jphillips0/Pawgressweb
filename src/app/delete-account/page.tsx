import { redirect } from 'next/navigation';

// Stable account-deletion URL for the Google Play Data safety form.
// The instructions live in the Privacy Policy so there is one deletion process.
export default function DeleteAccount() {
  redirect('/privacy#delete-account');
}
