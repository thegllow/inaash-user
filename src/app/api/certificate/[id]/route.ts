import { NextRequest, NextResponse } from "next/server"

import { createCanvas, loadImage } from "canvas"
import QRCode from "qrcode"
import { z } from "zod"

import path from "node:path"
import { drawRoundedRectangle, formatDateToDDMMYYYY, searchParamsToObject } from "./utils"

const searchParamsSchema = z.object({
  name: z.string().min(1),
  date: z.string().min(1),
  certificate_no: z.string(),
  certificate_code: z.string(),
  scale: z.coerce.number().optional(),
})

const certificates = {
  "1": {
    src: path.join(process.cwd(), "public", "1.png"),
    color: "#9f5ffc",
  },
  "2": {
    src: path.join(process.cwd(), "public", "2.png"),
    color: "#1ad0d1",
  },
}
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // validating search params
    const { success, error, data } = searchParamsSchema.safeParse(
      searchParamsToObject(request.nextUrl.searchParams),
    )
    if (!success) return NextResponse.json(error, { status: 422 })
    const { name, date, certificate_no, certificate_code } = data
    console.log("🚀 ~ GET ~ date:", date)

    // scale factor is an optional scale of the original size
    let scaleFactor = data.scale ?? 1

    const id = (await params).id as "1" | "2"

    const { src, color } = certificates[id]
    // loading certificate template
    const templatePath = src
    console.log("🚀 ~ GET ~ templatePath:", templatePath)
    const certificateImage = await loadImage(templatePath)
    const canvasWidth = certificateImage.width * scaleFactor
    const canvasHeight = certificateImage.height * scaleFactor

    // Create a canvas
    const canvas = createCanvas(canvasWidth, canvasHeight)
    const context = canvas.getContext("2d")

    // Draw the certificate template on the canvas
    context.drawImage(certificateImage, 0, 0, canvasWidth, canvasHeight)

    // Customize font and style for the name
    context.font = `bold ${110 * scaleFactor}px Arial`
    context.fillStyle = color
    context.textAlign = "center"

    // Set the position for the name (adjust these values)
    const x = canvasWidth / 2
    const y = canvasHeight / 2.45

    // Render the user's name
    context.fillText(name, x, y)

    // Add the date on the top-left corner

    context.font = `${46 * scaleFactor}px Arial` // Smaller font for date and certificate number
    context.fillStyle = "black"
    context.textAlign = "left"

    const dateX = canvasWidth / 7 // Left margin
    const dateY = canvasHeight / 9 // Top margin
    // context.fillText(`Date: ${date}`, dateX, dateY)

    // Add the "Date" label in a lighter color
    context.fillStyle = "rgba(0, 0, 0, 0.7)" // Lighter color for "Date"
    context.fillText("Date:", dateX, dateY)

    // Draw the actual date in a darker color
    context.fillStyle = "#000" // Darker color for the date value
    context.fillText(formatDateToDDMMYYYY(new Date(date)), dateX + 120 * scaleFactor, dateY) // Offset to the right of "Date:"
    // Add the certificate number on the top-right corner
    const certX = canvasWidth - canvasWidth / 5.5 // Right margin
    const certY = canvasHeight / 9 // Top margin
    context.textAlign = "right"
    context.fillText(certificate_no, certX + 105 * scaleFactor, certY)
    context.fillStyle = "rgba(0, 0, 0, 0.7)" // Lighter color for "Date"
    context.fillText(`Certificate no:`, certX, certY)

    // Generate QR code for the certificate number
    const qrCodeData = await QRCode.toDataURL(
      `https://inaash.edu.sa/eb/information-center/${certificate_code}`,
      {
        margin: 0.5,
        errorCorrectionLevel: "M",
      },
    )

    // Load QR code as an image
    const qrCodeImage = await loadImage(qrCodeData)

    // Set QR code size and position
    const qrCodeSize = 400 * scaleFactor // Adjust size as needed
    const qrCodeX = canvasWidth / 2 - qrCodeSize / 2 // Center horizontally
    const qrCodeY = (canvasHeight - qrCodeSize / 2) / 1.5

    const borderRadius = 32 * scaleFactor // Border radius for rounded corners

    // Draw rounded rectangle for QR code clipping
    // @ts-ignore
    drawRoundedRectangle(context, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize, borderRadius)

    context.clip() // Apply clipping to make the QR code rounded
    // Draw the QR code inside the rounded clipping area
    context.drawImage(qrCodeImage, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize)

    // Create PNG stream
    const stream = canvas.createPNGStream()
    // Convert the PNG stream to a Web Stream response
    const readable = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => controller.enqueue(chunk))
        stream.on("end", () => controller.close())
        stream.on("error", (err) => controller.error(err))
      },
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "image/png",
      },
    })
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
