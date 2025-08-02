import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { resilienceResources } from '@/data/mockData';
import { 
  ExternalLink, 
  Download, 
  Phone, 
  Users, 
  BookOpen, 
  Shield,
  FileText,
  AlertTriangle,
  Siren
} from 'lucide-react';

export const ResilienceHub = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Official': return <Shield className="w-4 h-4" />;
      case 'Emergency': return <Phone className="w-4 h-4" />;
      case 'Preparation': return <BookOpen className="w-4 h-4" />;
      case 'Community': return <Users className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Official': return 'bg-primary text-primary-foreground';
      case 'Emergency': return 'bg-destructive text-destructive-foreground';
      case 'Preparation': return 'bg-warning text-warning-foreground';
      case 'Community': return 'bg-accent text-accent-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Resilience Hub
        </h3>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="animate-pulse">Live</Badge>
          <Badge variant="outline">4 Resources</Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="border-l-4 border-l-primary hover-glow animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Siren className="w-4 h-4 mr-2 animate-bounce-subtle" />
            Emergency Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            <Button variant="destructive" size="sm" className="justify-start hover-scale animate-pulse-glow">
              <Phone className="w-4 h-4 mr-2" />
              Emergency Helpline: 112
            </Button>
            <Button variant="outline" size="sm" className="justify-start hover-scale">
              <Download className="w-4 h-4 mr-2" />
              Download Emergency App
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm flex items-center">
          <BookOpen className="w-4 h-4 mr-2" />
          Disaster Preparedness Resources
        </h4>
        {resilienceResources.map((resource, index) => (
          <Card key={index} className="interactive-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between space-x-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`p-1 rounded ${getCategoryColor(resource.category)}`}>
                      {getCategoryIcon(resource.category)}
                    </div>
                    <h5 className="font-semibold text-sm truncate">
                      {resource.title}
                    </h5>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {resource.description}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0 hover-scale">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weather Alerts */}
      <Card className="border-l-4 border-l-warning hover-glow animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-warning" />
            Today's Weather Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between hover-scale p-2 rounded transition-colors hover:bg-muted/50">
            <span className="text-sm flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              Heat Wave Warning
            </span>
            <Badge variant="secondary">Rajasthan</Badge>
          </div>
          <div className="flex items-center justify-between hover-scale p-2 rounded transition-colors hover:bg-muted/50">
            <span className="text-sm flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              Heavy Rain Alert
            </span>
            <Badge variant="secondary">Kerala</Badge>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-2 hover-scale">
            View All Weather Alerts
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};