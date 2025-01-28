import NikudTile from './NikudTile';
import {
  VavShuruk,
  VavHolam,
  Hirik,
  Tzereh,
  Segol,
  Kamatz,
  Kubutz,
  HolamHaser,
  Patach,
  Shva,
  Dagesh,
  Shuruk
} from './NikudSigns';
import ShvaCopy from './NikudSigns/ShvaCopy';

function NikudGame() {
  return (
    <div className="nikud-container">
      {/* שורת המחסן */}
      <div className="nikud-row">
        <NikudTile><Kamatz /></NikudTile>
        <NikudTile><Segol /></NikudTile>
        <NikudTile><Tzereh /></NikudTile>
        <NikudTile><Hirik /></NikudTile>
        <NikudTile><VavHolam /></NikudTile>
        <NikudTile><VavShuruk /></NikudTile>
        <NikudTile><Kubutz /></NikudTile>
        <NikudTile><HolamHaser /></NikudTile>
        <NikudTile><Patach /></NikudTile>
        <NikudTile><Shva /></NikudTile>
        <NikudTile><Dagesh /></NikudTile>
        <NikudTile><Shuruk /></NikudTile>
      </div>

      {/* שורת השווא */}
      <div className="nikud-row">
        <NikudTile width={80} height={120}>
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
            <circle cx="15" cy="7" r="4.2" fill="black" />
            <circle cx="15" cy="19" r="4.2" fill="black" />
          </svg>
        </NikudTile>
      </div>

      {/* שורת התרגול */}
      <div className="practice-row">
        <div className="practice-item">
          <NikudTile className="practice-tile"><Kamatz /></NikudTile>
        </div>
        <div className="practice-item">
          <NikudTile className="practice-tile"><Hirik /></NikudTile>
        </div>
      </div>
    </div>
  );
}

export default NikudGame;