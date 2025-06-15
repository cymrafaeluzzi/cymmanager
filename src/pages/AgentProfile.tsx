import React, { useState } from 'react';
import { Save, Upload, Building2, User, Globe, Phone, Mail, MapPin, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const AgentProfile: React.FC = () => {
  const { t } = useLanguage();
  const { user, updateUser, updateCompany } = useAuth();
  const [activeTab, setActiveTab] = useState('agent');

  const [agentData, setAgentData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: 'Agente de bienes raíces con más de 10 años de experiencia en el mercado de Puerto Rico. Especializada en propiedades residenciales y comerciales.',
    specialties: ['Residencial', 'Comercial', 'Lujo'],
    languages: ['Español', 'Inglés'],
    experience: '10+ años',
    avatar: user?.avatar || '',
  });

  const [companyData, setCompanyData] = useState({
    name: user?.company?.name || '',
    license: user?.company?.license || '',
    address: user?.company?.address || '',
    phone: user?.company?.phone || '',
    email: user?.company?.email || '',
    website: user?.company?.website || '',
    logo: user?.company?.logo || '',
    description: 'Empresa líder en bienes raíces en Puerto Rico con más de 20 años de experiencia en el mercado.',
  });

  const tabs = [
    { id: 'agent', name: t('profile.tabs.agent'), icon: User },
    { id: 'company', name: t('profile.tabs.company'), icon: Building2 },
  ];

  const handleAgentChange = (field: string, value: any) => {
    setAgentData(prev => ({ ...prev, [field]: value }));
  };

  const handleCompanyChange = (field: string, value: any) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAgent = () => {
    updateUser({
      name: agentData.name,
      email: agentData.email,
      phone: agentData.phone,
      avatar: agentData.avatar,
    });
    alert(t('profile.saved'));
  };

  const handleSaveCompany = () => {
    updateCompany({
      name: companyData.name,
      license: companyData.license,
      address: companyData.address,
      phone: companyData.phone,
      email: companyData.email,
      website: companyData.website,
      logo: companyData.logo,
    });
    alert(t('profile.saved'));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('profile.title')}</h1>
        <p className="text-gray-600 mt-1">{t('profile.subtitle')}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'agent' && (
            <div className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    className="h-24 w-24 rounded-full object-cover"
                    src={agentData.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
                    alt={agentData.name}
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{t('profile.agent.photo')}</h3>
                  <p className="text-sm text-gray-500">{t('profile.agent.photoDesc')}</p>
                  <button className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Upload className="h-4 w-4 mr-2" />
                    {t('profile.agent.uploadPhoto')}
                  </button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.agent.name')}
                  </label>
                  <input
                    type="text"
                    value={agentData.name}
                    onChange={(e) => handleAgentChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.agent.email')}
                  </label>
                  <input
                    type="email"
                    value={agentData.email}
                    onChange={(e) => handleAgentChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.agent.phone')}
                  </label>
                  <input
                    type="tel"
                    value={agentData.phone}
                    onChange={(e) => handleAgentChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.agent.experience')}
                  </label>
                  <input
                    type="text"
                    value={agentData.experience}
                    onChange={(e) => handleAgentChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.agent.bio')}
                </label>
                <textarea
                  value={agentData.bio}
                  onChange={(e) => handleAgentChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Specialties */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.agent.specialties')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {agentData.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveAgent}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {t('profile.save')}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-6">
              {user?.isCompanyOwner ? (
                <>
                  {/* Company Logo */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        className="h-24 w-24 rounded-lg object-cover border border-gray-200"
                        src={companyData.logo || 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'}
                        alt={companyData.name}
                      />
                      <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{t('profile.company.logo')}</h3>
                      <p className="text-sm text-gray-500">{t('profile.company.logoDesc')}</p>
                      <button className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Upload className="h-4 w-4 mr-2" />
                        {t('profile.company.uploadLogo')}
                      </button>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.company.name')}
                      </label>
                      <input
                        type="text"
                        value={companyData.name}
                        onChange={(e) => handleCompanyChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.company.license')}
                      </label>
                      <input
                        type="text"
                        value={companyData.license}
                        onChange={(e) => handleCompanyChange('license', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.company.phone')}
                      </label>
                      <input
                        type="tel"
                        value={companyData.phone}
                        onChange={(e) => handleCompanyChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.company.email')}
                      </label>
                      <input
                        type="email"
                        value={companyData.email}
                        onChange={(e) => handleCompanyChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.company.website')}
                      </label>
                      <input
                        type="url"
                        value={companyData.website}
                        onChange={(e) => handleCompanyChange('website', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.company.address')}
                    </label>
                    <textarea
                      value={companyData.address}
                      onChange={(e) => handleCompanyChange('address', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.company.description')}
                    </label>
                    <textarea
                      value={companyData.description}
                      onChange={(e) => handleCompanyChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSaveCompany}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {t('profile.save')}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{t('profile.company.notOwner')}</h3>
                  <p className="text-gray-600">{t('profile.company.notOwnerDesc')}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;