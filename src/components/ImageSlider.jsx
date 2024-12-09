import React from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function ImageSlider({ images }) {
  const defaultImages = [
    'https://via.placeholder.com/800x400',
    'https://via.placeholder.com/800x400',
    'https://via.placeholder.com/800x400',
  ];

  images = images || defaultImages;

  return (
    <Box sx={{ maxWidth: '1300px', margin: 'auto', padding: '20px',
      '.swiper-button-next, .swiper-button-prev': {
        height: '3rem',
        width: '3rem',
        background: 'black',
        opacity: '0.5',
        borderRadius: '3rem'
      },
      '.swiper-button-next:after, .swiper-button-prev:after': {
        fontSize: '1rem',
        color: 'white',
        fontWeight: 800
      },
      '.swiper-pagination-bullet': {
        height: '0.75rem',
        width: '0.75rem'
      },
      '.swiper-pagination-bullet-active': {
        background: 'rgba(238,184,40,1)',
      }
     }}>
      <Swiper
        modules={[Pagination, Navigation]}
        navigation={true}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={image}
              alt={`Slide ${index + 1}`}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default ImageSlider;