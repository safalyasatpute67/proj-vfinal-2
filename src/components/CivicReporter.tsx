import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Camera, 
  MapPin, 
  Send, 
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export const CivicReporter = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    severity: ''
  });

  const recentReports = [
    {
      id: 1,
      title: 'Street Light Not Working',
      location: 'MG Road, Bangalore',
      status: 'In Progress',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      title: 'Water Logging After Rain',
      location: 'Sector 12, Noida',
      status: 'Resolved',
      timestamp: '1 day ago'
    },
    {
      id: 3,
      title: 'Garbage Collection Missed',
      location: 'Anna Nagar, Chennai',
      status: 'Reported',
      timestamp: '3 hours ago'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Submitted Successfully",
      description: "Your civic issue has been reported to relevant authorities.",
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      location: '',
      severity: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-success text-success-foreground';
      case 'In Progress': return 'bg-warning text-warning-foreground';
      case 'Reported': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved': return <CheckCircle className="w-3 h-3" />;
      case 'In Progress': return <Clock className="w-3 h-3" />;
      case 'Reported': return <AlertTriangle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Civic Reporter
        </h3>
        <Badge variant="outline">Community Powered</Badge>
      </div>

      {/* Report Form */}
      <Card className="border-l-4 border-l-accent">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Report a Civic Issue</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Issue title (e.g., Street light not working)"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-sm"
              />
            </div>

            <div>
              <Textarea
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="text-sm min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="sanitation">Sanitation</SelectItem>
                  <SelectItem value="traffic">Traffic</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                </SelectContent>
              </Select>

              <Select value={formData.severity} onValueChange={(value) => setFormData({ ...formData, severity: value })}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Input
                placeholder="Location (e.g., MG Road, Bangalore)"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="text-sm"
              />
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Camera className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <MapPin className="w-4 h-4 mr-2" />
                Use GPS
              </Button>
            </div>

            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Recent Community Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentReports.map((report) => (
            <div key={report.id} className="p-3 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-start justify-between">
                <h5 className="font-medium text-sm">{report.title}</h5>
                <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                  {getStatusIcon(report.status)}
                  <span className="ml-1">{report.status}</span>
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {report.location}
                </div>
                <span>{report.timestamp}</span>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full">
            View All Reports
          </Button>
        </CardContent>
      </Card>

      {/* Community Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Community Impact</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">247</div>
            <div className="text-xs text-muted-foreground">Reports This Month</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">189</div>
            <div className="text-xs text-muted-foreground">Issues Resolved</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};