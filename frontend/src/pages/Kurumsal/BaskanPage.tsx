import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

import PageHero from "../../components/kurumsal/PageHero";

const BaskanPage = () => {
  return (
    <>
      <PageHero
        title="Başkan"
        description="Onikişubat Belediye Başkanı hakkında bilgi, özgeçmiş, mesaj ve görev yetkileri."
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[380px_1fr]">

          {/* Sol */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .5 }}
            className="overflow-hidden rounded-2xl bg-white shadow-xl"
          >

            <img
              src="/images/mayor/baskan.jpg"
              alt="Belediye Başkanı"
              className="h-[520px] w-full object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold text-slate-800">
                Hanifi TOPTAŞ
              </h2>

              <p className="mt-2 text-blue-700 font-semibold">
                Onikişubat Belediye Başkanı
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3 rounded-lg bg-slate-100 p-4">
                  <Phone className="text-blue-700" size={20}/>
                  <span>0344 211 46 46</span>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-slate-100 p-4">
                  <Mail className="text-blue-700" size={20}/>
                  <span>baskan@onikisubat.bel.tr</span>
                </div>

              </div>

            </div>

          </motion.div>

          {/* Sağ */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .5 }}
          >

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Belediye Başkanı
            </span>

            <h1 className="mt-5 text-4xl font-extrabold text-slate-900">
              Hanifi TOPTAŞ
            </h1>

            <p className="mt-6 leading-8 text-slate-600">
              Onikişubat Belediyesi olarak insan odaklı, şeffaf,
              katılımcı ve sürdürülebilir belediyecilik anlayışıyla
              ilçemizi geleceğe taşımak için çalışıyoruz.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Eğitimden kültüre, sosyal belediyecilikten altyapıya,
              çevreden spora kadar her alanda vatandaşlarımızın
              yaşam kalitesini artıracak projeleri hayata geçirmeyi
              amaçlıyoruz.
            </p>

            <div className="mt-10 rounded-2xl border-l-4 border-blue-700 bg-white p-8 shadow-lg">

              <h3 className="mb-5 text-2xl font-bold">
                Başkanın Mesajı
              </h3>

              <p className="leading-8 text-slate-600">
                "Onikişubat'ı daha yaşanabilir, daha yeşil ve daha
                modern bir şehir haline getirmek için ekip arkadaşlarımızla
                birlikte gece gündüz çalışıyoruz. Vatandaşlarımızın
                güveni ve desteğiyle ilçemizi geleceğe hazırlıyoruz."
              </p>

            </div>

          </motion.div>

        </div>
      </section>
    </>
  );
};


{/* Özgeçmiş */}

<section className="bg-white py-20">
  <div className="mx-auto max-w-7xl px-4">

    <div className="mb-12">
      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
        Özgeçmiş
      </span>

      <h2 className="mt-5 text-4xl font-bold text-slate-900">
        Belediye Başkanımızın Hayatı
      </h2>

      <div className="mt-4 h-1 w-24 rounded-full bg-blue-700" />
    </div>

    <div className="space-y-6 text-justify text-lg leading-9 text-slate-600">

      <p>
        Buraya belediye başkanının doğum yeri, eğitim hayatı,
        meslek hayatı ve siyasi kariyerine ait bilgiler
        eklenecektir.
      </p>

      <p>
        İçerikler yönetim panelinden düzenlenebilecek şekilde
        hazırlanacaktır. Böylece kod değiştirilmeden biyografi
        güncellenebilecektir.
      </p>

      <p>
        Başkanın belediyecilik vizyonu, sosyal çalışmaları,
        aldığı görevler ve ilçeye kazandırdığı projeler bu
        bölümde detaylı şekilde yer alacaktır.
      </p>

    </div>

  </div>
</section>
{/* Görev ve Yetkileri */}

<section className="bg-slate-50 py-20">

  <div className="mx-auto max-w-7xl px-4">

    <div className="mb-14">

      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
        Görev ve Yetkileri
      </span>

      <h2 className="mt-5 text-4xl font-bold text-slate-900">
        Belediye Başkanının Görevleri
      </h2>

      <div className="mt-4 h-1 w-24 rounded-full bg-blue-700" />

    </div>

    <div className="grid gap-8 md:grid-cols-2">

      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h3 className="mb-4 text-xl font-bold">
          Belediye Yönetimi
        </h3>

        <p className="leading-8 text-slate-600">
          Belediye teşkilatını sevk ve idare etmek,
          belediyeyi temsil etmek ve hizmetlerin etkin
          yürütülmesini sağlamak.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h3 className="mb-4 text-xl font-bold">
          Stratejik Yönetim
        </h3>

        <p className="leading-8 text-slate-600">
          Stratejik planların hazırlanmasını sağlamak,
          yatırım programlarını yönetmek ve belediyenin
          hedeflerini belirlemek.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h3 className="mb-4 text-xl font-bold">
          Meclis Kararları
        </h3>

        <p className="leading-8 text-slate-600">
          Belediye meclisi kararlarını uygulamak ve
          ilgili süreçleri takip etmek.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h3 className="mb-4 text-xl font-bold">
          Kamu Hizmetleri
        </h3>

        <p className="leading-8 text-slate-600">
          Vatandaşlara kaliteli, hızlı ve şeffaf
          belediyecilik hizmeti sunulmasını sağlamak.
        </p>
      </div>

    </div>

  </div>

</section>
{/* Fotoğraf Galerisi */}

<section className="bg-white py-20">

  <div className="mx-auto max-w-7xl px-4">

    <div className="mb-14">

      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
        Galeri
      </span>

      <h2 className="mt-5 text-4xl font-bold text-slate-900">
        Fotoğraf Galerisi
      </h2>

      <div className="mt-4 h-1 w-24 rounded-full bg-blue-700" />

    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

      <img
        src="/images/mayor/gallery1.jpg"
        className="h-72 w-full rounded-2xl object-cover transition hover:scale-105"
      />

      <img
        src="/images/mayor/gallery2.jpg"
        className="h-72 w-full rounded-2xl object-cover transition hover:scale-105"
      />

      <img
        src="/images/mayor/gallery3.jpg"
        className="h-72 w-full rounded-2xl object-cover transition hover:scale-105"
      />

      <img
        src="/images/mayor/gallery4.jpg"
        className="h-72 w-full rounded-2xl object-cover transition hover:scale-105"
      />

    </div>

  </div>

</section>
export default BaskanPage;