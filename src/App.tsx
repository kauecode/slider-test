import { useCallback, useEffect, useRef, useState } from 'react'
import './App.scss'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import axios from 'axios';
import { GrNext, GrPrevious } from 'react-icons/gr';

interface Restaurant {
  images: string[],
  overview: string,
  name: string,
  websiteUrl: string,
  id: string,
}

function App() {

  const [data, setData] = useState<Restaurant[]>([]);

  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => { 
    
    // Fake api call
    // Got local json to work, 
    // needed to be in the public folder ;)
    axios.get("/data.json")
    .then(res => {
      console.log(res.data);
      setData(res.data.dining.restaurants)
    })
    .catch(err => {
      console.error("Error:", err);
    });    
    
  }, [])

  return (
    <>     
      <h1>Restaurant Collection</h1>
      <Swiper   
        spaceBetween={10}
        breakpoints={{
          320: { slidesPerView: 1.5 }, 
          640: { slidesPerView: 2.5 }, 
          1024: { slidesPerView: 3.5 },
        }}
        ref={sliderRef}
        slidesOffsetBefore={200}
        scrollbar={{ draggable: true }}        
      >
        {data.map((item, i) => 
          <SwiperSlide key={i}>
            <div className='slider-restaurants-item'>
                <div className='image-wrapper'>
                  <img src={item.images[0]} alt='Photo from {item.name}' />
                </div>
                <div className='text-wrapper'>
                  <p>{item.name}</p>
                  <a className='btn' href={item.websiteUrl} target='_blank'>book a table</a>
                </div>
            </div>            
          </SwiperSlide>
        )}
        <div className='nav-wrapper'>
          <button className="swiper-button-prev" onClick={handlePrev}>
            <GrPrevious size={50} />
          </button>
          <button className="swiper-button-next" onClick={handleNext}>
            <GrNext size={50} />
          </button>          
        </div>
      </Swiper>
    </>
  )
}

export default App
