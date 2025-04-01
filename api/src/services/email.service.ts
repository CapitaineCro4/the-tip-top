import nodemailer from 'nodemailer';

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  static async sendResetPasswordEmail(
    email: string,
    token: string
  ): Promise<void> {
    const resetUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              overflow: hidden;
            }
            .header {
              background-color: #1A2E44; /* Bleu foncé du site */
              color: white;
              padding: 20px;
              text-align: center;
            }
            .header img {
              max-width: 150px;
              height: auto;
            }
            .content {
              padding: 30px;
              color: #333;
              line-height: 1.6;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #2E4A3D; /* Vert foncé du site */
              color: white !important;
              text-decoration: none;
              border-radius: 4px;
              margin: 15px 0;
              text-align: center;
            }
            .footer {
              background-color: #1A2E44; /* Bleu foncé du site */
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #ffffff;
            }
            .footer a {
              color: #ffffff;
              text-decoration: none;
              margin: 0 10px;
            }
            .footer .social-icons img {
              width: 24px;
              height: 24px;
              margin: 0 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <!-- Remplacez l'URL ci-dessous par l'URL de votre logo -->
              <img src="https://dsp5-archi-f24a-15m-g4.fr/_next/static/media/logo_BW.e5d6c269.svg" alt="Thé Tip Top Logo">
            </div>
            <div class="content">
              <p>Bonjour,</p>
              <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour procéder :</p>
              <a href="${resetUrl}" class="button">Réinitialiser mon mot de passe</a>
              <p>Ce lien expirera dans 1 heure pour des raisons de sécurité.</p>
              <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez simplement ignorer cet email.</p>
            </div>
            <div class="footer">
              <p>
                <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/mentions-legales">Mentions légales</a> |
                <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/conditions-generales">Conditions générales d'utilisation</a> |
                <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/politique-confidentialite">Politique de confidentialité</a>
              </p>
              <div class="social-icons">
                <!-- Remplacez les URLs des icônes par celles de vos propres icônes ou utilisez des liens directs -->
                <a href="https://facebook.com"><img src="URL_ICON_FACEBOOK" alt="Facebook"></a>
                <a href="https://instagram.com"><img src="URL_ICON_INSTAGRAM" alt="Instagram"></a>
              </div>
              <p>© ${new Date().getFullYear()} Thé Tip Top. Tous droits réservés.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
  }
}
