export default function HeroSection() {
    const stats = [
        { number: "2012", title: "FOUNDED" },
        { number: "40K+", title: "GRADUATES" },
        { number: "50+", title: "PARTNER COMPANIES" },
        { number: "5", title: "BRANCHES" },
        { number: "20", title: "DIPLOMAS AVAILABLE" },
    ];
    return (
        <section className="max-w-2xl">
            <h1 className="text-5xl font-extrabold text-[#1F2F97]">
                Route Posts
            </h1>
            <p className="mt-4 max-w-lg text-xl leading-9 text-gray-800">
                Connect with friends and the world around you on Route Posts.
            </p>
            <div className="mt-8 rounded-2xl border border-[#D8DEFD] bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-[3px] text-[#2437B6]">
                    About Route Academy
                </span>
                <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900">
                    Egypt's Leading IT Training Center Since 2012
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-gray-600">
                    Route Academy is the premier IT training center in Egypt,
                    established in 2012. We specialize in delivering high-quality
                    training courses in programming, web development, and application
                    development. We've identified the unique challenges people may face
                    when learning new technology and made efforts to provide strategies
                    to overcome them.
                </p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {stats.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-xl border border-[#D8DEFD] bg-[#F8F9FF] p-4"  >
                            <h3 className="text-2xl font-bold text-[#2437B6]">
                                {item.number}
                            </h3>
                            <p className="mt-1 text-xs font-bold uppercase leading-5 text-gray-600">
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}