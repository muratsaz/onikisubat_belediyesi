import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import {
  getMissionVision,
  updateMissionVision,
  type MissionVision,
} from "../../services/missionVisionService";

const MisyonVizyon = () => {
    
  const [missionVision, setMissionVision] =
    useState<MissionVision | null>(null);

  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMissionVision = async () => {
      try {
        setLoading(true);

        const data = await getMissionVision();

        setMissionVision(data);
        setMission(data.mission);
        setVision(data.vision);
      } catch (error) {
        console.error("Misyon & vizyon alınamadı:", error);

        setMessage(
          "Misyon & vizyon bilgisi henüz oluşturulmamış olabilir."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMissionVision();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      const data = await updateMissionVision({
        mission,
        vision,
      });

      setMissionVision(data);
      setMission(data.mission);
      setVision(data.vision);

      setMessage("Misyon & Vizyon başarıyla kaydedildi.");
    } catch (error) {
      console.error("Misyon & vizyon kaydedilemedi:", error);

      setMessage("Misyon & Vizyon kaydedilirken bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Misyon & Vizyon
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Belediyenin misyon ve vizyon bilgilerini buradan
            düzenleyebilirsiniz.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Misyon
            </label>

            <textarea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              rows={8}
              placeholder="Belediyenin misyonunu yazın..."
              className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Vizyon
            </label>

            <textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              rows={8}
              placeholder="Belediyenin vizyonunu yazın..."
              className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 leading-7 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {message && (
            <div
              className={`mb-5 rounded-xl px-4 py-3 text-sm font-medium ${
                message.includes("başarıyla")
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Kaydet
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisyonVizyon;