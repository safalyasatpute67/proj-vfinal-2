import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Filter, BarChart3 } from 'lucide-react';

interface EventFiltersProps {
  totalEvents: number;
  activeEvents: number;
  onClearFilters: () => void;
}

export const EventFilters = ({ totalEvents, activeEvents, onClearFilters }: EventFiltersProps) => {
  return (
    <Card className="hover-scale">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-semibold">{totalEvents}</span>
              <span className="text-muted-foreground"> events</span>
            </div>
          </div>
          
          <div className="h-4 w-px bg-border"></div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="text-sm">
              <span className="font-semibold text-destructive">{activeEvents}</span>
              <span className="text-muted-foreground"> active</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="hover-scale"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};