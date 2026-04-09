import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaLanguage,
    FaFileAlt,
  FaSuitcaseRolling,
} from "react-icons/fa";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-sm hidden md:flex md:flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">
          Mentor<span className="text-blue-600">Pro</span>
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/dashboard" end className={linkClass}>
          <FaHome />
          <span>Tableau de bord</span>
        </NavLink>

        <NavLink to="/dashboard/profile" className={linkClass}>
          <FaUser />
          <span>Mon profil</span>
        </NavLink>

        <NavLink to="/dashboard/experiences" className={linkClass}>
          <FaBriefcase />
          <span>Expériences</span>
        </NavLink>

        <NavLink to="/dashboard/formations" className={linkClass}>
          <FaGraduationCap />
          <span>Formations</span>
        </NavLink>

        <NavLink to="/dashboard/skills" className={linkClass}>
          <FaTools />
          <span>Compétences</span>
        </NavLink>

        <NavLink to="/dashboard/languages" className={linkClass}>
          <FaLanguage />
          <span>Langues</span>
        </NavLink>

        <NavLink to="/dashboard/offers" className={linkClass}>
          <FaSuitcaseRolling />
          <span>Offres d'emploi</span>
        </NavLink>

        <NavLink to="/dashboard/documents" className={linkClass}>
          <FaFileAlt />
          <span>Documents IA</span>
        </NavLink>
      </nav>
    </aside>
  );      
}

export default Sidebar;