import { Resend } from "resend";
import { ContactSchema, ContactData } from "@lib/types/contact";

// Fixed agent info for template
const AGENT_INFO = {
  name: "Rufy Castor",
  phone: "(809) 299-5767",
  photoUrl:
    "https://res.cloudinary.com/dcuapqoii/image/upload/v1747842317/rufycastor_yjf0as.jpg",
};

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
        from: process.env.EMAIL_FROM!,
        to: process.env.EMAIL_TO!,
        replyTo: data.email, // Fixed: replyTo instead of reply_to
        subject: `Nuevo Contacto - ${data.name}`,
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
    } catch (err: any) {
      // Fixed: explicit any type
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Nuevo Contacto – ${AGENT_INFO.name}</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f9f9f9;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9f9f9;padding:20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
              
              <!-- Header -->
              <tr>
                <td style="background-color:#274e47;padding:20px;text-align:center;color:#ffffff;">
                  <h1 style="margin:0;font-size:24px;">Nuevo Contacto</h1>
                  <p style="margin:5px 0 0;">Para: ${this.sanitizeHTML(AGENT_INFO.name)}</p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:20px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <!-- Agent photo and info -->
                      <td width="30%" style="vertical-align:top;padding-right:15px;">
                        <img src="${this.sanitizeHTML(AGENT_INFO.photoUrl)}" alt="${this.sanitizeHTML(AGENT_INFO.name)}" style="width:100%;border-radius:4px;"/>
                        <p style="margin:10px 0 0;font-size:14px;color:#333;text-align:center;">
                          <strong>${this.sanitizeHTML(AGENT_INFO.name)}</strong><br/>
                          ${this.sanitizeHTML(AGENT_INFO.phone)}
                        </p>
                      </td>
                      
                      <!-- Contact details -->
                      <td width="70%" style="vertical-align:top;font-size:14px;color:#333;">
                        <h3 style="margin:0 0 15px;color:#274e47;">Detalles del Cliente</h3>
                        <p><strong>Nombre:</strong> ${this.sanitizeHTML(data.name)}</p>
                        <p><strong>Email:</strong> <a href="mailto:${this.sanitizeHTML(data.email)}" style="color:#274e47;text-decoration:none;">${this.sanitizeHTML(data.email)}</a></p>
                        <p><strong>Fecha Visita:</strong> ${this.formatDate(data.date)}</p>
                        <p><strong>Hora Visita:</strong> ${this.sanitizeHTML(data.time)}</p>
                        <div style="margin-top:15px;">
                          <strong>Mensaje:</strong>
                          <div style="background-color:#f8f9fa;padding:10px;border-radius:4px;margin-top:5px;">
                            ${this.sanitizeHTML(data.message)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color:#f4f4f4;padding:15px;text-align:center;font-size:12px;color:#777;">
                  <p style="margin:0;">Riviera del Este</p>
                  <p style="margin:5px 0 0;">Calle Santos Alcalá, San Pedro de Macorís 21000</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
  }

  private formatDate(dateString: string): string {
    // Parse date correctly to avoid timezone issues
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed

    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
