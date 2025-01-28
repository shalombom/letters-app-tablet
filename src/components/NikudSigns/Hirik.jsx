export default function Hirik({ scale = 1 }) {
    return (
      <svg 
        width="30" 
        height="30" 
        viewBox="0 0 30 30"
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: `translateX(-50%) scale(${scale})`,
          marginTop: '1px'
        }}
      >
        <circle
          cx="15"
          cy="10"
          r="4"
          fill="black"
        />
      </svg>
    );
  }