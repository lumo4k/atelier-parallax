import { RevealText } from "./RevealText";
export function SectionHeading({
  eyebrow,
  heading,
}: {
  eyebrow: string;
  heading: string;
}) {
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <RevealText text={heading} className="section-title" />
    </>
  );
}
