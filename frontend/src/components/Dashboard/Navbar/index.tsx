

export default function DashboardNavbar() {
  return (
    <nav>
      <ul className="flex space-x-6 border-b border-gray-700 h-11 items-center px-4 justify-end text-sm">
        <li>
          <a href="/dashboard/" className="text-white hover:underline">Inicio</a>
        </li>
        <li>
          <a href="/dashboard/" className="text-white hover:underline">Pacientes</a>
        </li>
        <li>
          <a href="/dashboard/" className="text-white hover:underline">Consultas</a>
        </li>
      </ul>
    </nav>
  )
}
