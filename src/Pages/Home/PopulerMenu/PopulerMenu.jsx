import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';
import MenuCategory from '../../Menu/MenuCategory/MenuCategory';
import popularImg from '../../../assets/menu/banner3.jpg';

const PopulerMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === "popular")

    return (
        <section className='mb-12 mt-20'>
            <SectionTitle
                heading={"From Our Menu"}
                subheading={"Popular Items"}
            ></SectionTitle>
            <MenuCategory items={popular} coverImg={popularImg} title={"Popular"} subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>
            <div className="text-center">
            <button className="btn btn-outline border-0 border-b-4 mt-4">View Full Menu</button>
            </div>
            
        </section>
    );
};

export default PopulerMenu;