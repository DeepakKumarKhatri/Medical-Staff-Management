import React, { useState, createContext, useContext } from "react";
import {
  ChevronFirst,
  ChevronLast,
  Accessibility,
  ClipboardPlus,
  User,
  ChevronDown,
  ChevronUp,
  Users,
  GraduationCap,
  ShieldCheck,
  MessageSquareText,
  PlusCircleIcon,
} from "lucide-react";
import logo from "../../assets/images/logo/logo.png";
import profile from "../../assets/images/logo/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import PositionedMenu from "../Dropdown/Dropdown";
import { useEscapeToggle } from "../../hooks/useEscapeToggle";

export const SidebarContext = createContext();

export function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded((curr) => !curr);
  };

  useEscapeToggle(toggleExpanded);

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
              onClick={toggleExpanded}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? (
                <ChevronFirst className="bg-gray-300 rounded-lg hover:bg-gray-400" />
              ) : (
                <ChevronLast className="bg-gray-300 rounded-lg hover:bg-gray-400" />
              )}
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
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Medico</h4>
                <span className="text-xs text-gray-600">medico@gmail.com</span>
              </div>
              <span className="bg-gray-300 p-2 rounded-lg hover:bg-gray-400">
                <PositionedMenu comingFrom={'clinic_manager'} />
              </span>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, to, alert, children }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();
  const navigate = useNavigate();
  const active = location.pathname === to;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (children) {
      setIsOpen(!isOpen);
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <li>
      <div className="relative">
        <div
          className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
            active
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }`}
          onClick={handleClick}
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

          {children && (
            <span className="ml-auto">
              {isOpen ? (
                <ChevronUp size={16} className="ml-2" />
              ) : (
                <ChevronDown size={16} className="ml-2" />
              )}
            </span>
          )}
        </div>
        {isOpen && children && (
          <ul
            className={`ml-4 transition-all ${
              isOpen ? "max-h-full" : "max-h-0 overflow-hidden"
            }`}
          >
            {children}
          </ul>
        )}
      </div>
    </li>
  );
}

const ClinicManagerSidebar = ({ children }) => {
  return (
    <Sidebar>
      <hr className="my-3" />

      <SidebarItem icon={<Users size={20} />} text="Manage Users">
        <SidebarItem
          icon={<GraduationCap size={16} />}
          text="Doctors"
          to="/clinic_manager/doctors"
        />
        <SidebarItem
          icon={<Accessibility size={16} />}
          text="Patients"
          to="/clinic_manager/patients"
        />
        <SidebarItem
          icon={<ShieldCheck size={16} />}
          text="Clinic Managers"
          to="/clinic_manager/managers"
        />
        <SidebarItem
          icon={<PlusCircleIcon size={16} />}
          text="Add New"
          to="/clinic_manager/add_user"
        />
      </SidebarItem>

      <SidebarItem icon={<MessageSquareText size={20} />} text="Feedbacks">
        <SidebarItem
          icon={<GraduationCap size={16} />}
          text="Doctors"
          to="/clinic_manager/feedbacks_doctor"
        />
        <SidebarItem
          icon={<Accessibility size={16} />}
          text="Patients"
          to="/clinic_manager/feedbacks_patients"
        />
      </SidebarItem>

      <SidebarItem
        icon={<ClipboardPlus size={20} />}
        text="Reports"
        to="/clinic_manager/reports"
      />
      <SidebarItem
        icon={<User size={20} />}
        text="Profile"
        to="/clinic_manager/profile"
      />
    </Sidebar>
  );
};

export default ClinicManagerSidebar;
