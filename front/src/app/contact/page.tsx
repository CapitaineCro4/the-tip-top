'use client';

import { FiMail, FiMapPin, FiClock } from 'react-icons/fi';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#16803C] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Notre équipe est à votre disposition pour répondre à toutes vos
            questions
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Nos informations
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#16803C] p-3 rounded-full">
                  <FiMail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <a
                    href="mailto:contact@thetiptop.com"
                    className="text-[#16803C] hover:underline"
                  >
                    contact@thetiptop.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#16803C] p-3 rounded-full">
                  <FiMapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Adresse</h3>
                  <p className="text-gray-600">
                    123 Avenue des Thés
                    <br />
                    75000 Paris, France
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#16803C] p-3 rounded-full">
                  <FiClock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Heures d&apos;ouverture
                  </h3>
                  <p className="text-gray-600">
                    Lundi - Vendredi: 9h00 - 19h00
                    <br />
                    Samedi: 10h00 - 18h00
                    <br />
                    Dimanche: Fermé
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 p-8 rounded-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              À propos de nous
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Thé Tip Top est votre destination privilégiée pour découvrir les
                meilleurs thés du monde. Notre passion pour le thé nous pousse à
                sélectionner méticuleusement chaque produit pour vous offrir une
                expérience unique.
              </p>
              <p>
                Notre équipe d&apos;experts est là pour vous conseiller et
                répondre à toutes vos questions sur nos produits et services.
              </p>
              <p className="font-medium text-[#16803C]">
                N&apos;hésitez pas à nous contacter par email, nous vous
                répondrons dans les plus brefs délais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
