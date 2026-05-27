export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Globe icon */}
      <circle cx="20" cy="20" r="16" stroke="white" strokeWidth="1.5" />
      <ellipse cx="20" cy="20" rx="7" ry="16" stroke="white" strokeWidth="1.5" />
      <line x1="4" y1="20" x2="36" y2="20" stroke="white" strokeWidth="1.5" />
      <line x1="6" y1="12" x2="34" y2="12" stroke="white" strokeWidth="1.5" />
      <line x1="6" y1="28" x2="34" y2="28" stroke="white" strokeWidth="1.5" />

      {/* REAL text */}
      <text
        x="46"
        y="27"
        fontFamily="monospace"
        fontSize="18"
        fontWeight="700"
        fill="white"
        letterSpacing="2"
      >
        РЕАЛ
      </text>

      {/* ГРУПП text — subtle */}
      <text
        x="46"
        y="38"
        fontFamily="monospace"
        fontSize="9"
        fill="white"
        opacity="0.5"
        letterSpacing="3"
      >
        ГРУПП
      </text>
    </svg>
  );
};
