import React from 'react';
import { Calendar, Video, Phone, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Meeting } from '../../types';

interface UpcomingMeetingsProps {
  meetings: Meeting[];
}

export const UpcomingMeetings: React.FC<UpcomingMeetingsProps> = ({ meetings }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={16} className="text-green-500" />;
      case 'call':
        return <Phone size={16} className="text-blue-500" />;
      case 'in-person':
        return <MapPin size={16} className="text-amber-500" />;
      default:
        return <Calendar size={16} className="text-gray-500" />;
    }
  };

  const getMeetingTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'Visioconférence';
      case 'call':
        return 'Appel téléphonique';
      case 'in-person':
        return 'Rendez-vous en personne';
      default:
        return 'Rendez-vous';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Rendez-vous à venir</CardTitle>
          <Button variant="ghost" size="sm">
            Voir tous
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div 
              key={meeting.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-start">
                <Avatar
                  src={meeting.expert.avatar}
                  name={meeting.expert.name}
                  size="md"
                  className="flex-shrink-0"
                />
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {meeting.title}
                  </h4>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Avec <span className="font-medium">{meeting.expert.name}</span> ({meeting.expert.role})
                  </p>
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(meeting.date)}
                    </div>
                    <div className="hidden sm:block text-gray-300 dark:text-gray-700">•</div>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span className="mr-1">{meeting.time}</span>
                      <span>({meeting.duration} min)</span>
                    </div>
                    <div className="hidden sm:block text-gray-300 dark:text-gray-700">•</div>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      {getMeetingTypeIcon(meeting.type)}
                      <span className="ml-1">{getMeetingTypeLabel(meeting.type)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-2 justify-end">
                <Button variant="outline" size="sm">Reprogrammer</Button>
                <Button variant="primary" size="sm">
                  {meeting.type === 'video' ? 'Rejoindre' : 'Détails'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" fullWidth>Planifier un nouveau rendez-vous</Button>
        </div>
      </CardContent>
    </Card>
  );
};