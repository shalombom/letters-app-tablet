export default function PlayButton() {
    return (
      <button
        style={{
          backgroundColor: '#4CAF50',
          border: 'none',
          color: 'white',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '20px',
          padding: 0
        }}
      >
        ▶
      </button>
    );
  }