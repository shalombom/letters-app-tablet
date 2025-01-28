export default function VavHolam() {
    return (
      <svg 
        width="30" 
        height="70" 
        viewBox="0 0 30 70"
        style={{
          position: 'absolute',
          top: '50%',
          left: '-10px',
          transform: 'translate(-50%, -50%)',
          marginTop: '0'
        }}
      >
        <path
          d="M15 15 V56"
          stroke="black"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="15"
          cy="6"
          r="4"
          fill="black"
        />
      </svg>
    );
  }