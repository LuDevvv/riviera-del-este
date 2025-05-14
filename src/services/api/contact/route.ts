import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@services/mailService";
import { ContactSchema } from "@lib/types/contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = ContactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

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
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error en la solicitud de contacto:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}
