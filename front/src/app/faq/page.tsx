'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  category: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

const faqData: FAQItem[] = [
  {
    category: 'BIEN PRÉPARER MON THÉ',
    questions: [
      {
        question: 'Comment bien préparer mon thé signature ?',
        answer:
          "Pour une préparation optimale de votre thé signature, suivez ces étapes : \n1. Faites chauffer l'eau à 95°C\n2. Utilisez 2g de thé (environ une cuillère à café) pour 200ml d'eau\n3. Laissez infuser 3-4 minutes\n4. Retirez le filtre et dégustez\nPour un résultat optimal, évitez l'eau bouillante qui pourrait brûler les feuilles et altérer le goût.",
      },
      {
        question:
          'Combien de tasses de thés puis-je préparer avec une boîte de 100gr de thé en vrac ?',
        answer:
          "Avec une boîte de 100g de thé en vrac, vous pouvez préparer environ 50 tasses de thé. Nous recommandons d'utiliser 2g de thé par tasse de 200ml pour une saveur optimale. Cette quantité peut varier selon vos préférences personnelles en matière de force du thé.",
      },
      {
        question: "Quel est le temps d'infusion de vos thés et infusions ?",
        answer:
          "Les temps d'infusion varient selon le type de thé :\n- Thé vert : 2-3 minutes à 75-80°C\n- Thé noir : 3-4 minutes à 90-95°C\n- Thé signature : 3-4 minutes à 95°C\n- Infusions : 4-5 minutes à 100°C\nPour préserver les arômes, veillez à respecter ces temps et températures.",
      },
    ],
  },
  {
    category: 'COMMANDE ET LIVRAISON',
    questions: [
      {
        question: 'Quels sont les délais de livraison ?',
        answer:
          "Nous expédions vos commandes sous 24h-48h ouvrées. La livraison est effectuée en 2-3 jours ouvrés en France métropolitaine. Un email de suivi vous sera envoyé dès l'expédition de votre colis.",
      },
      {
        question: 'Quels sont les modes de paiement acceptés ?',
        answer:
          'Nous acceptons les paiements par carte bancaire (Visa, Mastercard), PayPal, et Apple Pay. Tous les paiements sont sécurisés et vos informations bancaires sont cryptées.',
      },
    ],
  },
  {
    category: 'JEU CONCOURS',
    questions: [
      {
        question: 'Comment participer à notre jeu concours Thé Tip Top ?',
        answer:
          "Pour participer, il vous suffit d'effectuer un achat d'un montant minimum de 49€ dans l'une de nos boutiques. Votre ticket de caisse comportera un code unique vous permettant de participer au tirage au sort.",
      },
      {
        question: 'Quand aura lieu le tirage au sort ?',
        answer:
          'Le tirage au sort final aura lieu à la fin de la période du jeu concours, soit le 30 Avril 2025. Les gagnants seront contactés directement par email dans les 7 jours suivant le tirage.',
      },
    ],
  },
];

const FAQSection = ({ category, questions }: FAQItem) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 ">
        {category}
      </h2>
      <div className="space-y-4">
        {questions.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              {openIndex === index ? (
                <FiChevronUp className="w-5 h-5 text-[#16803C]" />
              ) : (
                <FiChevronDown className="w-5 h-5 text-[#16803C]" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-600 whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#16803C] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Questions fréquentes <br />
            sur le thé
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Retrouvez toutes les réponses à vos questions
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {faqData.map((section, index) => (
          <FAQSection key={index} {...section} />
        ))}
      </div>
    </div>
  );
}
