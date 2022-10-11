import { Switch } from "@chakra-ui/react";
import { ChevronRightIcon, SettingsIcon } from "@chakra-ui/icons";
import { SegmentedControl } from "ios-segmented-control-react";

import { motion } from "framer-motion";

import PreferenceItem from "../atoms/preferenceItem";

import { useUserAuth } from "../../contexts/AuthContext";

export default function Settings({ setSettingsOpen }) {
  
  const handleSettingsClose = (e) => {
    e.preventDefault();
    setSettingsOpen(false);
  };

  const {
    user,
    userDocument,
    uploadProfilePic,
    photoURL,
    setPhotoURL,
    name,
    updateUserPassword,
    setHiddenAnimation,
  } = useUserAuth();

  return (
    <div className="absolute h-screen z-10 w-full bg-black bg-opacity-50">
      <div
        className="flex flex-col gap-8 items-center absolute top-12 w-full bg-[#ECEFE5] rounded-t-2xl px-2 pb-36 animate-rise"
      >
        <div onClick={handleSettingsClose} className="p-2 cursor-pointer">
        <div
          className="rounded-md w-10 h-1 bg-monstera-800"
          
        ></div>
        </div>
        <div id="account" className=" w-full">
          <p className="relative left-2 mb-2 text-sm text-monstera-800">
            Account
          </p>
          <div className="divide-y divide-slate-200 rounded-2xl bg-white">
            <PreferenceItem label={"Email"}>
              {userDocument.email}
            </PreferenceItem>
            <PreferenceItem label={"Name"}>{userDocument.name}</PreferenceItem>
            <PreferenceItem label={"Password"}>********</PreferenceItem>
          </div>
        </div>
        <div id="preferences" className=" w-full">
          <p className="relative left-2 mb-2 text-sm text-monstera-800">
            Preferences
          </p>
          <div className="divide-y divide-slate-200 rounded-2xl bg-white">
            <PreferenceItem label={"Theme"}>
              <div className="rounded-none">
                <SegmentedControl
                  segments={[
                    { label: "Light", value: "sigle" },
                    { label: "System", value: "recursive", default: true },
                    { label: "Dark", value: "disabled", disabled: false },
                  ]}
                  onChangeSegment={(newValue) => console.log(newValue)}
                />
              </div>
            </PreferenceItem>
            <PreferenceItem label={"Reduce Motion"}>
              <Switch></Switch>
            </PreferenceItem>
          </div>
        </div>
        <div id="about" className=" w-full mb-6">
          <p className="relative left-2 mb-2 text-sm text-monstera-800">
            About
          </p>
          <div className="divide-y divide-slate-200 rounded-2xl bg-white">
            <PreferenceItem label={"Help and Feedback"}>
              <ChevronRightIcon
                boxSize="1.5rem"
                focusable={true}
                color="black"
              />
            </PreferenceItem>
            <PreferenceItem label={"Privacy"}>
              {" "}
              <ChevronRightIcon
                boxSize="1.5rem"
                focusable={true}
                color="black"
              />
            </PreferenceItem>
            <PreferenceItem label={"Terms and Conditions"}>
              {" "}
              <ChevronRightIcon
                boxSize="1.5rem"
                focusable={true}
                color="black"
              />
            </PreferenceItem>
            <PreferenceItem label={"Changelog"}>
              {" "}
              <ChevronRightIcon
                boxSize="1.5rem"
                focusable={true}
                color="black"
              />
            </PreferenceItem>
          </div>
        </div>
        <div id="logout" className=" w-full">
          <div className="divide-y divide-slate-200 rounded-2xl bg-white">
            <PreferenceItem label={"Log Out"} children={undefined} />
          </div>
        </div>
      </div>
    </div>
  );
}
