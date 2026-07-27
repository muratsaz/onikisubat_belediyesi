export default function DashboardHero() {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white">
      <p className="text-sm uppercase tracking-[0.25em] text-slate-300">
        Onikişubat Belediyesi
      </p>

      <h1 className="mt-4 text-4xl font-bold">
        Hoş Geldiniz 👋
      </h1>

      <p className="mt-3 max-w-2xl text-slate-300">
        Belediye yönetim paneline hoş geldiniz.
        Buradan haberleri, duyuruları, etkinlikleri,
        galeriyi ve kurumsal sayfaları yönetebilirsiniz.
      </p>
    </section>
  );
}