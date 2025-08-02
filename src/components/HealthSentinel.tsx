import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { healthStats } from '@/data/mockData';
import { 
  Heart, 
  Thermometer, 
  Droplets, 
  Wind, 
  Hospital, 
  TrendingUp,
  AlertCircle,
  Activity
} from 'lucide-react';

export const HealthSentinel = () => {
  const healthIndicators = [
    {
      label: 'Air Quality Index',
      value: 178,
      max: 300,
      status: 'Poor',
      color: 'bg-destructive',
      icon: <Wind className="w-4 h-4" />
    },
    {
      label: 'Water Quality Score',
      value: 72,
      max: 100,
      status: 'Good',
      color: 'bg-success',
      icon: <Droplets className="w-4 h-4" />
    },
    {
      label: 'Heat Index',
      value: 41,
      max: 50,
      status: 'High',
      color: 'bg-warning',
      icon: <Thermometer className="w-4 h-4" />
    }
  ];

  const diseaseOutbreaks = [
    { disease: 'Dengue', cases: 142, trend: '+12%', region: 'Delhi NCR' },
    { disease: 'Chikungunya', cases: 67, trend: '+8%', region: 'Mumbai' },
    { disease: 'Malaria', cases: 89, trend: '-5%', region: 'Kolkata' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <Heart className="w-5 h-5 mr-2" />
          Health Sentinel
        </h3>
        <Badge variant="outline">Live Monitoring</Badge>
      </div>

      {/* Health Indicators */}
      <Card className="border-l-4 border-l-accent">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Health Indicators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {healthIndicators.map((indicator, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {indicator.icon}
                  <span className="text-sm font-medium">{indicator.label}</span>
                </div>
                <Badge 
                  variant={indicator.status === 'Good' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {indicator.status}
                </Badge>
              </div>
              <div className="space-y-1">
                <Progress 
                  value={(indicator.value / indicator.max) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{indicator.value}</span>
                  <span>Max: {indicator.max}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Disease Outbreaks */}
      <Card className="border-l-4 border-l-warning">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Disease Outbreak Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {diseaseOutbreaks.map((outbreak, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{outbreak.disease}</span>
                  <span className="text-xs text-muted-foreground">{outbreak.region}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{outbreak.cases} cases</span>
                  <span className={`text-xs flex items-center ${
                    outbreak.trend.startsWith('+') ? 'text-destructive' : 'text-success'
                  }`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {outbreak.trend}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full">
            View Detailed Reports
          </Button>
        </CardContent>
      </Card>

      {/* Hospital Capacity */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Hospital className="w-4 h-4 mr-2" />
            Hospital Capacity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Overall Capacity</span>
            <Badge variant="secondary">{healthStats.hospitalCapacity}</Badge>
          </div>
          <Progress value={78} className="h-2" />
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center p-2 bg-muted/50 rounded">
              <div className="font-medium">ICU Beds</div>
              <div className="text-muted-foreground">67% Full</div>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <div className="font-medium">General Beds</div>
              <div className="text-muted-foreground">81% Full</div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Find Nearby Hospital
          </Button>
        </CardContent>
      </Card>

      {/* Health Tips */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Today's Health Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm">
            • Stay hydrated - drink 3-4 liters of water daily
          </div>
          <div className="text-sm">
            • Avoid outdoor activities between 12-4 PM
          </div>
          <div className="text-sm">
            • Use N95 masks in high pollution areas
          </div>
        </CardContent>
      </Card>
    </div>
  );
};