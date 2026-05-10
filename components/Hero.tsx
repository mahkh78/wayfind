import HeroArt from "./HeroArt";
import HeroForm from "./HeroForm";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-wrap">
        <div className="hero-bg"/>
        <div className="shell" style={{ position: "relative" }}>
          <HeroArt/>
          <span className="eyebrow">v1.2 — now exporting to Apple Calendar</span>
          <h1>
            Your trip,<br/>
            planned in <span className="accent-plain" style={{ whiteSpace: "nowrap" }}>30 seconds.</span>
          </h1>
          <p className="lede">
            Tell Wayfind where you want to go and how long. Get a real itinerary with
            real places, real prices, real links. From a weekend to two weeks — built for people who want to do, not plan.
          </p>
          <HeroForm />
          <div className="trust-line">
            <span>Powered by Gemini</span>
            <span className="dot"/>
            <span>Real data from Google Search</span>
            <span className="dot"/>
            <span>No signup required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
