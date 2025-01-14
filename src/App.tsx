import { useCallback, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Navigation, Keyboard } from "swiper/modules";
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

  const [activeIndex, setActiveIndex] = useState<number>(0)
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

    const handleKeyDown = (event:KeyboardEvent) => {
      console.log("Key pressed:", event.key);
      if (event.key === "ArrowLeft") {
        console.log("Left arrow pressed!");
      } else if (event.key === "ArrowRight") {
        console.log("Right arrow pressed!");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };    
    
  }, [])

  return (
    <main>
      <h1>Restaurant Collection</h1>

      {isLoading && <div className='loader-wrapper'><span></span></div>}

      {/* Swiper Demos: https://swiperjs.com/demos */}
      <Swiper 
        spaceBetween={10}
        breakpoints={{
          320: { slidesPerView: 1 }, 
          800: { slidesPerView: 3 }, 
          1300: { slidesPerView: 5 },
        }}
        ref={sliderRef}
        centeredSlides={true}
        slidesOffsetBefore={0}
        scrollbar={{ draggable: true }}   
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        modules={[Keyboard]}        
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}             
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
          <button className={`swiper-button-prev ${activeIndex ===  0 ? "hidden" : ""}`} onClick={handlePrev}>
            <GrPrevious size={50} />
          </button>
          <button className={`swiper-button-next ${activeIndex ===  data.length-1 ? "hidden" : ""}`} onClick={handleNext}>
            <GrNext size={50} />
          </button>          
        </div>
      </Swiper>
    </main>     
  )
}

export default App
