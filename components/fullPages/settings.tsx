import { ChevronRightIcon } from "@chakra-ui/icons";
import { Switch } from "@chakra-ui/react";
import { SegmentedControl } from "ios-segmented-control-react";

import { useUserAuth } from "../../contexts/AuthContext";
import PreferenceItem from "../atoms/preferenceItem";

/**
 *
 */
export const Settings: React.FC<{
  /** Set the settings to be opened or closed */
  setSettingsOpen: (boolean) => void;
}> = ({ setSettingsOpen }) => {
  const handleSettingsClose = (e): void => {
    e.preventDefault();
    setSettingsOpen(false);
  };

  const { userDocument } = useUserAuth();

  return (
    <div className="absolute h-screen z-10 w-full bg-black bg-opacity-50">
      <div className="flex flex-col gap-8 items-center absolute top-12 w-full bg-[#ECEFE5] rounded-t-2xl px-2 pb-36 animate-rise">
        <div onClick={handleSettingsClose} className="p-2 cursor-pointer">
          <div className="rounded-md w-10 h-1 bg-monstera-800" />
        </div>
        <div id="account" className=" w-full">
          <p className="relative left-2 mb-2 text-sm text-monstera-800">
            Account
          </p>
          <div className="divide-y divide-slate-200 rounded-2xl bg-white">
            <PreferenceItem label="Email">{userDocument.email}</PreferenceItem>
            <PreferenceItem label="Name">{userDocument.name}</PreferenceItem>
            <PreferenceItem label="Password">********</PreferenceItem>
          </div>
        </div>
        <div id="preferences" className=" w-full">
          <p className="relative left-2 mb-2 text-sm text-monstera-800">
            Preferences
          </p>
          <div className="divide-y divide-slate-200 rounded-2xl bg-white">
            <PreferenceItem label="Theme">
              <div className="rounded-none">
                <SegmentedControl
                  segments={[
                    { label: "Light", value: "sigle" },
                    { label: "System", value: "recursive", default: true },
                    { label: "Dark", value: "disabled", disabled: false },
                  ]}
                  // TODO: Perform an action here
                  // eslint-disable-next-line no-console
                  onChangeSegment={(newValue) => console.log(newValue)}
                />
              </div>
            </PreferenceItem>
            <PreferenceItem label="Reduce Motion">
              <Switch />
            </PreferenceItem>
          </div>
        </div>
        <div id="about" className=" w-full mb-6">
          <p className="relative left-2 mb-2 text-sm text-monstera-800">
            About
          </p>
          <div className="divide-y divide-slate-200 rounded-2xl bg-white">
            <PreferenceItem label="Help and Feedback">
              <ChevronRightIcon boxSize="1.5rem" focusable color="black" />
            </PreferenceItem>
            <PreferenceItem label="Privacy">
              {" "}
              <ChevronRightIcon boxSize="1.5rem" focusable color="black" />
            </PreferenceItem>
            <PreferenceItem label="Terms and Conditions">
              {" "}
              <ChevronRightIcon boxSize="1.5rem" focusable color="black" />
            </PreferenceItem>
            <PreferenceItem label="Changelog">
              {" "}
              <ChevronRightIcon boxSize="1.5rem" focusable color="black" />
            </PreferenceItem>
          </div>
        </div>
        <div id="logout" className=" w-full">
          <div className="divide-y divide-slate-200 rounded-2xl bg-white">
            <PreferenceItem label="Log Out" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
