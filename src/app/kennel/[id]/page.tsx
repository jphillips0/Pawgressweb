import type { Metadata } from 'next';
import OpeningPage from '@/components/link-pages/OpeningPage';
import { getKennelPreview, kennelCard } from '@/lib/linkPreviews';

export const revalidate = 60;

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return kennelCard(await getKennelPreview(id), `/kennel/${encodeURIComponent(id)}`);
}

export default async function KennelLinkPage({ params }: PageProps) {
  const { id } = await params;
  return <OpeningPage kind="kennel" id={id} />;
}
