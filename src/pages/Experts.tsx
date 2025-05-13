import React, { useState } from 'react';
import { Search, Filter, Calendar, MessageSquare, Video, Phone, MapPin, Star, Clock, Shield, Award, Languages } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { experts } from '../data/mockData';

interface ExpertiseArea {
  name: string;
  level: 'expert' | 'advanced' | 'intermediate';
}

interface DetailedExpert {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  rating: number;
  availability: 'available' | 'busy' | 'unavailable';
  expertiseAreas: ExpertiseArea[];
  languages: string[];
  certifications: string[];
  bio: string;
  location: string;
  nextAvailability: string;
  clientCount: number;
  successRate: number;
  reviews: {
    total: number;
    average: number;
    recent: Array<{
      id: string;
      author: string;
      rating: number;
      comment: string;
      date: string;
    }>;
  };
}

const extendedExperts: DetailedExpert[] = experts.map(expert => ({
  ...expert,
  phone: '+33 1 23 45 67 89',
  specialization: 'Expert-comptable & Commissaire aux comptes',
  experience: 12,
  rating: 4.8,
  availability: 'available',
  location: 'Paris, France',
  nextAvailability: '2025-04-18T10:00:00',
  clientCount: 45,
  successRate: 98,
  expertiseAreas: [
    { name: 'Comptabilité', level: 'expert' },
    { name: 'Fiscalité', level: 'expert' },
    { name: 'Audit', level: 'advanced' },
    { name: 'Gestion de patrimoine', level: 'intermediate' },
    { name: 'Droit des sociétés', level: 'advanced' },
    { name: 'Conseil en gestion', level: 'expert' }
  ],
  languages: ['Français', 'Anglais', 'Espagnol'],
  certifications: ['DSCG', 'DEC', 'CAFCAC'],
  bio: 'Expert-comptable diplômé avec plus de 12 ans d\'expérience dans l\'accompagnement des PME/TPE. Spécialisé dans l\'optimisation fiscale et le conseil en gestion.',
  reviews: {
    total: 128,
    average: 4.8,
    recent: [
      {
        id: '1',
        author: 'Marie Dubois',
        rating: 5,
        comment: 'Excellent professionnel, très à l\'écoute et réactif. Ses conseils ont été précieux pour le développement de mon entreprise.',
        date: '2025-04-10'
      },
      {
        id: '2',
        author: 'Jean Martin',
        rating: 5,
        comment: 'Une expertise pointue et des recommandations toujours pertinentes. Je recommande vivement.',
        date: '2025-04-05'
      },
      {
        id: '3',
        author: 'Sophie Laurent',
        rating: 4,
        comment: 'Très satisfaite de l\'accompagnement. Grande disponibilité et professionnalisme.',
        date: '2025-04-01'
      }
    ]
  }
}));

