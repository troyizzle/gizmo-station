import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AVAILABLE_THEMES, useTheme } from "../../context/ThemeContext";

type ThemeMenuLinkProps = {
  theme: string;
};

function ThemeMenuLink({ theme }: ThemeMenuLinkProps) {
  const { setTheme } = useTheme();
  return (
    <div className="px-1 py-1">
      <Menu.Item key={theme}>
        {({ active }) => (
          <button
            onClick={() => setTheme(theme)}
            className={`${
              active ? "bg-violet-500 text-white" : "text-gray-900"
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            {theme}
          </button>
        )}
      </Menu.Item>
    </div>
  );
}

const menuButtonStyling = "rounded-full bg-blue-300 p-2";

function ThemeMenu() {
  return (
    <Menu as="div">
      <div>
        <Menu.Button className={menuButtonStyling}>Themes</Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {AVAILABLE_THEMES.map((theme) => {
            return <ThemeMenuLink key={theme} theme={theme} />;
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function WidgetMenu() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div>
        <button type="button" className={menuButtonStyling} onClick={openModal}>
          Widget
        </button>
      </div>
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default function Navbar() {
  return (
    <nav className="flex justify-end">
      <WidgetMenu />
      <ThemeMenu />
    </nav>
  );
}
