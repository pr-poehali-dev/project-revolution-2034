import { useLang } from "@/lib/i18n";

export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  const { lang } = useLang();
  const isEn = lang === "en";

  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* World map image */}
      <image
        href="https://cdn.poehali.dev/projects/17ebc9d7-b892-431e-a0b0-87f4e8af47af/bucket/89802caf-d4c7-4ccc-8a75-35350764c291.png"
        x="0"
        y="2"
        width="56"
        height="36"
        preserveAspectRatio="xMidYMid meet"
        style={{ filter: "invert(1)" }}
      />

      {/* Main text */}
      <text
        x="64"
        y="27"
        fontFamily="monospace"
        fontSize="18"
        fontWeight="700"
        fill="white"
        letterSpacing="2"
      >
        {isEn ? "REAL" : "РЕАЛ"}
      </text>

      {/* Sub text */}
      <text
        x="64"
        y="38"
        fontFamily="monospace"
        fontSize="9"
        fill="white"
        opacity="0.5"
        letterSpacing="3"
      >
        {isEn ? "GROUP" : "ГРУПП"}
      </text>
    </svg>
  );
};
