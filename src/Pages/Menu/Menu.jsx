import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import img from "../../assets/menu/banner3.jpg";
import PopulerMenu from "../Home/PopulerMenu/PopulerMenu";
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuCategory from "./MenuCategory/MenuCategory";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";

const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === "dessert")
    const pizza = menu.filter(item => item.category === "pizza")
    const salad = menu.filter(item => item.category === "salad")
    const soup = menu.filter(item => item.category === "soup")
    const offered = menu.filter(item => item.category === "offered")
    
    
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={img}
                    title={"Our Menu"}
                    subTitle={"Would you like to try a dish?"}
            ></Cover>
            {/* main cover */}
            <SectionTitle subheading={"Don't Miss"} heading={"Todays Offer"}></SectionTitle>
            {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert menu items */}
            <MenuCategory items={desserts} coverImg={dessertImg} title={"dessert"} subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>
            <MenuCategory items={pizza} coverImg={pizzaImg} title={"pizza"} subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>
            <MenuCategory items={salad} coverImg={saladImg} title={"salad"} subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>
            <MenuCategory items={soup} coverImg={soupImg} title={"soup"} subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>
            
        </div>
    );
};

export default Menu;