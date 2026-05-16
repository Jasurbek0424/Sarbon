import Image from "next/image";

export function SarbonLogo({
  className,
  width = 110,
  height = 28,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src="/sarbon-logo.png"
      alt="Sarbon"
      width={width}
      height={height}
      priority
      className={className}
      style={{ width: "auto", height: "auto" }}
    />
  );
}
