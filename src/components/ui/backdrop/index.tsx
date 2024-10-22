export function Backdrop({ open, onClick }: { open: boolean; onClick(): void }) {
  return <div onClick={onClick} className={`app-backdrop ${open ? 'app-backdrop-open' : ''}`} />
}
