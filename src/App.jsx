import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import CustomCursor from './components/ui/CustomCursor';
import LoadingScreen from './components/ui/LoadingScreen';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import SettingsPage from './pages/SettingsPage';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import CertificationManager from './pages/user/CertificationManager';
import ExpiryTracker from './pages/user/ExpiryTracker';
import RenewalCenter from './pages/user/RenewalCenter';
import CertificateVault from './pages/user/CertificateVault';
import UserNotifications from './pages/user/UserNotifications';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCertifications from './pages/admin/AdminCertifications';
import RenewalApprovals from './pages/admin/RenewalApprovals';
import UserManagement from './pages/admin/UserManagement';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import ActivityLogs from './pages/admin/ActivityLogs';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <LoadingScreen />;

    return (
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <CustomCursor />
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            style: {
                                background: 'rgba(15,23,42,0.9)',
                                color: '#fff',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(147,51,234,0.2)',
                                borderRadius: '12px',
                                fontSize: '14px',
                            },
                        }}
                    />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />

                        {/* User Routes */}
                        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                            <Route path="/dashboard" element={<UserDashboard />} />
                            <Route path="/certifications" element={<CertificationManager />} />
                            <Route path="/expiry-tracker" element={<ExpiryTracker />} />
                            <Route path="/renewals" element={<RenewalCenter />} />
                            <Route path="/vault" element={<CertificateVault />} />
                            <Route path="/notifications" element={<UserNotifications />} />
                            <Route path="/settings" element={<SettingsPage />} />
                        </Route>

                        {/* Admin Routes */}
                        <Route element={<ProtectedRoute requiredRole="admin"><MainLayout /></ProtectedRoute>}>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/certifications" element={<AdminCertifications />} />
                            <Route path="/admin/renewals" element={<RenewalApprovals />} />
                            <Route path="/admin/users" element={<UserManagement />} />
                            <Route path="/admin/analytics" element={<AnalyticsPage />} />
                            <Route path="/admin/logs" element={<ActivityLogs />} />
                            <Route path="/admin/settings" element={<AdminSettings />} />
                        </Route>

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}
