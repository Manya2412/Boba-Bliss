import HowItWorksImgae from "../../assets/images/howItWorks.png";

function HowItWorks() {

    return (
        <section className="bg-white py-15" id="about">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-boba-primary uppercase tracking-[4px] font-semibold">
                        Simple  Process
                    </p>

                    <h2 className="font-heading text-5xl mt-4">
                        How It Works
                    </h2>
                </div>

                <div>
                    <img src={HowItWorksImgae} alt="HowItWorks" />
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;