export default function PatachSign() {
    return (
      <svg 
        width="30" 
        height="30"
        viewBox="0 0 30 30"
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '4px'
        }}
      >
        <path
          d="M5 15 L25 15"
          stroke="black"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    );
  }