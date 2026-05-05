import { Box, Container, Skeleton } from '@mui/material';
import { TextWidget } from '@/components/Text';
import { useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import { ChipWidget } from '@/components/Chip';

export const SkillSection = () => {
  const http = new HttpClient();
  const [skill, setSkill] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getSkill = async () => {
    try {
      setLoading(true);
      const res = await http.get('language/skill');
      setSkill(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSkill();
  }, []);

  return (
    <Box sx={{ py: 8, background: 'rgba(255,255,255,0.02)' }}>
      <Container maxWidth="lg">
        <TextWidget bold size={20} align="center" sx={{ mb: 6 }}>
          Skills & Technologies
        </TextWidget>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={80}
                  height={32}
                  sx={{ borderRadius: '16px' }}
                />
              ))
            : skill.map((s, i) => <ChipWidget key={i} label={s.language} />)}
        </Box>
      </Container>
    </Box>
  );
};

export default SkillSection;
