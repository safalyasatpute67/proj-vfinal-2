import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapContainer } from './MapContainer';
import { LiveEvents } from './LiveEvents';
import { ResilienceHub } from './ResilienceHub';
import { HealthSentinel } from './HealthSentinel';
import { CivicReporter } from './CivicReporter';
import { EventFilters } from './EventFilters';
import { mockEvents, healthStats } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertTriangle, 
  Activity, 
  Shield, 
  Heart, 
  MessageSquare, 
  Bell,
  TrendingUp,
  Users,
  Search,
  Filter,
  Zap,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';

export const Dashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(true);
  const { toast } = useToast();
  
  const activeEvents = filteredEvents.filter(event => event.status === 'Active').length;
  const highSeverityEvents = filteredEvents.filter(event => event.severity === 'High').length;

  // Simulate real-time updates
  useEffect(() => {
    if (!isLiveMode) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Simulate new event or status change
      if (Math.random() > 0.8) {
        const eventTypes = ['Health Alert', 'Traffic', 'Weather'];
        const severities = ['Low', 'Medium', 'High'];
        const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
        
        toast({
          title: `New ${randomSeverity} Priority Alert`,
          description: `${randomType} event detected. Click to view details.`,
          duration: 4000,
        });

        if (soundEnabled) {
          // Create notification sound
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
          
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);
        }
      }
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [isLiveMode, soundEnabled, toast]);

  // Filter events based on search and filters
  useEffect(() => {
    let filtered = mockEvents;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Event type filter
    if (eventTypeFilter !== 'all') {
      filtered = filtered.filter(event => event.eventType === eventTypeFilter);
    }

    // Severity filter
    if (severityFilter !== 'all') {
      filtered = filtered.filter(event => event.severity === severityFilter);
    }

    setFilteredEvents(filtered);
  }, [searchQuery, eventTypeFilter, severityFilter]);

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} Activated`,
      description: "Redirecting to emergency services...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="w-10 h-10 gradient-crisis rounded-lg flex items-center justify-center hover-glow">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Nexus Crisis Intelligence</h1>
                <p className="text-sm text-muted-foreground flex items-center">
                  <span className="pulse-dot w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Live • Last update {lastUpdate.toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Quick Emergency Actions */}
              <div className="hidden md:flex space-x-2">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="animate-bounce-subtle"
                  onClick={() => handleQuickAction('Emergency Call')}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Emergency: 112
                </Button>
              </div>

              {/* Live Mode Toggle */}
              <Button
                variant={isLiveMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsLiveMode(!isLiveMode)}
                className="hover-scale"
              >
                <Zap className={`w-4 h-4 mr-2 ${isLiveMode ? 'animate-pulse' : ''}`} />
                {isLiveMode ? 'Live' : 'Paused'}
              </Button>

              {/* Sound Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="hover-scale"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>

              <Badge variant="destructive" className="px-3 py-1 animate-pulse-glow">
                <Bell className="w-4 h-4 mr-1" />
                {activeEvents} Active Alerts
              </Badge>
              
              <Button variant="outline" size="sm" className="hover-scale">
                <Users className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Interactive Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search events, locations, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 hover-scale"
                />
              </div>
              
              <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                <SelectTrigger className="w-40 hover-scale">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Flood">Flood</SelectItem>
                  <SelectItem value="Heatwave">Heatwave</SelectItem>
                  <SelectItem value="Cyclone">Cyclone</SelectItem>
                  <SelectItem value="Health Alert">Health Alert</SelectItem>
                  <SelectItem value="Civic Issue">Civic Issue</SelectItem>
                  <SelectItem value="Earthquake">Earthquake</SelectItem>
                </SelectContent>
              </Select>

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-32 hover-scale">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <EventFilters 
              totalEvents={filteredEvents.length}
              activeEvents={activeEvents}
              onClearFilters={() => {
                setSearchQuery('');
                setEventTypeFilter('all');
                setSeverityFilter('all');
              }}
            />
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="interactive-card hover-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Events</p>
                  <p className="text-2xl font-bold animate-scale-in">{activeEvents}</p>
                  <p className="text-xs text-success">+2 from last hour</p>
                </div>
                <div className="relative">
                  <AlertTriangle className="w-8 h-8 text-primary" />
                  {activeEvents > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="interactive-card hover-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-destructive animate-scale-in">{highSeverityEvents}</p>
                  <p className="text-xs text-destructive">Requires attention</p>
                </div>
                <TrendingUp className="w-8 h-8 text-destructive animate-bounce-subtle" />
              </div>
            </CardContent>
          </Card>

          <Card className="interactive-card hover-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Health Alerts</p>
                  <p className="text-2xl font-bold animate-scale-in">{healthStats.airQualityAlerts}</p>
                  <p className="text-xs text-warning">Air quality monitoring</p>
                </div>
                <Heart className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="interactive-card hover-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Community Reports</p>
                  <p className="text-2xl font-bold animate-scale-in">247</p>
                  <p className="text-xs text-accent">89% resolved</p>
                </div>
                <MessageSquare className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Map Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] hover-glow overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Live Crisis Map - India
                    <Badge variant="outline" className="ml-2 animate-pulse">
                      {filteredEvents.length} Events
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="hover-scale">
                      <Settings className="w-4 h-4 mr-2" />
                      Map Settings
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 h-full">
                <MapContainer 
                  events={filteredEvents} 
                  selectedEvent={selectedEvent}
                  onEventSelect={setSelectedEvent}
                />
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Features Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full grid-cols-2 hover-scale">
                <TabsTrigger value="events" className="transition-all duration-200">
                  Live Events
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filteredEvents.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="features" className="transition-all duration-200">
                  Features
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="events" className="space-y-4 animate-fade-in">
                <LiveEvents 
                  events={filteredEvents} 
                  onEventSelect={setSelectedEvent} 
                  searchQuery={searchQuery}
                />
              </TabsContent>
              
              <TabsContent value="features" className="space-y-4 animate-fade-in">
                <Tabs defaultValue="resilience" orientation="vertical">
                  <TabsList className="grid w-full grid-cols-1 h-auto">
                    <TabsTrigger value="resilience" className="justify-start hover-scale">
                      <Shield className="w-4 h-4 mr-2" />
                      Resilience Hub
                    </TabsTrigger>
                    <TabsTrigger value="health" className="justify-start hover-scale">
                      <Heart className="w-4 h-4 mr-2" />
                      Health Sentinel
                    </TabsTrigger>
                    <TabsTrigger value="civic" className="justify-start hover-scale">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Civic Reporter
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-4">
                    <TabsContent value="resilience" className="animate-slide-in-right">
                      <ResilienceHub />
                    </TabsContent>
                    <TabsContent value="health" className="animate-slide-in-right">
                      <HealthSentinel />
                    </TabsContent>
                    <TabsContent value="civic" className="animate-slide-in-right">
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