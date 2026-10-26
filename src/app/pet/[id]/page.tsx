import type { Metadata } from 'next';
import OpeningPage from '@/components/link-pages/OpeningPage';
import { getPetPreview, petCard } from '@/lib/linkPreviews';

export const revalidate = 60;

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return petCard(await getPetPreview(id), `/pet/${encodeURIComponent(id)}`);
}

export default async function PetLinkPage({ params }: PageProps) {
  const { id } = await params;
  return <OpeningPage kind="pet" id={id} />;
}