export const Experts: React.FC = () => {
  const [selectedExpert, setSelectedExpert] = useState<DetailedExpert | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('all');
  const [selectedTab, setSelectedTab] = useState<'profile' | 'reviews' | 'availability'>('profile');

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <Badge variant="success">Disponible</Badge>;
      case 'busy':
        return <Badge variant="warning">Occupé</Badge>;
      case 'unavailable':
        return <Badge variant="error">Indisponible</Badge>;
      default:
        return null;
    }
  };

  const getExpertiseLevelBadge = (level: string) => {
    switch (level) {
      case 'expert':
        return <Badge variant="success">Expert</Badge>;
      case 'advanced':
        return <Badge variant="info">Avancé</Badge>;
      case 'intermediate':
        return <Badge variant="warning">Intermédiaire</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  const renderExpertProfile = () => {
    if (!selectedExpert) return null;

    switch (selectedTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Avatar src={selectedExpert.avatar} name={selectedExpert.name} size="xl" />
              <h3 className="mt-4 font-semibold text-lg">{selectedExpert.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{selectedExpert.specialization}</p>
              <div className="flex items-center justify-center mt-2 space-x-2">
                {getAvailabilityBadge(selectedExpert.availability)}
                <Badge variant="default">
                  <MapPin size={14} className="mr-1" />
                  {selectedExpert.location}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-[#0046AD]">{selectedExpert.clientCount}</p>
                <p className="text-sm text-gray-500">Clients actifs</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-[#0046AD]">{selectedExpert.experience} ans</p>
                <p className="text-sm text-gray-500">d'expérience</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-[#0046AD]">{selectedExpert.successRate}%</p>
                <p className="text-sm text-gray-500">Satisfaction</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">À propos</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{selectedExpert.bio}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Domaines d'expertise</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedExpert.expertiseAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm">{area.name}</span>
                    {getExpertiseLevelBadge(area.level)}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {selectedExpert.certifications.map((cert) => (
                  <Badge key={cert} variant="default" size="sm">
                    <Award size={14} className="mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Langues</h4>
              <div className="flex flex-wrap gap-2">
                {selectedExpert.languages.map((lang) => (
                  <Badge key={lang} variant="default" size="sm">
                    <Languages size={14} className="mr-1" />
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <Button variant="primary" fullWidth leftIcon={<Calendar size={16} />}>
                Prendre rendez-vous
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" fullWidth leftIcon={<Video size={16} />}>
                  Visio
                </Button>
                <Button variant="outline" fullWidth leftIcon={<Phone size={16} />}>
                  Appeler
                </Button>
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-4xl font-bold text-[#0046AD]">{selectedExpert.reviews.average}</div>
              <div className="flex justify-center my-2">
                {renderStars(selectedExpert.reviews.average)}
              </div>
              <p className="text-sm text-gray-500">
                Basé sur {selectedExpert.reviews.total} avis
              </p>
            </div>

            <div className="space-y-4">
              {selectedExpert.reviews.recent.map((review) => (
                <div key={review.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{review.author}</p>
                      <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>

            <Button variant="outline" fullWidth>
              Voir tous les avis
            </Button>
          </div>
        );

      case 'availability':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock size={20} className="text-[#0046AD]" />
                <h4 className="font-medium">Prochaine disponibilité</h4>
              </div>
              <p className="text-lg font-semibold">
                {new Date(selectedExpert.nextAvailability).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium mb-4">Créneaux disponibles</h4>
              {[...Array(5)].map((_, index) => {
                const date = new Date(selectedExpert.nextAvailability);
                date.setDate(date.getDate() + index);
                return (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <p className="font-medium mb-2">
                      {date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, timeIndex) => (
                        <Button
                          key={timeIndex}
                          variant="outline"
                          size="sm"
                          className="text-center"
                        >
                          {`${9 + timeIndex * 2}:00`}
                        </Button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex space-x-2">
              <Button variant="primary" fullWidth leftIcon={<Calendar size={16} />}>
                Réserver
              </Button>
              <Button variant="outline" fullWidth leftIcon={<MessageSquare size={16} />}>
                Demander un autre créneau
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nos Experts</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Découvrez notre équipe d'experts-comptables qualifiés
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un expert..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm w-64"
            />
          </div>
          <Button 
            variant="outline" 
            leftIcon={<Filter size={16} />}
          >
            Filtres
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des experts */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {extendedExperts.map((expert) => (
              <Card 
                key={expert.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedExpert(expert)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar src={expert.avatar} name={expert.name} size="lg" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{expert.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{expert.specialization}</p>
                        </div>
                        {getAvailabilityBadge(expert.availability)}
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            {renderStars(expert.rating)}
                            <span className="ml-1">{expert.rating}</span>
                          </div>
                          <span className="mx-2">•</span>
                          <span>{expert.experience} ans d'exp.</span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {expert.expertiseAreas.slice(0, 3).map((area) => (
                          <Badge key={area.name} variant="info" size="sm">
                            {area.name}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm" leftIcon={<Calendar size={14} />}>
                          RDV
                        </Button>
                        <Button variant="outline" size="sm" leftIcon={<MessageSquare size={14} />}>
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Détails de l'expert sélectionné */}
        <div className="lg:col-span-1">
          {selectedExpert ? (
            <Card>
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <Button
                    variant={selectedTab === 'profile' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedTab('profile')}
                  >
                    Profil
                  </Button>
                  <Button
                    variant={selectedTab === 'reviews' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedTab('reviews')}
                  >
                    Avis
                  </Button>
                  <Button
                    variant={selectedTab === 'availability' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedTab('availability')}
                  >
                    Disponibilités
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {renderExpertProfile()}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Shield size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">Sélectionnez un expert</p>
                <p className="text-sm">
                  Cliquez sur un expert pour voir son profil détaillé, ses avis et ses disponibilités
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};