import SectionTitle from '../../../components/SectionTitle/SectionTitle';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { useEffect, useState } from 'react';

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <section className='my-20'>
            <SectionTitle heading={"Testimonials"} subheading={"What Our Clients Says"}></SectionTitle>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
            >

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >

                        <div className='mx-24 my-16 flex flex-col items-center'>
                            <Rating
                                style={{ maxWidth: 150, padding: 20 }}
                                value={review.rating}
                            />
                            <FaQuoteLeft style={{ fontSize: 50 }} />
                            <p className='py-5'>{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.name}</h3>

                        </div>
                    </SwiperSlide>)
                }
            </Swiper>

        </section>
    );
};

export default Testimonial;