
const COMMON_PASSWORDS = [
  '123456',
  '123456789',
  'qwerty',
  'password',
  'abc123',
  '000000',
  '111111',
  '12345678',
  'aaaaaa',
  'bbbbbb',
  'azerty',
  'motdepasse',
  'admin',
  'root',
  '1234567890',
];

// Interface pour le résultat de validation
interface ValidationResult {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  errors: string[];
  suggestions: string[];
}

export const validatePassword = (password: string): ValidationResult => {
  const result: ValidationResult = {
    isValid: false,
    strength: 'weak',
    errors: [],
    suggestions: [],
  };

  // Vérification basique
  if (!password) {
    result.errors.push('Le mot de passe est requis');
    return result;
  }

  // Vérification des mots de passe courants
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    result.errors.push(
      'Ce mot de passe est trop commun et facilement devinable'
    );
    result.suggestions.push(
      'Évitez les mots de passe courants comme "123456" ou "password"'
    );
    return result;
  }

  // Système de points pour évaluer la force du mot de passe
  let score = 0;

  // Longueur (0-4 points)
  if (password.length >= 8) score += 2;
  if (password.length >= 12) score += 2;

  // Complexité (0-6 points)
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 2;
  if (/[^A-Za-z0-9]/.test(password)) score += 2;

  // Variété des caractères (0-2 points)
  const uniqueChars = new Set(password).size;
  if (uniqueChars > password.length * 0.7) score += 2;

  // Suggestions constructives
  if (!/[A-Z]/.test(password)) {
    result.suggestions.push(
      'Ajoutez une majuscule pour renforcer votre mot de passe'
    );
  }
  if (!/\d/.test(password)) {
    result.suggestions.push('Ajoutez un chiffre pour plus de sécurité');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    result.suggestions.push(
      'Un caractère spécial rendrait votre mot de passe plus fort'
    );
  }
  if (password.length < 12) {
    result.suggestions.push('Un mot de passe plus long serait plus sécurisé');
  }

  // Détermination de la force
  if (score >= 10) {
    result.strength = 'strong';
    result.isValid = true;
  } else if (score >= 6) {
    result.strength = 'medium';
    result.isValid = true;
  } else {
    result.strength = 'weak';
    result.isValid = false;
    result.errors.push("Ce mot de passe n'est pas assez sécurisé");
  }

  return result;
};

// Validation email améliorée
export const validateEmail = (email: string): ValidationResult => {
  const result: ValidationResult = {
    isValid: false,
    strength: 'weak',
    errors: [],
    suggestions: [],
  };

  if (!email) {
    result.errors.push("L'email est requis");
    return result;
  }

  // Validation basique
  const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicEmailRegex.test(email)) {
    result.errors.push("Format d'email invalide");
    result.suggestions.push('Exemple: nom@domaine.com');
    return result;
  }

  // Validation plus poussée
  const [localPart, domain] = email.split('@');

  if (localPart.length > 64) {
    result.errors.push("La partie locale de l'email est trop longue");
    return result;
  }

  if (domain.length > 255) {
    result.errors.push('Le domaine est trop long');
    return result;
  }

  // Vérification des caractères spéciaux courants
  if (/[<>()[\]\\,;:\s]/.test(email)) {
    result.errors.push("L'email contient des caractères non autorisés");
    return result;
  }

  result.isValid = true;
  result.strength = 'strong';
  return result;
};
