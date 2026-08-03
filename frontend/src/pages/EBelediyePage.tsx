import PageHeader from "../components/common/PageHeader";
import QuickActions from "../components/e-belediye/QuickActions";
import EServiceHero from "../components/e-belediye/EServiceHero";
import EServiceGrid from "../components/e-belediye/EServiceGrid";

const EBelediyePage = () => {
  return (
    <>
      <PageHeader
        title="E-Belediye"
        section="Online İşlemler"
        description="Belediyemize ait dijital hizmetlere güvenli ve hızlı şekilde ulaşabilirsiniz."
      />

      <section className="bg-slate-100 py-16">

        <div className="mx-auto max-w-7xl px-4 lg:px-6">

          <EServiceHero />
            <QuickActions />
          <EServiceGrid />

        </div>

      </section>
    </>
  );
};

export default EBelediyePage;