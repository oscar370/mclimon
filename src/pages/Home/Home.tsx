import BackgroundWrapper from "./components/BackgroundWrapper";
import HeroInfo from "./components/HeroInfo";
import Logo from "./components/Logo";

export default function Home() {
  return (
    <>
      <BackgroundWrapper>
        <div className="relative z-1 flex h-dvh items-center justify-center">
          <main className="max-w-150 space-y-3">
            <Logo />

            <HeroInfo />
          </main>
        </div>
      </BackgroundWrapper>
    </>
  );
}
