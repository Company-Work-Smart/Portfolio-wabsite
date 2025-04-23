import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import { HttpClient } from '@/services/http-client';
import { AppKey } from '@/constant/key';
import appColor from '@/theme/appColor';

const http = new HttpClient();

const RatingDialog = ({ roomId, rateId, open, onClose }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserId(localStorage.getItem(AppKey.userId));
    }
  }, []);

  if (!userId) return null; 

  const toggleRating = async (rating: number) => {
    if (!roomId) return;

    try {
      setSelectedRating(rating);
      if (rateId) {
        await http.put(`UserRate/${rateId}`, { rating: rating.toString() });
      } else {
        await http.post(`UserRate`, {
          userId,
          roomId,
          rating: rating.toString(),
        });
      }

      onClose();
    } catch (error) {
      console.error('Error toggling rating:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ position: 'relative', textAlign: 'center' }}>
        <Typography variant="subtitle1" gutterBottom>
          Rate this Room
        </Typography>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <IconButton key={star} onClick={() => toggleRating(star)}>
              {selectedRating >= star ? (
                <FaStar style={{ color: appColor.star }} />
              ) : (
                <FaRegStar />
              )}
            </IconButton>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;

export const renderStars = (rating: number) => {
  const finalRating = isNaN(rating) ? 0 : rating;
  return [...Array(5)].map((_, i) => (
    <span key={i} style={{ marginRight: '4px' }}>
      {i < finalRating ? (
        <FaStar style={{ color: appColor.star, fontSize: 16 }} />
      ) : (
        <FaRegStar style={{ fontSize: 16 }} />
      )}
    </span>
  ));
};
