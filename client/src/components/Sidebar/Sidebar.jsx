import {
  ChevronFirst,
  ChevronLast,
  BriefcaseMedical,
  ClipboardPlus,
  HandHelping,
  User,
} from "lucide-react";
import logo from "../../assets/images/logo/logo.png";
import profile from "../../assets/images/logo/logo.png";
import { createContext, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PositionedMenu from "../Dropdown/Dropdown";

const SidebarContext = createContext();

export function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={logo}
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt="Medico App Logo"
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <img
              src={profile}
              className="w-10 h-10 rounded-md"
              alt="User Profile"
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              } `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Medico</h4>
                <span className="text-xs text-gray-600">medico@gmail.com</span>
              </div>
              <PositionedMenu/>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, to, alert }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )}

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}

const SidebarCaller = ({ children }) => {
  return (
    <Sidebar>
      <SidebarItem
        icon={<BriefcaseMedical size={20} />}
        text="My Treatments"
        to="/patient/home"
      />
      <SidebarItem
        icon={<ClipboardPlus size={20} />}
        text="Instructions"
        to="/patient/instructions"
      />
      <hr className="my-3" />
      <SidebarItem
        icon={<HandHelping size={20} />}
        text="Help"
        to="/patient/help"
      />
      <SidebarItem
        icon={<User size={20} />}
        text="Profile"
        to="/patient/profile"
      />
    </Sidebar>
  );
};

export default SidebarCaller;
