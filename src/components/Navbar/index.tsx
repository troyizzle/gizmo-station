import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AVAILABLE_THEMES, useTheme } from "../../context/ThemeContext";
import Setting from "../Setting";

type ThemeMenuLinkProps = {
  theme: string;
};

function themeWithoutExt(theme: string): string {
  return theme.replace(/\.[^/.]+$/, "");
}

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
            {themeWithoutExt(theme)}
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

export default function Navbar() {
  return (
    <nav className="flex justify-end ml-2">
      <div className="grid md:flex gap-2">
        <Setting />
      </div>
    </nav>
  );
}
