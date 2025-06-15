import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateListing from './pages/CreateListing';
import MyListings from './pages/MyListings';
import EditListing from './pages/EditListing';
import AccountSettings from './pages/AccountSettings';
import AgentProfile from './pages/AgentProfile';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <FormProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create-listing" element={<CreateListing />} />
                <Route path="/my-listings" element={<MyListings />} />
                <Route path="/edit-listing/:id" element={<EditListing />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/agent-profile" element={<AgentProfile />} />
              </Routes>
            </Layout>
          </FormProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;