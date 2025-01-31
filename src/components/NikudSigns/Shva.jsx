export default function Shva() {
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
          marginTop: '5px'
        }}
      >
        <circle cx="15" cy="5" r="4" fill="black" />
        <circle cx="15" cy="17" r="4" fill="black" />
      </svg>
    );
  }