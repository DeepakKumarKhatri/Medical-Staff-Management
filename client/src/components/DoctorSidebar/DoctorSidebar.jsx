import React, { useState, createContext, useContext, useEffect } from "react";
import {
  ChevronFirst,
  ChevronLast,
  Accessibility,
  PlusCircleIcon,
  ClipboardPlus,
  User,
  HandHelping,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";
import logo from "../../assets/images/logo/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import PositionedMenu from "../Dropdown/Dropdown";
import { useEscapeToggle } from "../../hooks/useEscapeToggle";
import { useSelector } from "react-redux";

const SidebarContext = createContext();

export function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [id, setID] = useState("");
  const currentUser = useSelector((state) => state.auth.user);
  console.log(currentUser);
  useEffect(() => {
    if (currentUser) {
      setProfileImage(currentUser?.user?.user?.avatar || currentUser?.avatar);
      setFirstName(
        currentUser?.user?.user?.firstName || currentUser?.firstName
      );
      setID(currentUser?.userId);
    }
  }, [currentUser]);

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
              src={profileImage}
              className="w-10 h-10 rounded-md"
              alt="User Profile"
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-black">{firstName}</h4>
                <span className="text-xs text-gray-600">{id}</span>
              </div>
              <span className="bg-gray-300 p-2 rounded-lg hover:bg-gray-400">
                <PositionedMenu comingFrom={"doctor"} />
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

const DoctorSidebarCaller = ({ children }) => {
  return (
    <Sidebar>
      <hr className="my-3" />

      <SidebarItem icon={<Accessibility size={20} />} text="My Patients">
        <SidebarItem
          icon={<ClipboardPlus size={16} />}
          text="Medical Records"
          to="/doctor/patient-records"
        />
        <SidebarItem
          icon={<PlusCircleIcon size={16} />}
          text="Add a Patient"
          to="/doctor/add-patient"
        />
        <SidebarItem
          icon={<Users size={16} />}
          text="All Patients"
          to="/doctor/all-patients"
        />
      </SidebarItem>

      <SidebarItem
        icon={<User size={20} />}
        text="Profile"
        to="/doctor/profile"
      />
      <SidebarItem
        icon={<HandHelping size={20} />}
        text="Help"
        to="/doctor/help"
      />
    </Sidebar>
  );
};

export default DoctorSidebarCaller;
