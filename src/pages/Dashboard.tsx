import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Building2, TrendingUp, Eye, Heart, ArrowUpRight, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const stats = [
    { name: t('dashboard.stats.totalListings'), value: '12', icon: Building2, color: 'from-blue-500 to-blue-600', change: '+2.5%' },
    { name: t('dashboard.stats.activeListings'), value: '8', icon: TrendingUp, color: 'from-green-500 to-green-600', change: '+12%' },
    { name: t('dashboard.stats.totalViews'), value: '1,234', icon: Eye, color: 'from-purple-500 to-purple-600', change: '+18%' },
    { name: t('dashboard.stats.favorites'), value: '45', icon: Heart, color: 'from-orange-500 to-orange-600', change: '+7%' },
  ];

  const recentActivity = [
    { 
      id: 1, 
      action: 'Nueva propiedad publicada', 
      property: 'Casa en Condado', 
      time: '2 horas',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    { 
      id: 2, 
      action: 'Propiedad marcada como optioned', 
      property: 'Apartamento en Santurce', 
      time: '5 horas',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    { 
      id: 3, 
      action: 'Actualización de precio', 
      property: 'Villa en Dorado', 
      time: '1 día',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    { 
      id: 4, 
      action: 'Nueva consulta recibida', 
      property: 'Condo en Isla Verde', 
      time: '2 días',
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
  ];

  const quickActions = [
    {
      title: t('dashboard.actions.createListing'),
      description: 'Publica una nueva propiedad',
      href: '/create-listing',
      icon: Plus,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: t('dashboard.actions.viewListings'),
      description: 'Gestiona tus propiedades',
      href: '/my-listings',
      icon: Building2,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: t('dashboard.actions.updateProfile'),
      description: 'Actualiza tu información',
      href: '/agent-profile',
      icon: Eye,
      color: 'from-purple-500 to-orange-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 rounded-3xl shadow-xl">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {t('dashboard.welcome')}, {user?.name}! 👋
              </h1>
              <p className="text-orange-100 text-lg max-w-2xl">
                {t('dashboard.subtitle')}
              </p>
            </div>
            <Link
              to="/create-listing"
              className="hidden lg:inline-flex items-center px-6 py-3 bg-white text-orange-600 font-semibold rounded-2xl hover:bg-orange-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5 mr-2" />
              {t('dashboard.createListing')}
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-white opacity-5 rounded-full"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('dashboard.quickActions')}</h3>
            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.href}
                    className="flex items-center p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${action.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-gray-700">{action.title}</p>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">{t('dashboard.recentActivity')}</h3>
              <button className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
                Ver todo
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <img
                    src={activity.image}
                    alt={activity.property}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {activity.property}
                    </p>
                    <div className="flex items-center mt-2">
                      <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                      <p className="text-xs text-gray-400">hace {activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;