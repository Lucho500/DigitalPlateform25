import React from 'react';
import { Download, Eye, FileText, FileSpreadsheet, FileArchive } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Document } from '../../types';

interface DocumentListProps {
  documents: Document[];
}

export const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'financial':
        return <FileSpreadsheet size={20} className="text-green-600" />;
      case 'invoice':
        return <FileText size={20} className="text-blue-600" />;
      case 'contract':
        return <FileArchive size={20} className="text-amber-600" />;
      case 'tax':
        return <FileText size={20} className="text-purple-600" />;
      case 'payroll':
        return <FileText size={20} className="text-teal-600" />;
      default:
        return <FileText size={20} className="text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">En attente</Badge>;
      case 'processed':
        return <Badge variant="info">Traité</Badge>;
      case 'approved':
        return <Badge variant="success">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="error">Rejeté</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Documents récents</CardTitle>
          <Button variant="ghost" size="sm">
            Voir tous
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((document) => (
            <div 
              key={document.id}
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {getDocumentIcon(document.type)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{document.name}</p>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(document.uploadDate)}
                    </p>
                    <span className="mx-1.5 text-gray-400">•</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {document.size}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(document.status)}
                <div className="flex items-center">
                  <button className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                    <Eye size={18} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};