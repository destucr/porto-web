import Link from "next/link"

export default function NotFound() {
  return (
    <div className="wrap flex flex-col justify-center min-h-[70vh] pb-16">
      <p className="caps">404</p>
      <h1 className="mt-4 font-serif text-[2rem] font-medium tracking-tight text-balance">
        This stop isn&apos;t on the route.
      </h1>
      <p className="mt-4 text-muted-foreground leading-[1.75]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <p className="mt-6">
        <Link href="/" className="essay-link text-foreground">
          ← Back to Destu Cikal
        </Link>
      </p>
    </div>
  )
}
