import React, { useState } from 'react';
import { Search, Filter, Upload, FolderPlus, Grid, List, Download, Eye, Trash2, MoreVertical } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { documents } from '../data/mockData';

interface Folder {
  id: string;
  name: string;
  icon: string;
  count: number;
}

const folders: Folder[] = [
  { id: '1', name: 'Factures', icon: '📄', count: 124 },
  { id: '2', name: 'Contrats', icon: '📋', count: 45 },
  { id: '3', name: 'Bulletins de paie', icon: '💰', count: 78 },
  { id: '4', name: 'Documents fiscaux', icon: '📊', count: 32 },
  { id: '5', name: 'Rapports', icon: '📈', count: 56 }
];

export const Documents: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return '📄';
      case 'financial':
        return '📊';
      case 'contract':
        return '📋';
      case 'tax':
        return '💰';
      case 'payroll':
        return '👥';
      default:
        return '📄';
    }
  };

  const getDocumentTypeName = (type: string) => {
    switch (type) {
      case 'invoice':
        return 'Facture';
      case 'financial':
        return 'Document financier';
      case 'contract':
        return 'Contrat';
      case 'tax':
        return 'Document fiscal';
      case 'payroll':
        return 'Bulletin de paie';
      default:
        return 'Document';
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
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gérez et organisez vos documents
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            leftIcon={<FolderPlus size={16} />}
          >
            Nouveau dossier
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<Upload size={16} />}
          >
            Importer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Barre latérale avec les dossiers */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Dossiers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedFolder === folder.id
                        ? 'bg-[#0046AD] text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{folder.icon}</span>
                      <span className="font-medium">{folder.name}</span>
                    </div>
                    <Badge variant="default" size="sm">{folder.count}</Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des documents */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un document..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    leftIcon={<Filter size={16} />}
                  >
                    Filtres
                  </Button>
                  <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg">
                    <Button
                      variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid size={16} />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === 'list' ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {documents.map((document) => (
                    <div 
                      key={document.id}
                      className="py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">
                          {getDocumentTypeIcon(document.type)}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {document.name}
                          </h3>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {getDocumentTypeName(document.type)}
                            </span>
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(document.uploadDate)}
                            </span>
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {document.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(document.status)}
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map((document) => (
                    <Card key={document.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-3xl">
                            {getDocumentTypeIcon(document.type)}
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        </div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          {document.name}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {getDocumentTypeName(document.type)}
                            </span>
                            {getStatusBadge(document.status)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(document.uploadDate)}
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {document.size}
                            </span>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};