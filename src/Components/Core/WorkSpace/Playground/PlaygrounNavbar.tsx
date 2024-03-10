import { useState, useEffect } from "react";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineSetting,
} from "react-icons/ai";
import { IsSettings } from "./Playground.tsx";
import SettingsModal from "../../../Common/Modals/SettingsModal.tsx";

type Props = {
  language: string;
  fetchRun: () => void;
  settings: IsSettings;
  setSettings: React.Dispatch<React.SetStateAction<IsSettings>>;
  loading: boolean;
};

function InputNavbar({
  language,
  fetchRun,
  settings,
  setSettings,
  loading,
}: Props) {
  const [isFullscreen, setFullscreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setFullscreen(!isFullscreen);
  };

  useEffect(() => {
    function exitHandler() {
      if (!document.fullscreenElement) {
        setFullscreen(false);
        return;
      }
      setFullscreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSfullscreenchange", exitHandler);
    }
  }, [isFullscreen]);

  return (
    <div className="flex justify-between bg-slate-200 h-11 w-full  ">
      <div className="flex justify-between h-11 w-full items-center pt-2 text-green-700 ">
        <div
          className={
            "bg-white rounded-t-[5px] px-5 py-[10px] text-s cursor-pointer"
          }
        >
          {language}
        </div>
      </div>

      <div className="flex items-center m-2">
        <button
          onClick={loading ? () => {} : fetchRun}
          className=" rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex  ml-auto p-1 mr-2 bg-green-700 text-white"
        >
          {loading ? "Loading.." : "Run"}
        </button>
        <button
          className="relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex  ml-auto p-1 mr-2 group"
          onClick={() => {
            setSettings({ ...settings, settingsModalIsOpen: true });
          }}
        >
          <div className="h-4 w-4 text-black font-bold text-lg">
            <AiOutlineSetting />
          </div>
          <div
            className="absolute w-auto p-2 text-sm m-2  min-w-max translate-x-3 -right-2 top-6 z-10 rounded-md shadow-md
		text-green-700 bg-slate-100  origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100 scale-0;"
          >
            Settings
          </div>
        </button>

        <button
          className="relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex  ml-auto p-1 mr-2 group"
          onClick={handleFullScreen}
        >
          <div className="h-4 w-4 text-black font-bold text-lg">
            {!isFullscreen ? (
              <AiOutlineFullscreen />
            ) : (
              <AiOutlineFullscreenExit />
            )}
          </div>
          <div
            className="absolute w-auto p-2 text-sm m-2  min-w-max translate-x-3  -right-3 top-6 z-10 rounded-md shadow-md
            text-green-700 bg-slate-100   origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100 scale-0;"
          >
            {!isFullscreen ? " Set Full Screen" : "Exit Full Screen"}
          </div>
        </button>
      </div>
      {settings.settingsModalIsOpen && (
        <SettingsModal settings={settings} setSettings={setSettings} />
      )}
    </div>
  );
}

export default InputNavbar;
