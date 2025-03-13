import { useState } from "react";
import { Home, Users, Clock, FileText, GraduationCap, Repeat,ArrowRight,ArrowLeft } from "lucide-react";
import "./Dashboard.css";

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
        <div key={label} className="sidebar-item">
          <Icon className="icon"/>
         
          {isOpen && <span>{label}</span>}
        </div>
      ))}
    </nav>
  </div>
);

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content">
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="toggle-btn">
            {isSidebarOpen ? <ArrowLeft /> : <ArrowRight />}
        </button>
        <div className="grid-container">
          {[
            { label: "Enrollment", icon: Users },
            { label: "Attendance", icon: Clock },
            { label: "Performance", icon: FileText },
            { label: "Final result", icon: GraduationCap },
            { label: "Transfer", icon: Repeat }
          ].map(({ label, icon: Icon }) => (
            <div key={label} className="card">
              <Icon className="card-icon" size={35} />
              <div className="divider"></div>
              <span className="card-label">{label}</span>
              <div className="divider"></div>
              <div className="bottom_bt">
              <ArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;