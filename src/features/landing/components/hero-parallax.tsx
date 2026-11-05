import { Parallax, ParallaxLayer } from "../../../components/parallax";

type HeroParallaxProps = {
  background?: React.ReactNode;
  children?: React.ReactNode;
};

export function HeroParallax({ background, children }: HeroParallaxProps) {
  return (
    <Parallax className="h-svh overflow-hidden">
      <ParallaxLayer className="absolute -inset-20" inverted>
        {background}
      </ParallaxLayer>

      <div className="relative z-10 flex size-full flex-col items-center justify-center">
        {children}
      </div>
    </Parallax>
  );
}
