import { createFileRoute } from "@tanstack/react-router";
import MainPage from "@/pages/MainPage";

export const Route = createFileRoute("/women")({
  component: Women,
});

function Women() {
  return (
    <div>
      <MainPage />
    </div>
  );
}
