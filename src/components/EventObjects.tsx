import React from 'react';

interface EventObjectsProps {
  title: string;
  description: string;
  date: string;
  location?: string | null;
  image_url?: string | null;
}

const EventObjects: React.FC<EventObjectsProps> = ({ title, description, date, location, image_url }) => {
  return (
    <div className="event-card border rounded-lg shadow-md p-4">
      {image_url && (
        <img src={image_url} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
      )}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-2">{new Date(date).toLocaleDateString()}</p>
      {location && <p className="text-sm text-gray-500 mb-2">{location}</p>}
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default EventObjects;