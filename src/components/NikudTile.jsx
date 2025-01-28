export default function NikudTile({ width = 60, height = 90, children, onClick, className = '', style = {}, noBorder = false }) {
  const isTouchDevice = 'ontouchstart' in window;

  const handleTouch = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
  };

  return (
    <div
      onTouchStart={isTouchDevice ? handleTouch : undefined}
      onMouseDown={!isTouchDevice ? onClick : undefined}
      className={`nikud-tile ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        margin: '5px',
        position: 'relative',
        display: 'inline-block',
        border: noBorder ? 'none' : '1.5px solid rgba(0, 0, 0, 0.5)',
        boxShadow: noBorder ? 'none' : '0 4px 15px rgba(0, 0, 0, 0.2)',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        ...style
      }}
    >
      <div className="nikud-sign-container">
        {children}
      </div>
    </div>
  );
}