import { useState, useEffect } from 'react';

const STORAGE_KEY = 'repSpheres-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (doctor) => {
    setFavorites(prev => {
      // Check if already favorited
      if (prev.some(fav => fav.id === doctor.id)) {
        return prev;
      }
      return [...prev, { ...doctor, favoritedAt: new Date().toISOString() }];
    });
  };

  const removeFavorite = (doctorId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== doctorId));
  };

  const toggleFavorite = (doctor) => {
    const isFavorited = favorites.some(fav => fav.id === doctor.id);
    if (isFavorited) {
      removeFavorite(doctor.id);
    } else {
      addFavorite(doctor);
    }
  };

  const isFavorited = (doctorId) => {
    return favorites.some(fav => fav.id === doctorId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorited
  };
};