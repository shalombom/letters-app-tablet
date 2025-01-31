import NikudTile from './components/NikudTile'
import Kamatz from './components/NikudSigns/Kamatz'
import Hirik from './components/NikudSigns/Hirik'
import VavHolam from './components/NikudSigns/VavHolam'
import Segol from './components/NikudSigns/Segol'
import VavShuruk from './components/NikudSigns/VavShuruk'
import Shva from './components/NikudSigns/Shva'
import Patach from './components/NikudSigns/Patach'
import Kubuts from './components/NikudSigns/Kubuts'
import Tzereh from './components/NikudSigns/Tzereh'
import PlayButton from './components/PlayButton'
import HolamHaser from './components/NikudSigns/HolamHaser'

export default function App() {
  return (
    <div 
      dir="rtl" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '90px',
        paddingTop: '80px'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <NikudTile width={60} height={90}><Kamatz /></NikudTile>
          <NikudTile width={60} height={90}><Hirik /></NikudTile>
          <NikudTile width={60} height={90}><VavHolam /></NikudTile>
          <NikudTile width={60} height={90}><Segol /></NikudTile>
          <NikudTile width={60} height={90}><VavShuruk /></NikudTile>
          <NikudTile width={60} height={90}><Shva /></NikudTile>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <NikudTile width={60} height={90}><Patach /></NikudTile>
          <NikudTile width={60} height={90}><Hirik /></NikudTile>
          <NikudTile width={60} height={90}><HolamHaser /></NikudTile>
          <NikudTile width={60} height={90}><Tzereh /></NikudTile>
          <NikudTile width={60} height={90}><Kubuts /></NikudTile>
          <NikudTile width={60} height={90}><Shva /></NikudTile>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <NikudTile width={120} height={180} />
          <PlayButton />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <NikudTile width={120} height={180} />
          <PlayButton />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <NikudTile width={120} height={180} />
          <PlayButton />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <NikudTile width={120} height={180} />
          <PlayButton />
        </div>
      </div>
    </div>
  )
}