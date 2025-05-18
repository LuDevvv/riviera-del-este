import { Resend } from "resend";
import { ContactSchema, ContactData } from "@lib/types/contact";

export class EmailService {
  private resend: Resend;

  constructor() {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Resend API Key no configurada");
    }
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendContactEmail(data: ContactData) {
    const validationResult = ContactSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.errors,
      };
    }

    try {
      const { error } = await this.resend.emails.send({
        from: process.env.EMAIL_FROM || "contacto@rivieradeleste.com",
        to: process.env.EMAIL_TO || "destinatario@tudominio.com",
        subject: "Nuevo Contacto - Riviera del Este",
        html: this.createEmailTemplate(data),
      });

      if (error) {
        console.error("Error enviando email:", error);
        return {
          success: false,
          error: error,
        };
      }

      return {
        success: true,
      };
    } catch (err) {
      console.error("Error en servicio de email:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Error desconocido",
      };
    }
  }

  private createEmailTemplate(data: ContactData): string {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f4f4f4; padding: 10px; text-align: center; }
          .content { padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nuevo Contacto - Riviera del Este</h1>
          </div>
          <div class="content">
            <p><strong>Nombre:</strong> ${this.sanitizeHTML(data.name)}</p>
            <p><strong>Email:</strong> ${this.sanitizeHTML(data.email)}</p>
            <p><strong>Fecha:</strong> ${this.sanitizeHTML(data.date)}</p>
            <p><strong>Hora:</strong> ${this.sanitizeHTML(data.time)}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${this.sanitizeHTML(data.message)}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private sanitizeHTML(input: string): string {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

export const emailService = new EmailService();
