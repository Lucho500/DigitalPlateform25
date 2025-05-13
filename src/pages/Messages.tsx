import React, { useState } from 'react';
import { Search, Plus, Phone, Video, MoreVertical, Send, Paperclip } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { messages, experts, currentUser } from '../data/mockData';

export const Messages: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState(experts[0]);
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: String(Date.now()),
      sender: currentUser,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Liste des contacts */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Button variant="ghost" size="sm">
              <Plus size={20} />
            </Button>
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {experts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                selectedContact.id === contact.id ? 'bg-gray-50 dark:bg-gray-800' : ''
              }`}
            >
              <Avatar src={contact.avatar} name={contact.name} size="md" />
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900 dark:text-white">{contact.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{contact.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Zone de chat */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar src={selectedContact.avatar} name={selectedContact.name} size="md" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{selectedContact.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{selectedContact.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <Video size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical size={20} />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender.id === currentUser.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-[70%]`}>
                {message.sender.id !== currentUser.id && (
                  <Avatar src={message.sender.avatar} name={message.sender.name} size="sm" />
                )}
                <div
                  className={`rounded-lg p-3 ${
                    message.sender.id === currentUser.id
                      ? 'bg-[#0046AD] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Button type="button" variant="ghost" size="sm">
              <Paperclip size={20} />
            </Button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm py-2 px-4"
            />
            <Button type="submit" variant="primary" size="sm">
              <Send size={18} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};