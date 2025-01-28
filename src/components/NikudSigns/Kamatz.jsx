export default function Kamatz() {
  return (
    <svg 
      className="nikud-svg"
      width="30" 
      height="15"
      viewBox="0 0 30 15"
      style={{
        position: 'absolute',
        top: '100%',
        left: '10%',
        transform: 'translateX(-50%)',
      }}
    >
      <line
        x1="8"
        y1="9.5"
        x2="22"
        y2="9.5"
        stroke="black"
        strokeWidth="2.5"
      />
      <line
        x1="15"
        y1="9.5"
        x2="15"
        y2="25"
        stroke="black"
        strokeWidth="2.5"
      />
    </svg>
  );
}