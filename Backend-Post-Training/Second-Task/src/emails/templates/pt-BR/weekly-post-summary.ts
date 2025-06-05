// emails/templates/pt-BR/weekly-post-summary.ts

import { Post } from "@prisma/client";

export default function weeklyPostSummaryEmail(posts: Post[]) {
  const rows = posts
    .map((post, index) => {
      return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">
          <strong>${index + 1}.</strong> ${post.title}<br/>
          <small>Conteúdo: ${post.content} — ${post.createdAt}</small>
        </td>
      </tr>
    `;
    })
    .join("");

  return {
    subject: `📊 Resumo semanal dos posts mais curtidos`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h2 style="color: #444;">Resumo semanal - Posts mais curtidos</h2>
        <p>Confira os posts que mais bombaram na plataforma:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          ${rows}
        </table>
        <p style="margin-top: 30px;">🚀 Continue postando e interagindo para aparecer nos próximos rankings!</p>
      </div>
    `,
  };
}
