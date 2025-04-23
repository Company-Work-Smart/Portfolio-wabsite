// services/favoriteService.ts

import { HttpClient } from '@/services/http-client';
import { AppKey } from '@/constant/key';

export const toggleFavorite = async (
  roomId: string,
  favoriteId: string,
  isFavorite: { [key: string]: boolean }
) => {
  const http = new HttpClient();
  const userId = localStorage.getItem(AppKey.userId);
  if (!userId) return;

  try {
    let updatedFavorites = { ...isFavorite };
    let wasAdded = false;
    if (isFavorite[roomId]) {
      await http.delete(`UserFavorite/${favoriteId}`);
      delete updatedFavorites[roomId];
      wasAdded = false;  
    } else {
      await http.post(`UserFavorite`, {
        userId,
        roomId,
        save: 'save'
      });
      updatedFavorites[roomId] = true;
      wasAdded = true; 
    }
    localStorage.setItem(AppKey.isFavorite, JSON.stringify(updatedFavorites));

    return { updatedFavorites, wasAdded };
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return { updatedFavorites: isFavorite, wasAdded: false };  
  }
};
