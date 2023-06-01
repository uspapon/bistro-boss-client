import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <section className='featured-item bg-fixed text-white pt-8 my-20'>
            <SectionTitle
                heading={"Featured Item"}
                subheading={"Check it Out"}
            ></SectionTitle>
            <div className='md:flex justify-center items-center bg-slate-500 bg-opacity-60 pb-20 pt-12 px-36'>
                <div>
                <img src={featuredImg} alt="" />
                </div>
                <div className='md:ml-10 '>
                    <p>Aug 20, 2029</p>
                    <p className='uppercase'>Wher can I get some</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam vitae repellat eligendi nulla quia dolor iusto error inventore eum laboriosam tenetur qui numquam nihil ducimus ipsum, quae ratione sed suscipit. Aut, totam voluptates ducimus similique ipsam aspernatur dignissimos magni excepturi architecto perferendis quas dolorum modi sed. Nostrum nisi rerum veritatis.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </section>
    );
};

export default Featured;