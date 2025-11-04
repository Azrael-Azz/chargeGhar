import React from 'react';
import { FiUsers } from 'react-icons/fi';
import StatsCard from '../StatsCard';
import { useDashboardData } from '../../contexts/DashboardDataContext';
import styles from './AdminUsersCard.module.css';

const AdminUsersCard: React.FC = () => {
  const { dashboardData, loading, error } = useDashboardData();

  if (loading) {
    return <StatsCard icon={<FiUsers />} title="Admin Users" value="Loading..." />;
  }

  if (error) {
    return <StatsCard icon={<FiUsers />} title="Admin Users" value="Error" />;
  }

  return (
    <StatsCard icon={<FiUsers />} title="Admin Users" value={dashboardData?.profiles?.length || 0} />
  );
};

export default AdminUsersCard;