import { createFileRoute } from "@tanstack/react-router";
import MainPage from "@/pages/MainPage";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div>
      <MainPage />
    </div>
  );
}
