import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CrisisEvent } from '@/data/mockData';
import { Clock, MapPin, ExternalLink, Search, Filter, Zap, Eye } from 'lucide-react';

interface LiveEventsProps {
  events: CrisisEvent[];
  onEventSelect: (event: CrisisEvent) => void;
  searchQuery?: string;
}

export const LiveEvents = ({ events, onEventSelect, searchQuery }: LiveEventsProps) => {
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');
  const [sortBy, setSortBy] = useState<'time' | 'severity'>('time');
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-destructive';
      case 'Monitoring': return 'text-warning';
      case 'Resolved': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const sortedEvents = [...events].sort((a, b) => {
    if (sortBy === 'severity') {
      const severityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return severityOrder[b.severity as keyof typeof severityOrder] - severityOrder[a.severity as keyof typeof severityOrder];
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={index} className="bg-primary/20 text-primary">{part}</mark> : part
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <Zap className="w-5 h-5 mr-2 animate-pulse" />
          Live Events
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={sortBy === 'time' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('time')}
            className="hover-scale"
          >
            <Clock className="w-4 h-4 mr-1" />
            Time
          </Button>
          <Button
            variant={sortBy === 'severity' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('severity')}
            className="hover-scale"
          >
            <Filter className="w-4 h-4 mr-1" />
            Severity
          </Button>
        </div>
      </div>
      
      <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
        {sortedEvents.length === 0 ? (
          <Card className="animate-fade-in">
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No events match your current filters</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          sortedEvents.map((event, index) => (
          <Card 
            key={event.id} 
            className="interactive-card hover-glow animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onEventSelect(event)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-sm leading-tight">
                    {highlightText(event.title, searchQuery || '')}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getSeverityVariant(event.severity)} className="text-xs">
                      {event.severity}
                    </Badge>
                    {event.severity === 'High' && (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {highlightText(event.description, searchQuery || '')}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center hover-scale">
                      <MapPin className="w-3 h-3 mr-1 text-muted-foreground" />
                      <span>{highlightText(event.location.name, searchQuery || '')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                      <span>{new Date(event.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs hover-scale">
                    {event.eventType}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover-scale">
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
        )}
      </div>
    </div>
  );
};