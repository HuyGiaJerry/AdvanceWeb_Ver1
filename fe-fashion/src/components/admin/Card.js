import React from 'react';
import '../../assets/styles/Card.scss';

const Card = ({ title, value, icon, color, percentage }) => {
  return (
    <div className="dashboard-card" style={{ '--card-color': color }}>
      <div className="card-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-value">{value}</p>
        {percentage && (
          <p className={`card-trend ${percentage > 0 ? 'up' : 'down'}`}>
            {percentage > 0 ? '↑' : '↓'} {Math.abs(percentage)}% so với tháng trước
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;