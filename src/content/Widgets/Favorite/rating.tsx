import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import { HttpClient } from '@/services/http-client';
import { AppKey } from '@/constant/key';
import appColor from '@/theme/appColor';

export const PeopleRate = {
  number: 100,
  default: 1
};

const RatingDialog = ({ roomId, rateId, open, onClose }) => {
  const http = new HttpClient();
  const [selectedRating, setSelectedRating] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const uid = localStorage.getItem(AppKey.userId);
      setUserId(uid);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    setSelectedRating(0);
  }, [open]);

  const toggleRating = async (rating: number) => {
    if (!userId) return;

    setSelectedRating(rating);

    const rate = await http.get(`UserRate`);
    const isRate = rate.find((item: any) => item.id === rateId);

    try {
      if (isRate) {
        await http.put(`UserRate/${isRate.id}`, {
          rating: rating.toString()
        });
      } else {
        await http.post(`UserRate`, {
          userId,
          roomId,
          rating: rating.toString()
        });
      }
    } catch (error) {
      console.error('Rating error:', error);
    } finally {
      onClose();
      setSelectedRating(0);
    }
  };

  if (!userId) return null;

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
