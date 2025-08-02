import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { CrisisEvent } from '@/data/mockData';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapContainerProps {
  events: CrisisEvent[];
  selectedEvent?: CrisisEvent;
  onEventSelect: (event: CrisisEvent) => void;
}

export const MapContainer = ({ events, selectedEvent, onEventSelect }: MapContainerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f97316';
      case 'Low': return '#eab308';
      default: return '#6b7280';
    }
  };

  const getEventTypeIcon = (eventType: string) => {
    const iconMap: Record<string, string> = {
      'Flood': '🌊',
      'Heatwave': '🌡️',
      'Cyclone': '🌀',
      'Health Alert': '🏥',
      'Civic Issue': '🏛️',
      'Earthquake': '⚡',
      'Drought': '🏜️'
    };
    return iconMap[eventType] || '⚠️';
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on India
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true
    }).setView([20.5937, 78.9629], 5);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new markers for events
    events.forEach(event => {
      const color = getSeverityColor(event.severity);
      const icon = getEventTypeIcon(event.eventType);
      
      // Create custom icon with enhanced styling
      const customIcon = L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            border: 3px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.3), ${selectedEvent?.id === event.id ? '0 0 0 4px #fbbf24' : '0 0 0 0px transparent'};
            transition: all 0.3s ease;
            cursor: pointer;
            ${selectedEvent?.id === event.id ? 'transform: scale(1.3); z-index: 1000;' : ''}
            ${event.severity === 'High' ? 'animation: pulse 2s infinite;' : ''}
          ">
            ${icon}
          </div>
        `,
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = L.marker([event.location.lat, event.location.lng], { icon: customIcon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(`
          <div style="font-family: system-ui; min-width: 220px; max-width: 300px;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <h3 style="margin: 0; font-weight: bold; color: ${color}; flex: 1;">
                ${event.title}
              </h3>
              ${event.severity === 'High' ? '<div style="width: 8px; height: 8px; background: #ef4444; border-radius: 50%; animation: pulse 2s infinite;"></div>' : ''}
            </div>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280; line-height: 1.4;">
              ${event.description}
            </p>
            <div style="display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap;">
              <span style="
                background-color: ${color}; 
                color: white; 
                padding: 3px 8px; 
                border-radius: 12px; 
                font-size: 11px;
                font-weight: 600;
              ">
                ${event.severity}
              </span>
              <span style="
                background-color: #f3f4f6; 
                color: #374151; 
                padding: 3px 8px; 
                border-radius: 12px; 
                font-size: 11px;
              ">
                ${event.eventType}
              </span>
              <span style="
                background-color: ${event.status === 'Active' ? '#ef4444' : event.status === 'Monitoring' ? '#f97316' : '#22c55e'}; 
                color: white; 
                padding: 3px 8px; 
                border-radius: 12px; 
                font-size: 11px;
              ">
                ${event.status}
              </span>
            </div>
            <div style="font-size: 12px; color: #9ca3af; line-height: 1.3;">
              <div><strong>📍 Location:</strong> ${event.location.name}, ${event.location.state}</div>
              <div><strong>📰 Source:</strong> ${event.source}</div>
              <div><strong>🕐 Time:</strong> ${new Date(event.timestamp).toLocaleString()}</div>
              ${event.affectedAreas.length > 0 ? `<div><strong>🌍 Affected Areas:</strong> ${event.affectedAreas.join(', ')}</div>` : ''}
            </div>
          </div>
        `, {
          maxWidth: 300,
          className: 'custom-popup'
        })
        .on('click', () => {
          onEventSelect(event);
        })
        .on('mouseover', function() {
          this.openPopup();
        });

      markersRef.current.push(marker);
    });
  }, [events, selectedEvent, onEventSelect]);

  // Center map on selected event
  useEffect(() => {
    if (selectedEvent && mapInstanceRef.current) {
      mapInstanceRef.current.setView(
        [selectedEvent.location.lat, selectedEvent.location.lng], 
        8,
        { animate: true }
      );
    }
  }, [selectedEvent]);

  return (
    <div className="w-full h-full">
      <div 
        ref={mapRef} 
        className="w-full h-full leaflet-container"
        style={{ minHeight: '500px' }}
      />
    </div>
  );
};