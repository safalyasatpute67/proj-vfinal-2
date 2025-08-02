import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapContainer } from './MapContainer';
import { LiveEvents } from './LiveEvents';
import { ResilienceHub } from './ResilienceHub';
import { HealthSentinel } from './HealthSentinel';
import { CivicReporter } from './CivicReporter';
import { mockEvents, healthStats } from '@/data/mockData';
import { 
  AlertTriangle, 
  Activity, 
  Shield, 
  Heart, 
  MessageSquare, 
  Bell,
  TrendingUp,
  Users
} from 'lucide-react';

export const Dashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]);
  
  const activeEvents = mockEvents.filter(event => event.status === 'Active').length;
  const highSeverityEvents = mockEvents.filter(event => event.severity === 'High').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-crisis rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Nexus Crisis Intelligence</h1>
                <p className="text-sm text-muted-foreground">Real-time awareness for resilient India</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="destructive" className="px-3 py-1">
                <Bell className="w-4 h-4 mr-1" />
                {activeEvents} Active Alerts
              </Badge>
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Events</p>
                  <p className="text-2xl font-bold">{activeEvents}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-destructive">{highSeverityEvents}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Health Alerts</p>
                  <p className="text-2xl font-bold">{healthStats.airQualityAlerts}</p>
                </div>
                <Heart className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Community Reports</p>
                  <p className="text-2xl font-bold">247</p>
                </div>
                <MessageSquare className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Live Crisis Map - India
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 h-full">
                <MapContainer 
                  events={mockEvents} 
                  selectedEvent={selectedEvent}
                  onEventSelect={setSelectedEvent}
                />
              </CardContent>
            </Card>
          </div>

          {/* Features Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="events">Live Events</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>
              
              <TabsContent value="events" className="space-y-4">
                <LiveEvents events={mockEvents} onEventSelect={setSelectedEvent} />
              </TabsContent>
              
              <TabsContent value="features" className="space-y-4">
                <Tabs defaultValue="resilience" orientation="vertical">
                  <TabsList className="grid w-full grid-cols-1 h-auto">
                    <TabsTrigger value="resilience" className="justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Resilience Hub
                    </TabsTrigger>
                    <TabsTrigger value="health" className="justify-start">
                      <Heart className="w-4 h-4 mr-2" />
                      Health Sentinel
                    </TabsTrigger>
                    <TabsTrigger value="civic" className="justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Civic Reporter
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-4">
                    <TabsContent value="resilience">
                      <ResilienceHub />
                    </TabsContent>
                    <TabsContent value="health">
                      <HealthSentinel />
                    </TabsContent>
                    <TabsContent value="civic">
                      <CivicReporter />
                    </TabsContent>
                  </div>
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};