export default function HolamHaser() {
    const styles = {
      container: {
        position: 'relative',
        height: '100%',
        width: '100%'
      },
      dot: {
        position: 'absolute',
        top: '-10px',
        right: '25%',
        fontSize: '24px'
      }
    };
  
    return (
      <div style={styles.container}>
        <div style={styles.dot}>•</div>
      </div>
    );
  }