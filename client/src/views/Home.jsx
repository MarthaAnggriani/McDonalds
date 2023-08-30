import Promo from "../components/Promo";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <>
            {/* carousel */}
            <section>
                <img src="./src/assets/slider.jpg" alt="" />
            </section>

            {/* Promo */}
            <Promo />
            <Footer />
        </>
    )
}