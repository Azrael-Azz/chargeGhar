import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import instance from '../lib/axios';

interface DashboardDataContextType {
  dashboardData: any;
  profilesData: any;
  stationsData: any;
  packagesData: any;
  loading: boolean;
  error: string | null;
  refetchDashboard: () => void;
  refetchProfiles: () => void;
  refetchStations: () => void;
  refetchPackages: () => void;
}

const DashboardDataContext = createContext<DashboardDataContextType | undefined>(undefined);

export const DashboardDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [profilesData, setProfilesData] = useState<any>(null);
  const [stationsData, setStationsData] = useState<any>(null);
  const [packagesData, setPackagesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      const response = await instance.get('/api/admin/dashboard');
      if (response.data.success) {
        setDashboardData(response.data.data);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Error fetching dashboard data');
    }
  };

  const fetchProfilesData = async () => {
    try {
      const response = await instance.get('/api/admin/profiles');
      if (response.data.success) {
        setProfilesData(response.data.data);
      } else {
        setError('Failed to fetch profiles data');
      }
    } catch (err) {
      console.error('Error fetching profiles data:', err);
      setError('Error fetching profiles data');
    }
  };

  const fetchStationsData = async () => {
    try {
      const response = await instance.get('/api/admin/stations');
      if (response.data.success) {
        setStationsData(response.data.data);
      } else {
        setError('Failed to fetch stations data');
      }
    } catch (err) {
      console.error('Error fetching stations data:', err);
      setError('Error fetching stations data');
    }
  };

  const fetchPackagesData = async () => {
    try {
      const response = await instance.get('/api/payments/packages');
      if (response.data.success) {
        setPackagesData(response.data.data);
      } else {
        setError('Failed to fetch packages data');
      }
    } catch (err) {
      console.error('Error fetching packages data:', err);
      setError('Error fetching packages data');
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([fetchDashboardData(), fetchProfilesData(), fetchStationsData(), fetchPackagesData()]);
    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const value = {
    dashboardData,
    profilesData,
    stationsData,
    packagesData,
    loading,
    error,
    refetchDashboard: fetchDashboardData,
    refetchProfiles: fetchProfilesData,
    refetchStations: fetchStationsData,
    refetchPackages: fetchPackagesData,
  };

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
};

export const useDashboardData = () => {
  const context = useContext(DashboardDataContext);
  if (context === undefined) {
    throw new Error('useDashboardData must be used within a DashboardDataProvider');
  }
  return context;
};
