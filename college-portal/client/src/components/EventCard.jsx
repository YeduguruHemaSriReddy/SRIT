import React from "react";
import { MapPin, Clock } from "lucide-react";

const EventCard = ({ event }) => {
  // Safe date parsing
  const dateObj = event?.date ? new Date(event.date) : null;

  const day = dateObj && !isNaN(dateObj) ? dateObj.getDate() : "--";
  const month = dateObj && !isNaN(dateObj)
    ? dateObj.toLocaleString("default", { month: "short" })
    : "--";

  return (
    <div className="h-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col">
      
      {/* IMAGE / HEADER */}
      <div className="relative h-40 bg-gradient-to-br from-primary/20 to-orange-100">
        
        {/* DATE BADGE */}
        <div className="absolute top-4 right-4 bg-white rounded-xl shadow-md px-3 py-2 text-center">
          <div className="text-xl font-bold text-primary leading-none">{day}</div>
          <div className="text-xs uppercase text-gray-500 font-semibold">{month}</div>
        </div>

        {/* DEPARTMENT / TYPE */}
        {event?.department && (
          <span className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full shadow">
            {event.department}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 flex-grow flex flex-col">
        
        {/* TITLE */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 hover:text-primary transition-colors">
          {event?.title || "Untitled Event"}
        </h3>

        {/* META INFO */}
        <div className="space-y-2 text-sm text-gray-600">
          {event?.time && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{event.time}</span>
            </div>
          )}

          {event?.venue && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="line-clamp-1">{event.venue}</span>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        {event?.description && (
          <p className="text-sm text-gray-600 mt-3 line-clamp-3">{event.description}</p>
        )}

        {/* CTA */}
        <div className="mt-auto pt-4">
          <button className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
            View Details <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
