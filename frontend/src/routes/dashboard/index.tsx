import { createFileRoute } from '@tanstack/react-router'
import DashboardNavbar from '../../components/Dashboard/Navbar'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <DashboardNavbar />
    <main>
      
    </main>
  </div>
}
