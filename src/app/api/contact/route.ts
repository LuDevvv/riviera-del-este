import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@services/mailService";
import { ContactSchema } from "@lib/types/contact";

export async function POST(request: NextRequest) {
  console.log("🚀 Contact API iniciada:", {
    timestamp: new Date().toISOString(),
    url: request.url,
  });

  try {
    const body = await request.json();

    console.log("📥 Datos recibidos:", {
      name: body.name,
      email: body.email,
      date: body.date,
      time: body.time,
      messageLength: body.message?.length,
    });

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

    console.log("✅ Validación OK, enviando email...");

    // Enviar email
    const result = await emailService.sendContactEmail(body);

    console.log("📧 Resultado del envío:", {
      success: result.success,
      error: result.error,
      timestamp: new Date().toISOString(),
    });

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
