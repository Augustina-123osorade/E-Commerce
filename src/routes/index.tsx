import { createFileRoute } from '@tanstack/react-router'
import MainPage from '@/pages/MainPage'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <div >
      <MainPage />
    </div>
  )
}