import Image from "next/image"

export const Hero = () => {
    return (
        <section className="relative h-screen min-w-full overflow-hidden">
            <Image
                src="/images/Hero-ryu.jpg"
                alt="Background"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>

            <div className="absolute inset-0 px-30 flex flex-col items-start justify-center">
                <h1 className="text-8xl uppercase font-serif font-semibold tracking-widest ">Nova Ryu</h1>
                <p className="text-3xl font-serif text-white mt-4">Escola de artes marciais Japonesas.</p>
            </div>

            <div className="absolute text-9xl m-30 inset-0 flex flex-col items-end justify-start text-gradient-red gap-15">
                <span className="font-jp">武</span>
                <span className="font-jp">士</span>
                <span className="font-jp">道</span>
            </div>
        </section>
    )
}