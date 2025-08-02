import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CrisisEvent } from '@/data/mockData';
import { Clock, MapPin, ExternalLink } from 'lucide-react';

interface LiveEventsProps {
  events: CrisisEvent[];
  onEventSelect: (event: CrisisEvent) => void;
}

export const LiveEvents = ({ events, onEventSelect }: LiveEventsProps) => {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Events</h3>
        <Badge variant="outline">{events.length} Total</Badge>
      </div>
      
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {events.map((event) => (
          <Card 
            key={event.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onEventSelect(event)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-sm leading-tight">
                    {event.title}
                  </h4>
                  <Badge variant={getSeverityVariant(event.severity)} className="text-xs">
                    {event.severity}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-muted-foreground" />
                      <span>{event.location.name}</span>
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
                  <Badge variant="outline" className="text-xs">
                    {event.eventType}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};