// Custom pixel-art header: cracked hourglass, broken monitor, and floppy disk.
// Pure SVG with crisp-edges rendering so it reads as authentic pixel art.

export default function PixelHeaderArt() {
  // 1 unit = 1 pixel. SVG is upscaled via CSS width.
  // Three small 16x16 icons placed in a 64x18 viewBox.
  return (
    <svg
      viewBox="0 0 64 18"
      className="pixel-header-svg"
      width="100%"
      height="72"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ============== CRACKED HOURGLASS (x: 1..15) ============== */}
      {/* Frame top + bottom caps */}
      <g fill="#1a1a1a">
        <rect x="3" y="1" width="10" height="1" />
        <rect x="3" y="15" width="10" height="1" />
        {/* Side walls */}
        <rect x="3" y="2" width="1" height="13" />
        <rect x="12" y="2" width="1" height="13" />
        {/* Hourglass curve - upper triangle outline */}
        <rect x="4" y="2" width="8" height="1" fill="#1a1a1a" />
        <rect x="5" y="3" width="6" height="1" />
        <rect x="6" y="4" width="4" height="1" />
        <rect x="7" y="5" width="2" height="1" />
        {/* neck */}
        <rect x="7" y="8" width="2" height="1" />
        {/* lower triangle */}
        <rect x="7" y="11" width="2" height="1" />
        <rect x="6" y="12" width="4" height="1" />
        <rect x="5" y="13" width="6" height="1" />
        <rect x="4" y="14" width="8" height="1" />
      </g>
      {/* Sand grains falling */}
      <g fill="#c9a96e">
        <rect x="5" y="3" width="6" height="1" />
        <rect x="6" y="4" width="4" height="1" />
        <rect x="7" y="5" width="2" height="1" />
        <rect x="7" y="6" width="2" height="1" />
        <rect x="7" y="9" width="1" height="1" />
        <rect x="7" y="13" width="2" height="1" />
        <rect x="6" y="14" width="4" height="1" />
      </g>
      {/* Crack lines (white/highlight) */}
      <g fill="#e8dfc8">
        <rect x="4" y="3" width="1" height="1" />
        <rect x="5" y="4" width="1" height="1" />
        <rect x="6" y="5" width="1" height="1" />
        <rect x="5" y="6" width="1" height="1" />
        <rect x="6" y="7" width="1" height="1" />
      </g>

      {/* ============== BROKEN MONITOR (x: 22..40) ============== */}
      <g fill="#1a1a1a">
        {/* Outer bezel */}
        <rect x="22" y="2" width="18" height="1" />
        <rect x="22" y="11" width="18" height="1" />
        <rect x="22" y="2" width="1" height="10" />
        <rect x="39" y="2" width="1" height="10" />
        {/* Stand */}
        <rect x="29" y="12" width="4" height="1" />
        <rect x="30" y="13" width="2" height="1" />
        <rect x="26" y="14" width="10" height="1" />
      </g>
      {/* Screen interior */}
      <rect x="23" y="3" width="16" height="8" fill="#c9a96e" />
      {/* Glitch / static lines */}
      <g fill="#1a1a1a">
        <rect x="24" y="4" width="3" height="1" />
        <rect x="29" y="4" width="5" height="1" />
        <rect x="36" y="4" width="2" height="1" />
        <rect x="25" y="6" width="2" height="1" />
        <rect x="30" y="6" width="3" height="1" />
        <rect x="35" y="6" width="3" height="1" />
        <rect x="24" y="9" width="6" height="1" />
        <rect x="32" y="9" width="4" height="1" />
      </g>
      {/* Cracked glass diagonal */}
      <g fill="#e8dfc8">
        <rect x="26" y="3" width="1" height="1" />
        <rect x="27" y="4" width="1" height="1" />
        <rect x="28" y="5" width="1" height="1" />
        <rect x="29" y="5" width="1" height="1" />
        <rect x="30" y="7" width="1" height="1" />
        <rect x="31" y="8" width="1" height="1" />
        <rect x="32" y="7" width="1" height="1" />
        <rect x="33" y="8" width="1" height="1" />
        <rect x="34" y="10" width="1" height="1" />
        {/* Secondary crack */}
        <rect x="36" y="5" width="1" height="1" />
        <rect x="37" y="7" width="1" height="1" />
      </g>

      {/* ============== FLOPPY DISK (x: 47..62) ============== */}
      <g fill="#1a1a1a">
        {/* Outer shell */}
        <rect x="48" y="2" width="14" height="1" />
        <rect x="48" y="15" width="14" height="1" />
        <rect x="48" y="2" width="1" height="14" />
        <rect x="61" y="2" width="1" height="14" />
      </g>
      {/* Disk body fill */}
      <rect x="49" y="3" width="12" height="12" fill="#1a1a1a" />
      {/* Metal shutter */}
      <rect x="51" y="3" width="8" height="5" fill="#c9a96e" />
      {/* Shutter slot */}
      <rect x="54" y="4" width="2" height="3" fill="#1a1a1a" />
      {/* Label area */}
      <rect x="50" y="9" width="10" height="5" fill="#f4ecd8" />
      {/* Label lines */}
      <g fill="#1a1a1a">
        <rect x="51" y="10" width="8" height="1" />
        <rect x="51" y="12" width="5" height="1" />
      </g>
      {/* Corner notch */}
      <rect x="60" y="3" width="1" height="1" fill="#c9a96e" />
    </svg>
  );
}
