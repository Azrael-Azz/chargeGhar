import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import StatsCard from '../StatsCard';
import { useDashboardData } from '../../contexts/DashboardDataContext';
import styles from './StationsActiveCard.module.css';

interface Station {
  id: string;
  status: string;
}

const StationsActiveCard: React.FC = () => {
  const { dashboardData, loading, error } = useDashboardData();

  if (loading) {
    return <StatsCard icon={<FiCheckCircle />} title="Stations Active" value="Loading..." />;
  }

  if (error) {
    return <StatsCard icon={<FiCheckCircle />} title="Stations Active" value="Error" />;
  }

  const activeStations = dashboardData?.stations?.results?.filter((station: Station) => station.status === 'ONLINE') || [];

  return (
    <StatsCard icon={<FiCheckCircle />} title="Stations Active" value={activeStations.length} />
  );
};

export default StationsActiveCard;