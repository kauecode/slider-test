import { useCallback, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import axios from 'axios';
import { GrNext, GrPrevious } from 'react-icons/gr';
import './App.scss'

interface Restaurant {
  images: string[],
  overview: string,
  name: string,
  websiteUrl: string,
  id: string,
}

function App() {

  const [data, setData] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    
    setIsLoading(true);
    
    // Fake api call
    axios.get("/data.json")
    .then(res => {
      setTimeout(() => {
        setData(res.data.dining.restaurants)
        setIsLoading(false)
      }, 1000)      
    })
    .catch(err => {
      console.error("Error:", err);
      setIsLoading(false)
    });    
    
  }, [])

  return (
    <>     
      <h1>Restaurant Collection</h1>

      {isLoading && <div className='loader-wrapper'><span></span></div>}

      <Swiper   
        spaceBetween={10}
        breakpoints={{
          320: { slidesPerView: 1 }, 
          640: { slidesPerView: 3 }, 
          1024: { slidesPerView: 5 },
        }}
        ref={sliderRef}
        centeredSlides={true}
        slidesOffsetBefore={0}
        scrollbar={{ draggable: true }}        
      >
        {data.map((item, i) => 
          <SwiperSlide key={i}>
            <div className='slider-item-wrapper'>
                <div className='image-wrapper'>
                  <img src={item.images[0]} alt='Photo from {item.name}' />
                </div>
                <div className='bottom-wrapper'>
                  <p>{item.name}</p>
                  <a className='btn' href={item.websiteUrl} target='_blank'>book a table</a>
                </div>
            </div>            
          </SwiperSlide>
        )}
        <div className='slider-nav-wrapper'>
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
