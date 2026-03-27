import { redirect } from "next/navigation";

export default function RootPage() {
  // TODO, this will check if user is authenticated.
  // If user is, then redirect to dashboard else redirect to login

  redirect("/auth/login")
}
