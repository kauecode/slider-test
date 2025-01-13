import { useEffect, useState } from 'react'
import './App.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import axios from 'axios';

interface Restaurant {
  images: string[],
  overview: string,
  name: string,
  websiteUrl: string,
  id: string,
}

function App() {

  const [data, setData] = useState<Restaurant[]>([]);

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
          640: { slidesPerView: 3.5 }, 
          1024: { slidesPerView: 4.5 },
        }}
        slidesOffsetBefore={200}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
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
                </div>
            </div>
            
          </SwiperSlide>
        )}
      

      </Swiper>

    </>
  )
}

export default App
