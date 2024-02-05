import { BsCheckLg, BsChevronDown } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { IsSettings } from "./WorkSpace/Playground/Playground";
import {useLocalStorage} from "./Hooks/useLocalStorage";

type SettingsModalProps = {
  settings: IsSettings;
  setSettings: React.Dispatch<React.SetStateAction<IsSettings>>;
};

const EDITOR_FONT_SIZES = [12, 14, 16, 18, 20, 22, 24, 26];

const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  setSettings,
}) => {
  const [fontSize, setFontSize] = useLocalStorage(
    "Remote-Code-Executor-FontSize",
    16
  );

  const handleClickDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setSettings({ ...settings, dropDownIsOpen: !settings.dropDownIsOpen });
  };

  return (
    <div className="text-white z-40">
      <div
        aria-modal="true"
        role="dialog"
        className="fixed inset-0 overflow-y-auto "
      >
        <div className="flex min-h-screen items-center justify-center px-4">
          {/* overlay */}
          <div
            className="opacity-100"
            onClick={() => {
              setSettings({ ...settings, settingsModalIsOpen: false });
            }}
          >
            <div className="fixed inset-0 bg-[rgb(38,38,38)] opacity-70"></div>
          </div>

          <div className="my-8 inline-block min-w-full transform rounded-[13px] text-left transition-all  md:min-w-[420px] shadow-lg p-0 bg-[rgb(40,40,40)] w-[600px] !overflow-visible opacity-100 scale-100">
            {/* setting header */}
            <div className="flex items-center border-b px-5 py-4 text-lg font-medium">
              Settings
              <button
                className="ml-auto cursor-pointer rounded transition-all"
                onClick={() => {
                  setSettings({ ...settings, settingsModalIsOpen: false });
                }}
              >
                <IoClose />
              </button>
            </div>

            <div className="px-6 pt-4 pb-6">
              <div className="mt-6 flex justify-between first:mt-0">
                <div className="w-[340px]">
                  <h3 className=" text-base font-medium">
                    <strong>Font size</strong>
                  </h3>
                  <h3 className="text-base mt-1.5">
                    Choose your preferred font size for the code editor.
                  </h3>
                </div>
                <div className="w-[170px]">
                  <div className="relative">
                    <button
                      onClick={handleClickDropdown}
                      className="flex cursor-pointer items-center rounded px-3 py-1.5 text-left focus:outline-none whitespace-nowrap bg bg-[hsla(0,0%,100%,.1)] hover:bg-[hsla(0,0%,100%,.14)] active:bg-[hsla(0,0%,100%,.1)] w-full justify-between"
                      type="button"
                    >
                      {fontSize}px
                      <BsChevronDown />
                    </button>
                    {/* Show dropdown for fontsizes */}
                    {settings.dropDownIsOpen && (
                      <ul
                        className="absolute mt-1 max-h-56 overflow-auto rounded-lg p-2 z-50 focus:outline-none shadow-lg w-full bg-[rgb(40,40,40)]"
                        style={{
                          filter:
                            "drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px) drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px)",
                        }}
                      >
                        {EDITOR_FONT_SIZES.map((fontSize, idx) => (
                          <SettingsListItem
                            key={idx}
                            fontSize={fontSize}
                            selectedOption={settings.fontSize}
                            handleFontSizeChange={(fontsize) => {
                              setFontSize(fontsize);
                              setSettings({ ...settings, fontSize: fontsize });
                            }}
                          />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsModal;

interface SettingsListItemProps {
  fontSize: number;
  selectedOption: number;
  handleFontSizeChange: (fontSize: number) => void;
}

const SettingsListItem: React.FC<SettingsListItemProps> = ({
  fontSize,
  selectedOption,
  handleFontSizeChange,
}) => {
  return (
    <li className="relative flex h-8 cursor-pointer select-none py-1.5 pl-2 text-label-2 hover:bg-[hsla(0,0%,100%,.1)] rounded-lg">
      <div
        className={`flex h-5 flex-1 items-center pr-2 ${
          selectedOption === fontSize ? "font-medium" : ""
        }`}
        onClick={() => handleFontSizeChange(fontSize)}
      >
        <div className="whitespace-nowrap">{fontSize}px</div>
      </div>
      <span
        className={`flex items-center pr-2 ${
          selectedOption === fontSize ? "visible" : "invisible"
        }`}
      >
        <BsCheckLg />
      </span>
    </li>
  );
};
