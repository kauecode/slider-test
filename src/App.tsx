import { useEffect, useState } from 'react'
import './App.scss'
import { MOCK_DATA } from './mockData'
import { Swiper, SwiperSlide } from 'swiper/react'

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
    setData(MOCK_DATA.dining.restaurants)
    console.log(data);
  }, [])

  return (
    <>     
      <h1>Restaurant Collection</h1>
      <Swiper   
        spaceBetween={30}
        breakpoints={{
          320: { slidesPerView: 1.5 }, 
          640: { slidesPerView: 3.5 }, 
          1024: { slidesPerView: 4.5 },
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
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
