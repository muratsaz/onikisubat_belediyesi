import { motion } from "framer-motion";
import PageHeader from "../../components/common/PageHeader";

const BaskanPage = () => {
  return (
    <>
      <PageHeader
        title="Özgeçmiş"
        section="Başkan"
        description="Onikişubat Belediye Başkanı hakkında bilgiler."
      />

      <section className="bg-slate-50 py-12 lg:py-14">
        <div className="mx-auto max-w-[1660px] px-4 lg:px-8">

          {/* SOL MENÜ + ANA İÇERİK */}
          <div className="flex items-start gap-[72px]">

            {/* SOL MENÜ */}
            <aside className="hidden w-[245px] shrink-0 lg:block">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <button
                  type="button"
                  className="w-full bg-slate-100 px-6 py-5 text-left text-base font-semibold text-blue-700"
                >
                  Özgeçmiş
                </button>

                <button
                  type="button"
                  className="w-full border-t border-slate-100 px-6 py-4 text-left text-base text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
                >
                  Başkana Mesaj
                </button>

                <button
                  type="button"
                  className="w-full border-t border-slate-100 px-6 py-5 text-left text-base leading-6 text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
                >
                  Başkanla
                  <br />
                  Fotoğraflarınız
                </button>

              </div>
            </aside>

            {/* ANA İÇERİK */}
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="min-w-0 flex-1"
            >

              {/* TEK PARÇA İÇERİK */}
              <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

                {/* BAŞKAN FOTOĞRAFI */}
                <div className="w-full overflow-hidden">
                  <img
                    src="/images/mayor/mayor.jpg"
                    alt="Hanifi Toptaş - Onikişubat Belediye Başkanı"
                    className="block h-[430px] w-full object-cover object-top sm:h-[510px] lg:h-[600px]"
                  />
                </div>

                {/* ÖZGEÇMİŞ */}
                <div className="px-7 py-8 sm:px-10 lg:px-12 lg:py-10">
                  <div className="space-y-3 text-[15px] leading-7 text-slate-700 lg:text-base lg:leading-8">

                    <p>
                      Hanifi Toptaş, Onikişubat Belediye Başkanı olarak
                      ilçemizin gelişimi ve vatandaşlarımızın yaşam
                      kalitesinin artırılması amacıyla çalışmalarını
                      sürdürmektedir.
                    </p>

                    <p>
                      Eğitim hayatı, mesleki geçmişi, belediyecilik
                      anlayışı ve kamu hizmetine yönelik çalışmaları
                      doğrultusunda Onikişubat'ın geleceğine katkı
                      sağlamayı hedeflemektedir.
                    </p>

                    <p>
                      İnsan odaklı, şeffaf, katılımcı ve çözüm odaklı
                      belediyecilik anlayışıyla ilçenin ihtiyaçlarına
                      yönelik çalışmalar yürütmektedir.
                    </p>

                    <p>
                      Belediye başkanımızın hayatı, görevleri,
                      çalışmaları ve belediyecilik vizyonuna ilişkin
                      bilgiler bu bölümde ayrıntılı olarak yer alacaktır.
                    </p>

                  </div>
                </div>

              </article>

            </motion.main>

          </div>
        </div>
      </section>
    </>
  );
};

export default BaskanPage;