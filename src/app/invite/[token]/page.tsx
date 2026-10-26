import type { Metadata } from 'next';
import OpeningPage from '@/components/link-pages/OpeningPage';
import { getInvitePreview, inviteCard } from '@/lib/linkPreviews';

export const revalidate = 60;

type PageProps = { params: Promise<{ token: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params;
  // Only an open reservation link shows its puppy; get_invite_preview returns null otherwise.
  return inviteCard(await getInvitePreview(token), `/invite/${encodeURIComponent(token)}`);
}

export default async function InviteLinkPage({ params }: PageProps) {
  const { token } = await params;
  return <OpeningPage kind="invite" id={token} />;
}
