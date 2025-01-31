export default function HolamHaser() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      outline: 'none',
      userSelect: 'none'
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: 'black',
        position: 'absolute',
        top: '-13px',
        left: '-12px',
        outline: 'none'
      }} />
    </div>
  );
}