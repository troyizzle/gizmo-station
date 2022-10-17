import Setting from "../Setting";
import Theme from "../Theme";
import WidgetMenu from "../WidgetMenu";

export default function Navbar() {
  return (
    <nav className="flex justify-end ml-2">
      <div className="grid md:flex gap-2">
        <Setting />
        <WidgetMenu />
        <Theme />
      </div>
    </nav>
  );
}
