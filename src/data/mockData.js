// Mock data for Certification-Hub
export const mockUsers = [
    { id: 1, name: 'Sakya Agrawal', email: 'sakya@certihub.com', role: 'user', avatar: null, joinDate: '2024-06-15', totalCerts: 8, activeCerts: 5 },
    { id: 2, name: 'Priya Sharma', email: 'priya@certihub.com', role: 'user', avatar: null, joinDate: '2024-03-10', totalCerts: 12, activeCerts: 9 },
    { id: 3, name: 'Rahul Verma', email: 'rahul@certihub.com', role: 'user', avatar: null, joinDate: '2024-08-22', totalCerts: 5, activeCerts: 3 },
    { id: 4, name: 'Admin User', email: 'admin@certihub.com', role: 'admin', avatar: null, joinDate: '2024-01-01', totalCerts: 0, activeCerts: 0 },
];

export const certCategories = ['Cloud Computing', 'Cybersecurity', 'Data Science', 'DevOps', 'Project Management', 'Web Development', 'AI/ML', 'Networking'];

export const mockCertifications = [
    { id: 1, userId: 1, name: 'AWS Solutions Architect – Associate', authority: 'Amazon Web Services', credentialId: 'AWS-SAA-2024-78901', category: 'Cloud Computing', issueDate: '2024-08-15', expiryDate: '2027-08-15', status: 'active', verificationUrl: 'https://aws.amazon.com/verify/SAA78901', document: 'aws-saa-cert.pdf', renewalStatus: null },
    { id: 2, userId: 1, name: 'Google Cloud Professional Data Engineer', authority: 'Google Cloud', credentialId: 'GCP-DE-2024-45623', category: 'Data Science', issueDate: '2024-05-20', expiryDate: '2026-05-20', status: 'active', verificationUrl: 'https://cloud.google.com/verify/DE45623', document: 'gcp-de-cert.pdf', renewalStatus: null },
    { id: 3, userId: 1, name: 'Certified Kubernetes Administrator', authority: 'CNCF', credentialId: 'CKA-2023-89012', category: 'DevOps', issueDate: '2023-11-10', expiryDate: '2026-11-10', status: 'active', verificationUrl: 'https://cncf.io/verify/CKA89012', document: 'cka-cert.pdf', renewalStatus: null },
    { id: 4, userId: 1, name: 'CompTIA Security+', authority: 'CompTIA', credentialId: 'CSEC-2023-34567', category: 'Cybersecurity', issueDate: '2023-03-01', expiryDate: '2026-03-01', status: 'expiring', verificationUrl: 'https://comptia.org/verify/34567', document: 'comptia-sec.pdf', renewalStatus: 'pending' },
    { id: 5, userId: 1, name: 'PMP - Project Management Professional', authority: 'PMI', credentialId: 'PMP-2022-56789', category: 'Project Management', issueDate: '2022-07-15', expiryDate: '2025-07-15', status: 'expiring', verificationUrl: 'https://pmi.org/verify/56789', document: 'pmp-cert.pdf', renewalStatus: null },
    { id: 6, userId: 1, name: 'Cisco CCNA', authority: 'Cisco', credentialId: 'CCNA-2021-12345', category: 'Networking', issueDate: '2021-09-20', expiryDate: '2024-09-20', status: 'expired', verificationUrl: 'https://cisco.com/verify/12345', document: 'ccna-cert.pdf', renewalStatus: null },
    { id: 7, userId: 1, name: 'TensorFlow Developer Certificate', authority: 'Google', credentialId: 'TF-2024-67890', category: 'AI/ML', issueDate: '2024-01-10', expiryDate: '2027-01-10', status: 'active', verificationUrl: 'https://tensorflow.org/verify/67890', document: 'tf-cert.pdf', renewalStatus: null },
    { id: 8, userId: 1, name: 'Meta Front-End Developer', authority: 'Meta (Coursera)', credentialId: 'META-FE-2024-11223', category: 'Web Development', issueDate: '2024-10-05', expiryDate: '2027-10-05', status: 'active', verificationUrl: 'https://coursera.org/verify/11223', document: 'meta-fe-cert.pdf', renewalStatus: null },
    { id: 9, userId: 2, name: 'Azure Administrator Associate', authority: 'Microsoft', credentialId: 'AZ-104-2024-99887', category: 'Cloud Computing', issueDate: '2024-04-12', expiryDate: '2026-04-12', status: 'active', verificationUrl: 'https://learn.microsoft.com/verify/99887', document: 'az104-cert.pdf', renewalStatus: null },
    { id: 10, userId: 2, name: 'CISSP', authority: 'ISC2', credentialId: 'CISSP-2023-55443', category: 'Cybersecurity', issueDate: '2023-06-01', expiryDate: '2026-06-01', status: 'active', verificationUrl: 'https://isc2.org/verify/55443', document: 'cissp-cert.pdf', renewalStatus: null },
];

