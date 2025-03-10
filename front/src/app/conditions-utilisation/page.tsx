import { legalContent } from '@/content/legalContent';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Conditions générales d'utilisation</h1>
      <div className="prose prose-lg">
        {legalContent.terms}
      </div>
    </div>
  );
} 