import {
  faBell,
  faAdd,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useSound from "use-sound";
import badInternet from "../../assets/badinternet.mp3";
import bell from "../../assets/bell.mp3";
import pianoAudio from "../../assets/piano.mp3";
import fluteAudio from "../../assets/flute.mp3";
import { SettingType, useSetting } from "../../context/SettingContext";
import clsx from "clsx";
import Button from "../Button";
import Input from "../Input";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: any;
};

export default function Modal({ isOpen, setIsOpen }: ModalProps) {
  const { settings, setSettings } = useSetting();
  const [audioVolume, setAudioVolume] = useState<number>(settings.audioVolume);
  const soundOptions: any = { volume: audioVolume };
  const [badInternetSound] = useSound(badInternet, soundOptions);
  const [bellSound] = useSound(bell, soundOptions);
  const [pianoSound] = useSound(pianoAudio, soundOptions);
  const [fluteSound] = useSound(fluteAudio, soundOptions);
  const [formState, setFormState] = useState<SettingType>(settings);

  function closeModal() {
    setIsOpen(false);
  }

  function handleChange(e: any) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handleAlarmChange(alarmSound: alarmSoundType) {
    setFormState({ ...formState, alarm: alarmSound.name });
    alarmSound.sound();
  }

  function handleVolumeChange(e: any) {
    handleChange(e);
    setAudioVolume(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setSettings(formState);
    closeModal();
  }

  type alarmSoundType = {
    name: string;
    icon: IconDefinition;
    sound: any;
  };

  const alarmSounds: alarmSoundType[] = [
    { name: "Bell", icon: faBell, sound: bellSound },
    { name: "Flute", icon: faAdd, sound: fluteSound },
    { name: "Piano", icon: faAdd, sound: pianoSound },
    { name: "Lance", icon: faBell, sound: badInternetSound },
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  Setting
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-center text-gray-500">
                    Time <span>(minutes)</span>
                  </p>
                </div>

                <div className="mt-2">
                  <div className="columns-3">
                    <div>Pomodoro</div>
                    <div>Short Break</div>
                    <div>Long Break</div>
                  </div>
                  <div className="columns-3">
                    <div>
                      <Input
                        name="pomodoro"
                        type="number"
                        value={formState.pomodoro}
                        onChange={handleChange}
                      />
                    </div>
                    <Input
                      name="shortBreak"
                      type="number"
                      value={formState.shortBreak}
                      onChange={handleChange}
                    />
                    <Input
                      name="longBreak"
                      type="number"
                      value={formState.longBreak}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-gray-500 text-center">Alarm Volume</p>
                  <input
                    name="audioVolume"
                    min="0"
                    step="0.10"
                    max="1"
                    value={formState.audioVolume}
                    onInput={handleVolumeChange}
                    onChange={handleVolumeChange}
                    type="range"
                    className="w-full"
                  />
                </div>

                <div className="mt-2">
                  <p className="text-gray-500 text-center">Alarm Sound</p>
                  <div className="columns-4 text-center">
                    {alarmSounds.map((alarmSound) => {
                      return <div>{alarmSound.name}</div>;
                    })}
                  </div>
                  <div className="columns-4 text-center">
                    {alarmSounds.map((alarmSound) => {
                      return (
                        <div
                          onClick={() => handleAlarmChange(alarmSound)}
                          className={clsx(
                            "p-1 rounded-sm bg-gray-300 w-full cursor-pointer",
                            {
                              ["border-2 border-blue-300"]:
                                alarmSound.name === formState.alarm,
                            }
                          )}
                        >
                          <FontAwesomeIcon icon={alarmSound.icon} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <Button onClick={handleSubmit} name="Save" wide={true} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