export const mockRenewalRequests = [
    { id: 1, certId: 4, userId: 1, userName: 'Sakya Agrawal', certName: 'CompTIA Security+', submittedDate: '2026-01-15', status: 'pending', document: 'comptia-renewal.pdf', notes: 'Completed 50 CEUs. Requesting renewal.' },
    { id: 2, certId: 6, userId: 1, userName: 'Sakya Agrawal', certName: 'Cisco CCNA', submittedDate: '2025-12-20', status: 'pending', document: 'ccna-renewal.pdf', notes: 'Passed recertification exam on Dec 18.' },
    { id: 3, certId: 9, userId: 2, userName: 'Priya Sharma', certName: 'Azure Administrator Associate', submittedDate: '2026-02-01', status: 'approved', document: 'az104-renewal.pdf', notes: 'Renewal assessment passed.' },
];

export const mockNotifications = [
    { id: 1, userId: 1, type: 'expiry', title: 'CompTIA Security+ Expiring Soon', message: 'Your CompTIA Security+ certification expires on March 1, 2026. Renew now to maintain your credential.', date: '2026-02-20', read: false },
    { id: 2, userId: 1, type: 'renewal', title: 'Renewal Request Submitted', message: 'Your renewal request for CompTIA Security+ has been submitted and is pending admin approval.', date: '2026-01-15', read: true },
    { id: 3, userId: 1, type: 'expiry', title: 'PMP Certification Expiring', message: 'Your PMP certification expires on July 15, 2025. You are past the expiry date — renew immediately.', date: '2025-06-15', read: true },
    { id: 4, userId: 1, type: 'system', title: 'Welcome to Certification-Hub!', message: 'Start tracking your professional certifications. Add your first credential to get started.', date: '2024-06-15', read: true },
    { id: 5, userId: 1, type: 'renewal', title: 'CCNA Renewal Pending', message: 'Your renewal request for Cisco CCNA is awaiting admin review.', date: '2025-12-20', read: false },
];

export const mockActivityLogs = [
    { id: 1, userId: 1, userName: 'Sakya Agrawal', action: 'Added certification', detail: 'Meta Front-End Developer', timestamp: '2024-10-05 14:23:00' },
    { id: 2, userId: 1, userName: 'Sakya Agrawal', action: 'Submitted renewal', detail: 'CompTIA Security+', timestamp: '2026-01-15 09:45:00' },
    { id: 3, userId: 2, userName: 'Priya Sharma', action: 'Added certification', detail: 'Azure Administrator Associate', timestamp: '2024-04-12 11:30:00' },
    { id: 4, userId: 2, userName: 'Priya Sharma', action: 'Submitted renewal', detail: 'Azure Administrator Associate', timestamp: '2026-02-01 16:00:00' },
    { id: 5, userId: 1, userName: 'Sakya Agrawal', action: 'Uploaded document', detail: 'ccna-renewal.pdf', timestamp: '2025-12-20 10:15:00' },
    { id: 6, userId: 3, userName: 'Rahul Verma', action: 'Added certification', detail: 'AWS Cloud Practitioner', timestamp: '2024-09-10 08:00:00' },
    { id: 7, userId: 1, userName: 'Sakya Agrawal', action: 'Updated profile', detail: 'Changed notification preferences', timestamp: '2026-02-18 13:00:00' },
    { id: 8, userId: 2, userName: 'Priya Sharma', action: 'Downloaded certificate', detail: 'CISSP', timestamp: '2026-02-22 09:30:00' },
];

export const monthlyStats = [
    { month: 'Jul', certifications: 12, renewals: 2, users: 45 },
    { month: 'Aug', certifications: 18, renewals: 5, users: 52 },
    { month: 'Sep', certifications: 15, renewals: 3, users: 58 },
    { month: 'Oct', certifications: 22, renewals: 7, users: 67 },
    { month: 'Nov', certifications: 19, renewals: 4, users: 73 },
    { month: 'Dec', certifications: 25, renewals: 8, users: 81 },
    { month: 'Jan', certifications: 28, renewals: 6, users: 89 },
    { month: 'Feb', certifications: 20, renewals: 9, users: 95 },
];

export const categoryDistribution = [
    { name: 'Cloud Computing', value: 35, color: '#6366f1' },
    { name: 'Cybersecurity', value: 22, color: '#ef4444' },
    { name: 'Data Science', value: 18, color: '#10b981' },
    { name: 'DevOps', value: 15, color: '#f59e0b' },
    { name: 'Project Mgmt', value: 12, color: '#8b5cf6' },
    { name: 'Web Dev', value: 10, color: '#06b6d4' },
    { name: 'AI/ML', value: 8, color: '#ec4899' },
    { name: 'Networking', value: 5, color: '#14b8a6' },
];
