import {
  CreditCard,
  FileSearch,
  Building2,
  HeartHandshake,
  Map,
  FileCheck,
} from "lucide-react";

const actions = [
  {
    title: "Vergi Borcu",
    icon: CreditCard,
  },
  {
    title: "Borç Sorgulama",
    icon: FileSearch,
  },
  {
    title: "İmar Durumu",
    icon: Building2,
  },
  {
    title: "Beyaz Masa",
    icon: HeartHandshake,
  },
  {
    title: "Rayiç Değer",
    icon: Map,
  },
  {
    title: "Evrak Doğrulama",
    icon: FileCheck,
  },
];

const QuickActions = () => {
  return (
    <section className="py-10">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8">

          <h2 className="text-3xl font-black text-slate-900">
            En Çok Kullanılan İşlemler
          </h2>

          <p className="mt-2 text-slate-600">
            Vatandaşlarımızın en sık kullandığı hizmetlere hızlı erişin.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">

          {actions.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 transition group-hover:bg-blue-700">

                  <Icon
                    size={28}
                    className="text-blue-700 transition group-hover:text-white"
                  />

                </div>

                <h3 className="mt-5 text-sm font-bold text-slate-800">
                  {item.title}
                </h3>

              </button>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default QuickActions;