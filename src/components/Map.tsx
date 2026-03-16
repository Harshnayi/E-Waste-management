import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  facilities: any[];
  center?: [number, number];
  zoom?: number;
  userLocation?: [number, number] | null;
  onFacilityClick?: (facility: any) => void;
}

export const Map = ({
  facilities,
  center = [21.1702, 72.8311], // Default to Surat
  zoom = 12,
  userLocation,
}: MapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current).setView(center, zoom);
    mapRef.current = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Custom Icons
    const userIcon = L.divIcon({
      className: 'user-location-marker',
      html: `<div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
               <div class="w-2 h-2 bg-white rounded-full"></div>
             </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    const facilityIcon = L.divIcon({
      className: 'facility-marker',
      html: `<div class="w-8 h-8 bg-emerald-500 rounded-xl border-2 border-white shadow-lg flex items-center justify-center text-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
             </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    // Add User Marker
    if (userLocation) {
      L.marker(userLocation, { icon: userIcon }).addTo(map)
        .bindPopup("Your Current Location").openPopup();
    }

    // Add Facility Markers
    facilities.forEach((facility) => {
      L.marker([facility.lat, facility.lng], { icon: facilityIcon })
        .addTo(map)
        .bindPopup(`
          <div class="p-2">
            <h4 class="font-bold text-sm mb-1">${facility.name}</h4>
            <div class="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span class="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase">${facility.type || 'E-WASTE'}</span>
              <span>Available</span>
            </div>
            <button class="w-full mt-2 bg-primary text-white text-[10px] py-1.5 rounded-lg font-bold">Directions</button>
          </div>
        `);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full rounded-2xl z-0 shadow-inner"
      style={{ minHeight: "450px" }}
    />
  );
};
