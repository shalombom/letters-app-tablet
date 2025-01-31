export default function Segol() {
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
          marginTop: '2px'
        }}
      >
        <g transform="translate(15, 10)">
          <circle cx="-8" cy="0" r="4" fill="black" />
          <circle cx="8" cy="0" r="4" fill="black" />
          <circle cx="0" cy="8" r="4" fill="black" />
        </g>
      </svg>
    );
  }