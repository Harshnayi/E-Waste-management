import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Clock, Star, Navigation, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Map } from "@/components/Map";

const mockFacilities = [
  {
    id: 1,
    name: "Surat E-Waste Recycling Center",
    address: "Plot No. 45, GIDC Pandesara, Surat, Gujarat 394221",
    phone: "+91 261 289 1234",
    hours: "Mon-Sat: 9AM-6PM",
    rating: 4.8,
    distance: "2.5 km",
    services: ["Industrial E-Waste", "Batteries", "Appliances"],
    lat: 21.1445,
    lng: 72.8094,
  },
  {
    id: 2,
    name: "Diamond City Eco-Solutions",
    address: "Varachha Main Rd, Surat, Gujarat 395006",
    phone: "+91 261 254 5678",
    hours: "Mon-Sat: 10AM-8PM",
    rating: 4.6,
    distance: "3.2 km",
    services: ["Consumer Electronics", "IT Asset Disposal"],
    lat: 21.2049,
    lng: 72.8406,
  },
  {
    id: 3,
    name: "Gujarat Envro Protection Hub",
    address: "Hazira Road, Ichchhapor, Surat, Gujarat 394510",
    phone: "+91 261 272 8901",
    hours: "24/7 (For Bulk)",
    rating: 4.9,
    distance: "12 km",
    services: ["E-Waste Dismantling", "Hazardous Waste"],
    lat: 21.1633,
    lng: 72.6853,
  },
  {
    id: 4,
    name: "Adajan Green Hub",
    address: "LP Savani Rd, Adajan, Surat, Gujarat 395009",
    phone: "+91 261 278 3456",
    hours: "Mon-Fri: 9AM-5PM",
    rating: 4.7,
    distance: "1.5 km",
    services: ["Home Appliances", "Mobile Recycling"],
    lat: 21.1856,
    lng: 72.7933,
  },
  {
    id: 5,
    name: "Surat Municipal Corporation E-Waste Unit",
    address: "Khatodara, Surat, Gujarat 395002",
    phone: "+91 261 223 4567",
    hours: "Mon-Sat: 10AM-5PM",
    rating: 4.5,
    distance: "4.5 km",
    services: ["General E-Waste", "Public Collection"],
    lat: 21.1685,
    lng: 72.8258,
  },
  {
    id: 6,
    name: "Vesu Tech Recyclers",
    address: "Vesu Main Rd, Vesu, Surat, Gujarat 395007",
    phone: "+91 261 290 8877",
    hours: "Mon-Sat: 9AM-7PM",
    rating: 4.4,
    distance: "6.0 km",
    services: ["IT Hardware", "Telecom Waste"],
    lat: 21.1388,
    lng: 72.7754,
  },
  {
    id: 7,
    name: "Palanpur Eco-Waste Point",
    address: "Palanpur Canal Rd, Surat, Gujarat 395005",
    phone: "+91 261 277 4433",
    hours: "Mon-Sat: 9AM-6PM",
    rating: 4.6,
    distance: "5.2 km",
    services: ["Household E-Waste", "Lamps"],
    lat: 21.2166,
    lng: 72.7885,
  },
  {
    id: 8,
    name: "Udhana Industrial Recyclers",
    address: "Udhana GIDC, Surat, Gujarat 394210",
    phone: "+91 261 266 1122",
    hours: "Mon-Fri: 10AM-6PM",
    rating: 4.3,
    distance: "8.5 km",
    services: ["Industrial Scrap", "Cables"],
    lat: 21.1528,
    lng: 72.8425,
  },
];

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Facilities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFacility, setSelectedFacility] = useState<typeof mockFacilities[0] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  const facilitiesWithDistance = mockFacilities.map(f => ({
    ...f,
    distanceValue: userLocation ? getDistance(userLocation[0], userLocation[1], f.lat, f.lng) : null,
    distanceDisplay: userLocation
      ? `${getDistance(userLocation[0], userLocation[1], f.lat, f.lng).toFixed(1)} km`
      : f.distance
  }));

  const filteredFacilities = facilitiesWithDistance
    .filter(
      (facility) =>
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (a.distanceValue || 0) - (b.distanceValue || 0));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
              E-Waste <span className="text-gradient">Locator</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">
              Smart discovery of certified recycling facilities with real-time distance tracking.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                <Search className="ml-4 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, address or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 bg-transparent h-14 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                />
                <Button className="mr-2 rounded-lg h-10 px-6 gap-2">
                  <Navigation className="w-4 h-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Map */}
            <div className="order-2 lg:order-1">
              <div className="card-elevated rounded-3xl h-[550px] overflow-hidden border border-border shadow-2xl relative">
                <Map
                  facilities={filteredFacilities}
                  userLocation={userLocation}
                  onFacilityClick={(f) => setSelectedFacility(mockFacilities.find(mf => mf.id === f.id) || null)}
                />
              </div>
            </div>

            {/* Facility List */}
            <div className="order-1 lg:order-2 space-y-5 h-[550px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-foreground">Nearby Facilities</h2>
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full text-xs">
                  {filteredFacilities.length} Results
                </span>
              </div>
              {filteredFacilities.map((facility, index) => (
                <div
                  key={facility.id}
                  className={`glass-card rounded-2xl p-6 animate-fade-up cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${selectedFacility?.id === facility.id ? "ring-2 ring-primary bg-primary/5" : ""
                    }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setSelectedFacility(facility)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                        {facility.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(facility.rating) ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-muted-foreground">{facility.rating} Rating</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-primary leading-none">{facility.distanceDisplay}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">distance</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground mb-6">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{facility.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      <span>{facility.hours}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/10">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                      <Navigation className="w-3 h-3 mr-2" />
                      Directions
                    </a>
                    <div className="w-8 h-8 rounded-full bg-emerald-light/30 flex items-center justify-center text-primary">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Facilities;
