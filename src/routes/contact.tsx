import { createFileRoute } from "@tanstack/react-router";
import MainPage from "@/pages/MainPage";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  return (
    <div>
      <MainPage />
    </div>
  );
}
