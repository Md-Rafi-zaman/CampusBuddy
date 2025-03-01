import { User, UserRole } from "@prisma/client";
import transporter from "./mailer";

export async function emailMembershipRequestApproved(
  user: User,
  organizationName: string,
  roleName: string,
) {
  let emailContent = "";
  let subject = "";

  // Customize the email content and subject based on the role name
  if (roleName === UserRole.Moderator) {
    subject = "Congratulations! You Are Now a Moderator";
    emailContent = `We are pleased to inform you that your request to become a moderator for <strong>${organizationName}</strong> has been approved!`;
  } else if (roleName === UserRole.Member) {
    subject = `Welcome to ${organizationName}`;
    emailContent = `Welcome to ${organizationName}! You are now a member of our community.`;
  } else {
    // For some generic role
    subject = `Your ${roleName} Role`;
    emailContent = `Your role as a ${roleName.toLowerCase()} for ${organizationName} has been approved.`;
  }

  // Create the email message
  const message = {
    from: process.env.MAILER_EMAIL,
    to: user.email,
    subject: `${subject}`,
    html: `
        <p>Hello ${user.firstName},</p>
        <p>${emailContent}</p>
      `,
  };

  // Send the email
  await transporter.sendMail(message);
}

export async function emailMembershipRequestRejected(
  user: User,
  organizationName: string,
  roleName: string,
  rejectionReason?: string,
) {
  let emailContent = "";
  let subject = "";
  const reasonText = rejectionReason
    ? ` Reason given: ${rejectionReason}.`
    : "";

  // Customize the email content and subject based on the role name
  if (roleName === UserRole.Moderator) {
    subject = `Your Moderator Request for ${organizationName} Has Been Rejected`;
    emailContent = `We regret to inform you that your request to become a moderator for <strong>${organizationName}</strong> has been rejected.${reasonText}`;
  } else if (roleName === UserRole.Member) {
    subject = `Membership Request Rejected for ${organizationName}`;
    emailContent = `We regret to inform you that your membership request for ${organizationName} has been rejected.${reasonText}`;
  } else {
    // For some generic role
    subject = `Request Rejected for ${roleName} Role at ${organizationName}`;
    emailContent = `We regret to inform you that your request for the ${roleName} role at ${organizationName} has been rejected.${reasonText}`;
  }

  // Create the email message
  const message = {
    from: process.env.MAILER_EMAIL,
    to: user.email,
    subject: `${subject}`,
    html: `
        <p>Hello ${user.firstName},</p>
        <p>${emailContent}</p>
      `,
  };

  // Send the email
  await transporter.sendMail(message);
}

export async function emailOrganizationRequestApproved(
  user: User,
  organizationName: string,
) {
  const subject = `Request to Create Organization Approved`;
  const emailContent = `We are pleased to inform you that your request to create the new organization <strong>${organizationName}</strong> has been approved! You have been set as the organization owner.`;

  // Create the email message
  const message = {
    from: process.env.MAILER_EMAIL,
    to: user.email,
    subject,
    html: `
          <p>Hello ${user.firstName},</p>
          <p>${emailContent}</p>
        `,
  };

  // Send the email
  await transporter.sendMail(message);
}

export async function emailOrganizationRequestRejected(
  user: User,
  organizationName: string,
  rejectionReason?: string,
) {
  const subject = `Request to Create Organization Rejected`;
  const reasonText = rejectionReason
    ? ` Reason given: ${rejectionReason}.`
    : "";
  const emailContent = `We regret to inform you that your request to create the new organization <strong>${organizationName}</strong> has been rejected.${reasonText}`;

  // Create the email message
  const message = {
    from: process.env.MAILER_EMAIL,
    to: user.email,
    subject,
    html: `
          <p>Hello ${user.firstName},</p>
          <p>${emailContent}</p>
        `,
  };

  // Send the email
  await transporter.sendMail(message);
}

export const thankYouMessage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f3f4f6;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .thank-you {
                text-align: center;
                background-color: #fff;
                padding: 50px;
                box-shadow: 0 5px 15px rgba(0,0,0,.1);
                border-radius: 5px;
            }
            .thank-you h1 {
                color: #333;
            }
            .thank-you p {
                color: #555;
            }
        </style>
    </head>
    <body>
        <div class="thank-you">
            <h1>Thank You!</h1>
            <p>Your request has been processed successfully.</p>
        </div>
    </body>
    </html>
`;
