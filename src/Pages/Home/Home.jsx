import { Helmet } from 'react-helmet-async';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import Featured from './Featured/Featured';
import PopulerMenu from './PopulerMenu/PopulerMenu';
import Testimonial from './Testimonial/Testimonial';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopulerMenu></PopulerMenu>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;