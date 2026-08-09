import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-900 px-6 text-center">
      <p className="eyebrow mb-6">Error 404</p>
      <h1 className="font-display text-clamp-h2 text-bone">Page not found.</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-bone-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className="btn-gold mt-10">
        Back to Home
      </Link>
    </div>
  );
}
