import "../../styles/DashboardCard.css";

function DashboardCard({ title, value, icon, color }) {
  return (
    <div
      className="dashboard-card"
      style={{ borderTop: `5px solid ${color}` }}
    >
      <div className="card-header">
        <h4>{title}</h4>

        <div className="card-icon">
          {icon}
        </div>
      </div>

      <h2 className="card-value">
        {value}
      </h2>
    </div>
  );
}

export default DashboardCard;