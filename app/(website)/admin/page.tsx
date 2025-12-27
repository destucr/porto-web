import { redirect } from "next/navigation"

export default function AdminGateway() {
  // Redirect to Keystatic admin which handles its own GitHub auth
  redirect("/keystatic")
}
