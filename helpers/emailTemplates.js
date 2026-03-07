export const getVerificationEmailHTML = (verificationLink) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h2>Email Verification</h2>
          <p>Hello,</p>
          <p>Thank you for registering. Please verify your email address by clicking the link below:</p>
          <p>
            <a href="${verificationLink}" style="color: #0066cc;">Verify your email address</a>
          </p>
          <p>If the link doesn't work, copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; font-size: 14px;">${verificationLink}</p>
          <p style="margin-top: 30px; color: #666; font-size: 13px;">If you didn't create an account, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #999; font-size: 12px;">This is an automated message, please do not reply.</p>
        </div>
      </body>
    </html>
  `;
};
