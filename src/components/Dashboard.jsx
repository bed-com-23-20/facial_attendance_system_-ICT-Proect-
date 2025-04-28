import { useState } from "react";
import { Home, Users, Clock, FileText, GraduationCap, Repeat, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => (
  <div className={`bg-gray-800 text-white h-screen p-4 ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
    <div className="flex items-center space-x-2 mb-6 border-b border-gray-700 pb-2">
      {/* <Home className="w-6 h-6" /> */}
      {isOpen && <span className="text-lg font-semibold text-blue-300">FRAS Dashboard</span>}
    </div>
    <nav>
      {[
        { label: "Registration", icon: Users, path: "/enrollment" },
        { label: "Enrollments", icon: FileText, path: "/enrollmentPage" },
        { label: "Attendance", icon: Clock, path: "/performance" },
        { label: "Reports", icon: GraduationCap, path: "/final-result" },
        { label: "Transfer", icon: Repeat, path: "/transfer" }
      ].map(({ label, icon: Icon, path }) => (
        <a href={path} key={label} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors pb-4">
          <Icon className="w-6 h-6 " />
          {isOpen && <span className="w-10">{label}</span>}
        </a>
      ))}
    </nav>
  </div>
);

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-gray-800 text-white rounded-md m-4 self-start hover:bg-gray-700 transition-colors"
        >
          {isSidebarOpen ? <ArrowLeft /> : <ArrowRight />}
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {[
            { label: "Registration", icon: Users, path: "/enrollment" },
            { label: "Enrollments", icon: FileText, path: "/enrollmentPage" },
            { label: "Attendance", icon: Clock, path: "/performance" },
            { label: "Reports", icon: GraduationCap, path: "/final-result" },
            { label: "Transfer", icon: Repeat, path: "/transfer" }
          ].map(({ label, icon: Icon, path }) => (
            <div
              key={label}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              <Icon className="text-blue-500 mb-4" size={35} />
              <div className="w-full h-px bg-gray-200 mb-4"></div>
              <span className="text-lg font-semibold mb-4">{label}</span>
              <div className="w-full h-px bg-gray-200 mb-4"></div>
              <Link
                className="text-blue-500 font-medium hover:underline"
                to={path}
              >
                Go to
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
