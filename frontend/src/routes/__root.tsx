import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '../main.css'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className='bg-gray-900 text-gray-100 h-screen min-w-full'>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})
