import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Header
    'header.title': 'Publica Tu Propiedad',
    'header.subtitle': 'Crea un anuncio profesional de tu propiedad en solo unos pasos',
    
    // Navigation
    'nav.dashboard': 'Panel Principal',
    'nav.createListing': 'Crear Anuncio',
    'nav.myListings': 'Mis Anuncios',
    'nav.agentProfile': 'Perfil de Agente',
    'nav.accountSettings': 'Configuración',
    
    // Dashboard
    'dashboard.welcome': 'Bienvenido',
    'dashboard.subtitle': 'Gestiona tus propiedades y anuncios desde aquí',
    'dashboard.createListing': 'Crear Anuncio',
    'dashboard.quickActions': 'Acciones Rápidas',
    'dashboard.recentActivity': 'Actividad Reciente',
    'dashboard.stats.totalListings': 'Total de Anuncios',
    'dashboard.stats.activeListings': 'Anuncios Activos',
    'dashboard.stats.totalViews': 'Total de Vistas',
    'dashboard.stats.favorites': 'Favoritos',
    'dashboard.actions.createListing': 'Crear nuevo anuncio',
    'dashboard.actions.viewListings': 'Ver mis anuncios',
    'dashboard.actions.updateProfile': 'Actualizar perfil',
    
    // Listings
    'listings.title': 'Mis Anuncios',
    'listings.subtitle': 'Gestiona todas tus propiedades publicadas',
    'listings.createNew': 'Nuevo Anuncio',
    'listings.search': 'Buscar propiedades...',
    'listings.filters.allTypes': 'Todos los tipos',
    'listings.filters.sale': 'Venta',
    'listings.filters.rent': 'Alquiler',
    'listings.filters.allStatus': 'Todos los estados',
    'listings.status.active': 'Activo',
    'listings.status.optioned': 'Opcionado',
    'listings.status.archived': 'Archivado',
    'listings.showing': 'Mostrando',
    'listings.results': 'resultados',
    'listings.views': 'vistas',
    'listings.noResults': 'No se encontraron anuncios',
    'listings.noResultsDesc': 'Intenta ajustar tus filtros o crear un nuevo anuncio',
    
    // Edit Listing
    'editListing.title': 'Editar Anuncio',
    'editListing.subtitle': 'Actualiza la información de tu propiedad',
    
    // Settings
    'settings.title': 'Configuración de Cuenta',
    'settings.subtitle': 'Gestiona tu información personal y preferencias',
    'settings.tabs.profile': 'Perfil',
    'settings.tabs.security': 'Seguridad',
    'settings.tabs.notifications': 'Notificaciones',
    'settings.profile.title': 'Información Personal',
    'settings.profile.name': 'Nombre Completo',
    'settings.profile.email': 'Correo Electrónico',
    'settings.profile.phone': 'Teléfono',
    'settings.security.title': 'Cambiar Contraseña',
    'settings.security.currentPassword': 'Contraseña Actual',
    'settings.security.newPassword': 'Nueva Contraseña',
    'settings.security.confirmPassword': 'Confirmar Contraseña',
    'settings.notifications.title': 'Preferencias de Notificaciones',
    'settings.notifications.email': 'Notificaciones por Email',
    'settings.notifications.emailDesc': 'Recibir notificaciones importantes por correo',
    'settings.notifications.sms': 'Notificaciones SMS',
    'settings.notifications.smsDesc': 'Recibir alertas por mensaje de texto',
    'settings.notifications.marketing': 'Emails de Marketing',
    'settings.notifications.marketingDesc': 'Recibir ofertas y promociones',
    'settings.save': 'Guardar Cambios',
    'settings.updatePassword': 'Actualizar Contraseña',
    'settings.saved': 'Cambios guardados exitosamente',
    'settings.passwordMismatch': 'Las contraseñas no coinciden',
    'settings.passwordUpdated': 'Contraseña actualizada exitosamente',
    
    // Profile
    'profile.title': 'Perfil de Agente',
    'profile.subtitle': 'Gestiona tu información profesional y de empresa',
    'profile.tabs.agent': 'Información de Agente',
    'profile.tabs.company': 'Información de Empresa',
    'profile.agent.photo': 'Foto de Perfil',
    'profile.agent.photoDesc': 'Esta será tu foto principal en los anuncios',
    'profile.agent.uploadPhoto': 'Subir Foto',
    'profile.agent.name': 'Nombre Completo',
    'profile.agent.email': 'Correo Electrónico',
    'profile.agent.phone': 'Teléfono',
    'profile.agent.experience': 'Años de Experiencia',
    'profile.agent.bio': 'Biografía Profesional',
    'profile.agent.specialties': 'Especialidades',
    'profile.company.logo': 'Logo de la Empresa',
    'profile.company.logoDesc': 'Logo que aparecerá en tus anuncios',
    'profile.company.uploadLogo': 'Subir Logo',
    'profile.company.name': 'Nombre de la Empresa',
    'profile.company.license': 'Licencia',
    'profile.company.phone': 'Teléfono de la Empresa',
    'profile.company.email': 'Email de la Empresa',
    'profile.company.website': 'Sitio Web',
    'profile.company.address': 'Dirección',
    'profile.company.description': 'Descripción de la Empresa',
    'profile.company.notOwner': 'No eres propietario de empresa',
    'profile.company.notOwnerDesc': 'Solo los propietarios de empresa pueden editar esta información',
    'profile.save': 'Guardar Cambios',
    'profile.saved': 'Perfil actualizado exitosamente',
    
    // Progress
    'progress.step1': 'Información de la Propiedad',
    'progress.step1.desc': 'Detalles básicos y características',
    'progress.step2': 'Subir Medios',
    'progress.step2.desc': 'Fotos y videos',
    
    // Step 1 - Listing Info
    'listing.title': 'Información del Anuncio',
    'listing.type': 'Tipo de Anuncio',
    'listing.type.sale': 'Venta / Sale',
    'listing.type.rent': 'Alquiler / Rent',
    'listing.coBroke': '¿Co-broke Disponible?',
    'listing.coBroke.yes': 'Sí',
    'listing.coBroke.no': 'No',
    'listing.coBroke.note': 'Solo para uso interno',
    
    // Location
    'location.title': 'Detalles de Ubicación',
    'location.city': 'Pueblo/Ciudad',
    'location.city.placeholder': 'Selecciona o escribe ciudad',
    'location.address': 'Dirección de la Propiedad',
    'location.address.placeholder': 'Ingresa la dirección de la propiedad',
    'location.map.title': 'Ubicación en el Mapa',
    'location.map.instructions': 'Arrastra el marcador rojo para ajustar la ubicación exacta de tu propiedad',
    
    // Property Details
    'property.title': 'Detalles de la Propiedad',
    'property.price': 'Precio',
    'property.price.placeholder': '350,000',
    'property.rooms': 'Habitaciones',
    'property.baths': 'Baños',
    'property.lotSize': 'Tamaño del Lote (m²)',
    'property.lotSize.placeholder': '500',
    
    // Special Message
    'special.message': 'Mensaje Especial',
    'special.message.placeholder': 'Destaca algo especial sobre esta propiedad',
    
    // Amenities
    'amenities.title': 'Amenidades',
    'amenities.access': 'Control de acceso',
    'amenities.pool': 'Piscina',
    'amenities.garage': 'Puerta de garage',
    'amenities.cistern': 'Cisterna',
    'amenities.solar': 'Calentador Solar',
    'amenities.ac': 'Aire acondicionado',
    'amenities.gazebo': 'Gazebo',
    'amenities.recreation': 'Área Recreativa',
    'amenities.family': 'Family Room',
    'amenities.terrace': 'Terraza',
    
    // Description
    'description.title': 'Descripción de la Propiedad',
    'description.placeholder': 'Describe tu propiedad en detalle...',
    
    // YouTube
    'youtube.title': 'Video de YouTube',
    'youtube.placeholder': 'https://www.youtube.com/watch?v=...',
    'youtube.preview': 'Vista previa del video - URL de YouTube válida',
    'youtube.invalid': 'Por favor ingresa una URL válida de YouTube',
    
    // Step 2 - Media Upload
    'media.title': 'Subir Medios de la Propiedad',
    'media.subtitle': 'Sube fotos y videos de alta calidad para mostrar tu propiedad. La primera imagen será la foto principal.',
    'media.upload.title': 'Sube los Medios de tu Propiedad',
    'media.upload.subtitle': 'Arrastra y suelta archivos o haz clic para explorar. También puedes tomar fotos directamente desde tu cámara o editar imágenes.',
    'media.choose': 'Elegir Archivos',
    'media.camera': 'Tomar Foto',
    'media.requirements': 'Requisitos de Subida:',
    'media.req.formats': '• Formatos soportados: JPEG, PNG, MP4',
    'media.req.size': '• Tamaño máximo por archivo: 10MB',
    'media.req.count': '• Máximo 20 archivos en total',
    'media.req.main': '• La primera imagen será la foto principal',
    'media.req.resolution': '• Imágenes de alta resolución (1920x1080 o superior) recomendadas',
    'media.req.editor': '• Usa el editor de imágenes para recortar y mejorar tus fotos',
    'media.uploaded': 'Medios Subidos',
    'media.main': 'Foto Principal',
    'media.edit': 'Editar Medios',
    
    // Buttons
    'button.next': 'Siguiente Paso',
    'button.back': 'Atrás',
    'button.publish': 'Publicar Propiedad',
    
    // Validation
    'validation.required': 'Por favor completa todos los campos requeridos',
    'validation.success': '¡Propiedad publicada exitosamente! (Modo demo)',
    
    // Common
    'required': '*',
    'characters': 'caracteres'
  },
  en: {
    // Header
    'header.title': 'List Your Property',
    'header.subtitle': 'Create a professional property listing in just a few steps',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.createListing': 'Create Listing',
    'nav.myListings': 'My Listings',
    'nav.agentProfile': 'Agent Profile',
    'nav.accountSettings': 'Account Settings',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.subtitle': 'Manage your properties and listings from here',
    'dashboard.createListing': 'Create Listing',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.stats.totalListings': 'Total Listings',
    'dashboard.stats.activeListings': 'Active Listings',
    'dashboard.stats.totalViews': 'Total Views',
    'dashboard.stats.favorites': 'Favorites',
    'dashboard.actions.createListing': 'Create new listing',
    'dashboard.actions.viewListings': 'View my listings',
    'dashboard.actions.updateProfile': 'Update profile',
    
    // Listings
    'listings.title': 'My Listings',
    'listings.subtitle': 'Manage all your published properties',
    'listings.createNew': 'New Listing',
    'listings.search': 'Search properties...',
    'listings.filters.allTypes': 'All types',
    'listings.filters.sale': 'Sale',
    'listings.filters.rent': 'Rent',
    'listings.filters.allStatus': 'All status',
    'listings.status.active': 'Active',
    'listings.status.optioned': 'Optioned',
    'listings.status.archived': 'Archived',
    'listings.showing': 'Showing',
    'listings.results': 'results',
    'listings.views': 'views',
    'listings.noResults': 'No listings found',
    'listings.noResultsDesc': 'Try adjusting your filters or create a new listing',
    
    // Edit Listing
    'editListing.title': 'Edit Listing',
    'editListing.subtitle': 'Update your property information',
    
    // Settings
    'settings.title': 'Account Settings',
    'settings.subtitle': 'Manage your personal information and preferences',
    'settings.tabs.profile': 'Profile',
    'settings.tabs.security': 'Security',
    'settings.tabs.notifications': 'Notifications',
    'settings.profile.title': 'Personal Information',
    'settings.profile.name': 'Full Name',
    'settings.profile.email': 'Email Address',
    'settings.profile.phone': 'Phone Number',
    'settings.security.title': 'Change Password',
    'settings.security.currentPassword': 'Current Password',
    'settings.security.newPassword': 'New Password',
    'settings.security.confirmPassword': 'Confirm Password',
    'settings.notifications.title': 'Notification Preferences',
    'settings.notifications.email': 'Email Notifications',
    'settings.notifications.emailDesc': 'Receive important notifications via email',
    'settings.notifications.sms': 'SMS Notifications',
    'settings.notifications.smsDesc': 'Receive alerts via text message',
    'settings.notifications.marketing': 'Marketing Emails',
    'settings.notifications.marketingDesc': 'Receive offers and promotions',
    'settings.save': 'Save Changes',
    'settings.updatePassword': 'Update Password',
    'settings.saved': 'Changes saved successfully',
    'settings.passwordMismatch': 'Passwords do not match',
    'settings.passwordUpdated': 'Password updated successfully',
    
    // Profile
    'profile.title': 'Agent Profile',
    'profile.subtitle': 'Manage your professional and company information',
    'profile.tabs.agent': 'Agent Information',
    'profile.tabs.company': 'Company Information',
    'profile.agent.photo': 'Profile Photo',
    'profile.agent.photoDesc': 'This will be your main photo in listings',
    'profile.agent.uploadPhoto': 'Upload Photo',
    'profile.agent.name': 'Full Name',
    'profile.agent.email': 'Email Address',
    'profile.agent.phone': 'Phone Number',
    'profile.agent.experience': 'Years of Experience',
    'profile.agent.bio': 'Professional Biography',
    'profile.agent.specialties': 'Specialties',
    'profile.company.logo': 'Company Logo',
    'profile.company.logoDesc': 'Logo that will appear in your listings',
    'profile.company.uploadLogo': 'Upload Logo',
    'profile.company.name': 'Company Name',
    'profile.company.license': 'License',
    'profile.company.phone': 'Company Phone',
    'profile.company.email': 'Company Email',
    'profile.company.website': 'Website',
    'profile.company.address': 'Address',
    'profile.company.description': 'Company Description',
    'profile.company.notOwner': 'You are not a company owner',
    'profile.company.notOwnerDesc': 'Only company owners can edit this information',
    'profile.save': 'Save Changes',
    'profile.saved': 'Profile updated successfully',
    
    // Progress
    'progress.step1': 'Property Info',
    'progress.step1.desc': 'Basic details and features',
    'progress.step2': 'Media Upload',
    'progress.step2.desc': 'Photos and videos',
    
    // Step 1 - Listing Info
    'listing.title': 'Listing Information',
    'listing.type': 'Listing Type',
    'listing.type.sale': 'Sale / Venta',
    'listing.type.rent': 'Rent / Alquiler',
    'listing.coBroke': 'Co-broke Available?',
    'listing.coBroke.yes': 'Yes',
    'listing.coBroke.no': 'No',
    'listing.coBroke.note': 'Internal use only',
    
    // Location
    'location.title': 'Location Details',
    'location.city': 'City/Town',
    'location.city.placeholder': 'Select or type city',
    'location.address': 'Property Address',
    'location.address.placeholder': 'Enter property address',
    'location.map.title': 'Map Location',
    'location.map.instructions': 'Drag the red marker to adjust the exact location of your property',
    
    // Property Details
    'property.title': 'Property Details',
    'property.price': 'Price',
    'property.price.placeholder': '350,000',
    'property.rooms': 'Rooms',
    'property.baths': 'Baths',
    'property.lotSize': 'Lot Size (m²)',
    'property.lotSize.placeholder': '500',
    
    // Special Message
    'special.message': 'Special Message',
    'special.message.placeholder': 'Highlight something special about this property',
    
    // Amenities
    'amenities.title': 'Amenities',
    'amenities.access': 'Access control',
    'amenities.pool': 'Pool',
    'amenities.garage': 'Garage door',
    'amenities.cistern': 'Cistern',
    'amenities.solar': 'Solar heater',
    'amenities.ac': 'Air conditioning',
    'amenities.gazebo': 'Gazebo',
    'amenities.recreation': 'Recreation area',
    'amenities.family': 'Family Room',
    'amenities.terrace': 'Terrace',
    
    // Description
    'description.title': 'Property Description',
    'description.placeholder': 'Describe your property in detail...',
    
    // YouTube
    'youtube.title': 'YouTube Video',
    'youtube.placeholder': 'https://www.youtube.com/watch?v=...',
    'youtube.preview': 'Video preview - YouTube URL is valid',
    'youtube.invalid': 'Please enter a valid YouTube URL',
    
    // Step 2 - Media Upload
    'media.title': 'Property Media Upload',
    'media.subtitle': 'Upload high-quality photos and videos to showcase your property. First image will be used as the main photo.',
    'media.upload.title': 'Upload Your Property Media',
    'media.upload.subtitle': 'Drag and drop files or click to browse. You can also take photos directly from your camera or edit images.',
    'media.choose': 'Choose Files',
    'media.camera': 'Take Photo',
    'media.requirements': 'Upload Requirements:',
    'media.req.formats': '• Supported formats: JPEG, PNG, MP4',
    'media.req.size': '• Maximum file size: 10MB per file',
    'media.req.count': '• Maximum 20 files total',
    'media.req.main': '• First image will be the main property photo',
    'media.req.resolution': '• High resolution images (1920x1080 or higher) recommended',
    'media.req.editor': '• Use the image editor to crop and enhance your photos',
    'media.uploaded': 'Uploaded Media',
    'media.main': 'Main Photo',
    'media.edit': 'Edit Media',
    
    // Buttons
    'button.next': 'Next Step',
    'button.back': 'Back',
    'button.publish': 'Publish Property',
    
    // Validation
    'validation.required': 'Please fill in all required fields',
    'validation.success': 'Property published successfully! (Demo mode)',
    
    // Common
    'required': '*',
    'characters': 'characters'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es'); // Spanish as default

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};