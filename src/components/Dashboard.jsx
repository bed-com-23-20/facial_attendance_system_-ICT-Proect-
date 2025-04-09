import { useState } from "react";
import { Home, Users, Clock, FileText, GraduationCap, Repeat,ArrowRight,ArrowLeft } from "lucide-react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => (
  <div className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
    <div className="sidebar-item">
      <Home className="icon" />
      {isOpen && <span>Home</span>}
    </div>
    <nav>
      {[
        { label: "Enrollment", icon: Users },
        { label: "Attendance", icon: Clock },
        { label: "Performance", icon: FileText },
        { label: "Final result", icon: GraduationCap },
        { label: "Transfer", icon: Repeat }
      ].map(({ label, icon: Icon }) => (
        <a href={label}>
        <div key={label} className="sidebar-item">
          <Icon className="icon"/>
         
          {isOpen && <span>{label}</span>}
        </div>
        </a>
      ))}
    </nav>
  </div>
);

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const handleNavigation = (path) => {
    window.open(path, '_blank');
  };

  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content">
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="toggle-btn">
            {isSidebarOpen ? <ArrowLeft /> : <ArrowRight />}
        </button>
        <div className="grid-container">
          {[
            { label: "Enrollment", icon: Users, path: "/enrollment" },
            { label: "Attendance", icon: Clock, path: "/attendance" },
            { label: "Performance", icon: FileText, path: "/performance" },
            { label: "Final result", icon: GraduationCap, path: "/final-result" },
            { label: "Transfer", icon: Repeat, path: "/transfer" }
          ].map(({ label, icon: Icon, path }) => (
            <div key={label} className="card">
              <Icon className="card-icon" size={35} />
              <div className="divider"></div>
              <span className="card-label">{label}</span>
              <div className="divider"></div>
              <Link className="link-to" to={label}> Go to</Link>
            </div>
          ))}
        </div>
      </div>
      </div>
  );
};

export default Dashboard;
