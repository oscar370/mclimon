type BackgroundWrapperProps = {
  children: React.ReactNode;
};

export default function BackgroundWrapper({
  children,
}: BackgroundWrapperProps) {
  return (
    <div className="grid-wrapper">
      {children}
      <div className="grid-background"></div>
    </div>
  );
}
