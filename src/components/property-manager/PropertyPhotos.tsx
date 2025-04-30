
import React from 'react';

interface Photo {
  id: number;
  url: string;
  caption: string;
}

interface PropertyPhotosProps {
  photos: Photo[];
}

export function PropertyPhotos({ photos }: PropertyPhotosProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <div key={photo.id} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <img 
            src={photo.url} 
            alt={photo.caption} 
            className="w-full h-60 object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3">
            <p className="text-sm font-medium">{photo.caption}</p>
          </div>
        </div>
      ))}
      {photos.length === 0 && (
        <div className="col-span-full text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No photos available. Upload some photos to get started.</p>
        </div>
      )}
    </div>
  );
}
