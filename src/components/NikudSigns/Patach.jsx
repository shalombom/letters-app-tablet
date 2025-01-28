export default function Patach() {
    return (
      <svg 
        width="30" 
        height="30"
        viewBox="0 0 30 30"
        style={{
          position: 'absolute',
          top: '90%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <line
          x1="8"
          y1="15"
          x2="22"
          y2="15"
          stroke="black"
          strokeWidth="2.5"
        />
      </svg>
    );
  }