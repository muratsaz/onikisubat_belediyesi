import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

const TopBar = () => {
  return (
    <div className="hidden bg-slate-800 text-white lg:block">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4">

        {/* Sol Taraf */}

        <div className="flex items-center gap-6 text-sm">

          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>0344 000 00 00</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>info@onikisubat.bel.tr</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            <span>Pzt - Cum | 08:00 - 17:00</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>Kahramanmaraş</span>
          </div>

        </div>

        {/* Sağ Taraf */}

        <div className="flex items-center gap-4 text-base">

          <a
            href="#"
            className="transition hover:text-blue-400"
          >
            <FaFacebookF />
          </a>

          <a
            href="#"
            className="transition hover:text-pink-400"
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            className="transition hover:text-red-500"
          >
            <FaYoutube />
          </a>

        </div>

      </div>
    </div>
  );
};

export default TopBar;