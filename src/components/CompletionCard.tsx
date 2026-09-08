import { CircleCheckBig } from 'lucide-react'

export function CompletionCard() {
  return (
    <section className="flex min-h-[430px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-blue-100 bg-white px-7 py-12 text-center shadow-xl shadow-slate-200/50">
      <span className="relative mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-200">
        <span className="absolute h-28 w-28 animate-ping rounded-full bg-blue-100 opacity-40" aria-hidden="true" />
        <CircleCheckBig className="relative h-10 w-10" aria-hidden="true" />
      </span>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-blue-600">Sessão concluída</p>
      <h1 className="text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl">Isso é tudo por agora!</h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
        Você concluiu as 5 palavras de hoje. Aproveite seu tempo livre e volte depois para aprender mais!
      </p>
    </section>
  )
}
