import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Edit3, 
  Eye, 
  Archive, 
  MoreVertical, 
  MapPin, 
  Bed, 
  Bath, 
  Square,
  DollarSign,
  Filter,
  Search,
  Grid3X3,
  List,
  Heart,
  Star,
  Plus,
  Building2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Listing {
  id: string;
  title: string;
  address: string;
  city: string;
  price: string;
  rooms: string;
  baths: string;
  lotSize: string;
  status: 'active' | 'optioned' | 'archived';
  type: 'sale' | 'rent';
  image: string;
  views: number;
  favorites: number;
  createdAt: string;
  rating?: number;
}

const MyListings: React.FC = () => {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<'all' | 'sale' | 'rent'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'optioned' | 'archived'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data with enhanced properties
  const listings: Listing[] = [
    {
      id: '1',
      title: 'Hermosa Casa en Condado',
      address: 'Calle Loíza 123',
      city: 'San Juan',
      price: '$450,000',
      rooms: '3',
      baths: '2',
      lotSize: '300',
      status: 'active',
      type: 'sale',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      views: 234,
      favorites: 12,
      createdAt: '2024-01-15',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Apartamento Moderno en Santurce',
      address: 'Av. Ponce de León 456',
      city: 'San Juan',
      price: '$2,200/mes',
      rooms: '2',
      baths: '1',
      lotSize: '0',
      status: 'optioned',
      type: 'rent',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      views: 156,
      favorites: 8,
      createdAt: '2024-01-10',
      rating: 4.6
    },
    {
      id: '3',
      title: 'Villa de Lujo en Dorado',
      address: 'Dorado Beach Resort',
      city: 'Dorado',
      price: '$1,200,000',
      rooms: '5',
      baths: '4',
      lotSize: '800',
      status: 'active',
      type: 'sale',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      views: 445,
      favorites: 28,
      createdAt: '2024-01-05',
      rating: 4.9
    },
    {
      id: '4',
      title: 'Condo en Isla Verde',
      address: 'Av. Isla Verde 789',
      city: 'Carolina',
      price: '$320,000',
      rooms: '2',
      baths: '2',
      lotSize: '0',
      status: 'archived',
      type: 'sale',
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      views: 89,
      favorites: 3,
      createdAt: '2023-12-20',
      rating: 4.3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'optioned': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return t('listings.status.active');
      case 'optioned': return t('listings.status.optioned');
      case 'archived': return t('listings.status.archived');
      default: return status;
    }
  };

  const filteredListings = listings.filter(listing => {
    const matchesType = filterType === 'all' || listing.type === filterType;
    const matchesStatus = filterStatus === 'all' || listing.status === filterStatus;
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('listings.title')}</h1>
          <p className="text-gray-600 mt-2 text-lg">{t('listings.subtitle')}</p>
        </div>
        <Link
          to="/create-listing"
          className="mt-6 sm:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('listings.createNew')}
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('listings.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 w-full sm:w-80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 focus:bg-white transition-colors"
            >
              <option value="all">{t('listings.filters.allTypes')}</option>
              <option value="sale">{t('listings.filters.sale')}</option>
              <option value="rent">{t('listings.filters.rent')}</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 focus:bg-white transition-colors"
            >
              <option value="all">{t('listings.filters.allStatus')}</option>
              <option value="active">{t('listings.status.active')}</option>
              <option value="optioned">{t('listings.status.optioned')}</option>
              <option value="archived">{t('listings.status.archived')}</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-gray-600">
        {t('listings.showing')} <span className="font-semibold text-gray-900">{filteredListings.length}</span> {t('listings.results')}
      </div>

      {/* Listings Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(listing.status)}`}>
                    {getStatusText(listing.status)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-xs font-semibold">
                    {listing.type === 'sale' ? t('listing.type.sale') : t('listing.type.rent')}
                  </span>
                </div>
                <button className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{listing.title}</h3>
                  {listing.rating && (
                    <div className="flex items-center ml-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700 ml-1">{listing.rating}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{listing.address}, {listing.city}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{listing.rooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{listing.baths}</span>
                    </div>
                    {listing.lotSize !== '0' && (
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{listing.lotSize}m²</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">{listing.price}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{listing.views} {t('listings.views')}</span>
                    <div className="flex items-center space-x-1">
                      <Link
                        to={`/edit-listing/${listing.id}`}
                        className="p-2 text-gray-400 hover:text-orange-600 transition-colors rounded-full hover:bg-orange-50"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-50">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-50">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-6">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{listing.title}</h3>
                      <span className="text-xl font-bold text-gray-900">{listing.price}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {listing.address}, {listing.city}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {listing.rooms}
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {listing.baths}
                        </div>
                        {listing.lotSize !== '0' && (
                          <div className="flex items-center">
                            <Square className="h-4 w-4 mr-1" />
                            {listing.lotSize}m²
                          </div>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(listing.status)}`}>
                          {getStatusText(listing.status)}
                        </span>
                        {listing.rating && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span>{listing.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{listing.views} {t('listings.views')}</span>
                        <Link
                          to={`/edit-listing/${listing.id}`}
                          className="p-2 text-gray-400 hover:text-orange-600 transition-colors rounded-full hover:bg-orange-50"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-50">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-50">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredListings.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('listings.noResults')}</h3>
          <p className="text-gray-600 max-w-md mx-auto">{t('listings.noResultsDesc')}</p>
        </div>
      )}
    </div>
  );
};

export default MyListings;