import { HttpClient } from '@/services/http-client';
import { AppKey } from '@/constant/key';

export const toggleFavorite = async (roomId: string, favoriteId: string) => {
  const http = new HttpClient();
  const userId = localStorage.getItem(AppKey.userId);
  if (!userId) return;

  const favorites = await http.get(`UserFavorite`);
  const isFavorite = favorites.find((fav: any) => fav.id === favoriteId);
  if (isFavorite) {
    await http.delete(`UserFavorite/${isFavorite.id}`);
  } else {
    await http.post(`UserFavorite`, {
      userId,
      roomId,
      save: 'save'
    });
  }
};
