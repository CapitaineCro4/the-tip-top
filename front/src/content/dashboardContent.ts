export const dashboardContent = {
  title: 'Tableau de bord',
  ticketSection: {
    title: 'Veuillez rentrer le code de votre ticket',
    subtitle: 'pour tenter votre chance de gagner',
    placeholder: 'XX XX XX XX XX',
    buttonText: 'ENREGISTRER',
    errorMessage: 'Code ticket invalide. Veuillez réessayer.',
    successMessage: 'Ticket enregistré avec succès !',
  },
  navigation: {
    dashboard: 'Tableau de bord',
    ticketHistory: 'Historique des tickets',
    accountDetails: 'Détails du compte',
  },
  accountSection: {
    title: 'Détails du compte',
    fields: {
      civility: {
        label: 'Civilité',
        options: [
          { value: 'mr', label: 'Monsieur' },
          { value: 'mme', label: 'Madame' },
        ],
      },
      firstName: {
        label: 'Prénom',
        placeholder: 'Votre prénom',
      },
      lastName: {
        label: 'Nom',
        placeholder: 'Votre nom',
      },
      email: {
        label: 'Email',
        placeholder: 'votre@email.com',
      },
      city: {
        label: 'Ville',
        placeholder: 'Votre ville',
      },
    },
    buttons: {
      save: 'Enregistrer les modifications',
      changePassword: 'Modifier le mot de passe',
      deleteAccount: 'Clôturer mon compte',
    },
  },
  ticketHistory: {
    title: 'Historique des tickets',
    emptyMessage: 'Aucun ticket enregistré pour le moment',
    table: {
      headers: {
        date: 'Date',
        ticketNumber: 'N° de ticket',
        gain: 'Lot gagné',
        status: 'Statut',
        actions: 'Actions',
      },
      download: 'Télécharger',
    },
  },
};
