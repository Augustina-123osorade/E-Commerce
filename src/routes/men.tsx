import { createFileRoute } from "@tanstack/react-router";
import MainPage from "@/pages/MainPage";

export const Route = createFileRoute("/men")({
  component: Men,
});

function Men() {
  return (
    <div>
      <MainPage />
    </div>
  );
}
