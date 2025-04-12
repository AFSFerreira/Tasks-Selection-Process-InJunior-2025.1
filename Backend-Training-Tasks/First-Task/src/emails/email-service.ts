import { transporter } from './mailer';
import ptWelcomeEmail from './templates/pt-BR/welcome-email';
import ptNewCommentEmail from './templates/pt-BR/new-comment-email';
import weeklyPostSummaryEmail from "./templates/pt-BR/weekly-post-summary";
import { Post } from '@prisma/client';

export async function sendWelcomeEmail(to: string, name: string) {
    const htmlContent = ptWelcomeEmail.html.replace("{{name}}", name);
    const textContent = ptWelcomeEmail.text.replace("{{name}}", name);

    await transporter.sendMail({
      from: '"PostsApp" <no-reply@postsapp.com>',
      to,
      subject: ptWelcomeEmail.subject,
      html: htmlContent,
      text: textContent,
    });
}

export async function sendNewCommentEmail(to: string, name: string) {
    await transporter.sendMail({
      from: '"PostsApp" <no-reply@postsapp.com>',
      to,
      subject: ptNewCommentEmail.subject,
      html: ptNewCommentEmail.html,
    });
}

export async function sendWeeklyPostSummary(to: string, name: string, posts: Post[]) {
    const emailContent = weeklyPostSummaryEmail(posts);
    
    await transporter.sendMail({
      from: '"PostsApp" <no-reply@postsapp.com>',
      to,
      subject: emailContent.subject,
      html: emailContent.html,
    });
}
