import { createFileRoute } from '@tanstack/react-router'
import SingleUser from '../single-user.tsx'

export const Route = createFileRoute('/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SingleUser />
}
