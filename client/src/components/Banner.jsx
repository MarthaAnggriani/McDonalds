export default function Banner() {
    return (
        <section>
            <div className="flex bg-cream p-8 items-center">
                <div className="w-1/2">
                    <h1 className="text-gray-500 font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4">
                        Nikmati menu <br />pilihan terbaik
                    </h1>
                    {/* Isi lain yang mungkin Anda ingin tambahkan */}
                </div>
                <div className="w-1/2 flex justify-end">
                    <img src="https://mcdonalds.co.id/assets/img/menu/menu-pages.png" alt="" className="w-full h-auto" />
                </div>
            </div>
        </section>
    );
}
