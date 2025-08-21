import { createFileRoute } from "@tanstack/react-router";
import MainPage from "@/pages/MainPage";

export const Route = createFileRoute("/collections")({
  component: Collections,
});

function Collections() {
  return (
    <div>
      <MainPage />
    </div>
  );
}
