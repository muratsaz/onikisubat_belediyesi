interface KurumsalPageProps {
  title: string;
}

const KurumsalPage = ({
  title,
}: KurumsalPageProps) => {
  return (
    <div className="p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mt-2 text-slate-500">
          Bu bölümün yönetim ekranı hazırlanacaktır.
        </p>
      </div>
    </div>
  );
};

export default KurumsalPage;