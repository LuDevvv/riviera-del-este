import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@services/mailService";
import { ContactSchema } from "@lib/types/contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validación
    const validationResult = ContactSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("❌ Validación falló:", validationResult.error.errors);
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    // Enviar email
    const result = await emailService.sendContactEmail(body);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: "Mensaje enviado exitosamente",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Error al enviar el mensaje",
          error: result.error,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("❌ Error crítico en API:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
