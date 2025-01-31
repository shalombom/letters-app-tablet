import { useState, useEffect, useRef } from 'react';
import NikudTile from './components/NikudTile'
import VideoOverlay from './components/VideoOverlay'
import Kamatz from './components/NikudSigns/Kamatz'
import Hirik from './components/NikudSigns/Hirik'
import VavHolam from './components/NikudSigns/VavHolam'
import Segol from './components/NikudSigns/Segol'
import VavShuruk from './components/NikudSigns/VavShuruk'
import Shva from './components/NikudSigns/Shva'
import Patach from './components/NikudSigns/Patach'
import Kubuts from './components/NikudSigns/Kubuts'
import Tzereh from './components/NikudSigns/Tzereh'
import HolamHaser from './components/NikudSigns/HolamHaser'
import './styles/nikud.css';
import './App.css';
import './styles/custom.css';
import './styles/tablet.css';

const nikudVideos = {
  'alef': '/video/alef.mp4',
  'bet': '/video/bet.mp4',
  'gimel': '/video/gimel.mp4',
  'dalet': '/video/dalet.mp4',
  'hey': '/video/hey.mp4',
  'vav': '/video/vav.mp4',
  'zayin': '/video/zayin.mp4',
  'het': '/video/het.mp4',
  'tet': '/video/tet.mp4',
  'yud': '/video/yud.mp4',
  'kaf': '/video/kaf.mp4',
  'lamed': '/video/lamed.mp4',
  'mem': '/video/mem.mp4',
  'nun': '/video/nun.mp4',
  'samech': '/video/samech.mp4',
  'ayin': '/video/ayin.mp4',
  'pey': '/video/pey.mp4',
  'tzadi': '/video/tzadi.mp4',
  'kuf': '/video/kuf.mp4',
  'resh': '/video/resh.mp4',
  'shin': '/video/shin.mp4',
  'tav': '/video/tav.mp4',
  'kaf-sofit': '/video/kaf-sofit.mp4',
  'mem-sofit': '/video/mem-sofit.mp4',
  'nun-sofit': '/video/nun-sofit.mp4',
  'pey-sofit': '/video/pey-sofit.mp4',
  'tzadi-sofit': '/video/tzadi-sofit.mp4',
  'hirik': '/video/yud.mp4',
  'hirik2': '/video/het.mp4',
  'hirik2-second': '/video/het.mp4',
  'hirik2-third': '/video/het.mp4',
  'hirik-third': '/video/yud.mp4',
  'hirik-second': '/video/yud.mp4',
  'holam-haser': '/video/vav.mp4',
  'holam-haser-second': '/video/vav.mp4',
  'holam-haser-third': '/video/tzadi.mp4',
  'kamatz': '/video/alef.mp4',
  'kamatz-first': '/video/alef.mp4',
  'kamatz-third': '/video/kuf.mp4',
  'kubuts': '/video/kuf.mp4',
  'patach-second': '/video/pey.mp4',
  'patach-third': '/video/mem.mp4',
  'segol': '/video/samech.mp4',
  'segol-second': '/video/samech.mp4',
  'segol-third': '/video/samech.mp4',
  'shva': '/video/shin.mp4',
  'shva-second': '/video/shin.mp4',
  'shva-third': '/video/shin.mp4',
  'vav-holam': '/video/vav.mp4',
  'vav-holam-second': '/video/vav.mp4',
  'vav-holam-third': '/video/vav.mp4',
  'vav-shuruk': '/video/vav.mp4',
  'vav-shuruk-second': '/video/vav.mp4',
  'vav-shuruk-third': '/video/vav.mp4',
};

const NikudButton = ({ children, onClick, ...props }) => (
  <NikudTile
    {...props}
    {...('ontouchstart' in window
      ? {
          onTouchStart: (e) => {
            e.preventDefault();
            onClick();
          }
        }
      : {
          onMouseDown: onClick
        }
    )}
    style={{ touchAction: 'none' }}
  >
    {children}
  </NikudTile>
);

export default function App() {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoKey, setVideoKey] = useState(0);
  const [isVideoFading, setIsVideoFading] = useState(false);
  const [selectedNikud, setSelectedNikud] = useState([null, null, null, null]);
  const [lastClickedIndex, setLastClickedIndex] = useState(0);
  const [isWarehouseVisible, setIsWarehouseVisible] = useState(true);
  const fadeTimeoutRef = useRef(null);

  useEffect(() => {
    const preventDefault = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    const preventZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
      if (e.deltaY) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', preventZoom, { passive: false });
    document.addEventListener('keydown', preventDefault);

    return () => {
      document.removeEventListener('wheel', preventZoom);
      document.removeEventListener('keydown', preventDefault);
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  const handleVideoEnd = () => {
    setIsVideoFading(true);
    fadeTimeoutRef.current = setTimeout(() => {
      setCurrentVideo(null);
      setIsVideoFading(false);
    }, 1000);
  };

  const playVideo = (nikudType, index) => {
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    
    console.log('Playing video for:', nikudType);
    setIsVideoFading(false);
    setVideoKey(prev => prev + 1);
    setCurrentVideo(nikudVideos[nikudType]);
    setLastClickedIndex(index);
    setIsWarehouseVisible(false);
  };

  const handleNikudClick = (NikudComponent, nikudType) => {
    setSelectedNikud(prev => {
      const firstEmpty = prev.indexOf(null);
      if (firstEmpty === -1) {
        const newArray = [null, null, null, null];
        newArray[0] = { component: NikudComponent, type: nikudType };
        return newArray;
      }
      const newArray = [...prev];
      newArray[firstEmpty] = { component: NikudComponent, type: nikudType };
      return newArray;
    });
  };

  return (
    <div className="nikud-container">
      <div className="warehouse-controls">
        <button 
          className="show-warehouse-btn left" 
          {...('ontouchstart' in window
            ? {
                onTouchStart: (e) => {
                  e.preventDefault();
                  setIsWarehouseVisible(!isWarehouseVisible);
                  setSelectedNikud([null, null, null, null]);
                }
              }
            : {
                onMouseDown: () => {
                  setIsWarehouseVisible(!isWarehouseVisible);
                  setSelectedNikud([null, null, null, null]);
                }
              }
          )}
          style={{ touchAction: 'none' }}
          aria-label={isWarehouseVisible ? 'הסתר מחסן' : 'הצג מחסן'}
        >
          {isWarehouseVisible ? '−' : '+'}
        </button>
        <button 
          className="show-warehouse-btn right" 
          {...('ontouchstart' in window
            ? {
                onTouchStart: (e) => {
                  e.preventDefault();
                  setIsWarehouseVisible(!isWarehouseVisible);
                  setSelectedNikud([null, null, null, null]);
                }
              }
            : {
                onMouseDown: () => {
                  setIsWarehouseVisible(!isWarehouseVisible);
                  setSelectedNikud([null, null, null, null]);
                }
              }
          )}
          style={{ touchAction: 'none' }}
          aria-label={isWarehouseVisible ? 'הסתר מחסן' : 'הצג מחסן'}
        >
          {isWarehouseVisible ? '−' : '+'}
        </button>
      </div>
      {isWarehouseVisible && (
        <div className="nikud-row-group" style={{ marginRight: '20px' }}>
          <div className="nikud-row">
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'alef')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>א</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'bet')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ב</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'gimel')} noBorder={true}>
              <div style={{fontFamily: 'Arial', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ג</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'dalet')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ד</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'hey')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ה</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'vav')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ו</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'zayin')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ז</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'het')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ח</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'tet')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ט</div>
            </NikudTile>
          </div>
          <div className="nikud-row" style={{ marginTop: '-40px' }}>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'yud')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>י</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'kaf')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>כ</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'lamed')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ל</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'mem')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>מ</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'nun')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>נ</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'samech')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ס</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'ayin')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ע</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'pey')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>פ</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'tzadi')} noBorder={true}>
              <div style={{fontFamily: 'Arial !important', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>צ</div>
            </NikudTile>
          </div>
          <div className="nikud-row" style={{ marginTop: '-40px' }}>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'kuf')} noBorder={true}>
              <div style={{fontFamily: 'Arial', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ק</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'resh')} noBorder={true}>
              <div style={{fontFamily: 'Arial', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ר</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'shin')} noBorder={true}>
              <div style={{fontFamily: 'Arial', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ש</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'tav')} noBorder={true}>
              <div style={{fontFamily: 'Arial', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ת</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'kaf-sofit')} noBorder={true}>
              <div style={{fontFamily: 'Arial', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ך</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'mem-sofit')} noBorder={true}>
              <div style={{fontFamily: 'Arial', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ם</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'nun-sofit')} noBorder={true}>
              <div style={{fontFamily: 'Arial', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ן</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'pey-sofit')} noBorder={true}>
              <div style={{fontFamily: 'Arial', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ף</div>
            </NikudTile>
            <NikudTile width={60} height={86} onClick={() => handleNikudClick(null, 'tzadi-sofit')} noBorder={true}>
              <div style={{fontFamily: 'Arial', fontSize: '40px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>ץ</div>
            </NikudTile>
          </div>
        </div>
      )}
      <div className="practice-row">
        {selectedNikud.map((nikud, index) => (
          <div 
            key={index} 
            className="practice-item"
            {...('ontouchstart' in window
              ? {
                  onTouchStart: (e) => {
                    e.preventDefault();
                    nikud && playVideo(nikud.type, index);
                  }
                }
              : {
                  onMouseDown: () => nikud && playVideo(nikud.type, index)
                }
            )}
            style={{ touchAction: 'none' }}
          >
            {nikud && (
              <NikudTile 
                width={180} 
                height={216} 
                className="practice-tile"
                noBorder={true}
              >
                {nikud.type === 'alef' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    א
                  </div>
                ) : nikud.type === 'bet' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ב
                  </div>
                ) : nikud.type === 'gimel' ? (
                  <div style={{
                    fontFamily: 'Arial',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ג
                  </div>
                ) : nikud.type === 'dalet' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ד
                  </div>
                ) : nikud.type === 'hey' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ה
                  </div>
                ) : nikud.type === 'vav' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ו
                  </div>
                ) : nikud.type === 'zayin' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ז
                  </div>
                ) : nikud.type === 'het' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ח
                  </div>
                ) : nikud.type === 'tet' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ט
                  </div>
                ) : nikud.type === 'yud' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    י
                  </div>
                ) : nikud.type === 'kaf' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    כ
                  </div>
                ) : nikud.type === 'lamed' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ל
                  </div>
                ) : nikud.type === 'mem' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    מ
                  </div>
                ) : nikud.type === 'nun' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    נ
                  </div>
                ) : nikud.type === 'samech' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ס
                  </div>
                ) : nikud.type === 'ayin' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ע
                  </div>
                ) : nikud.type === 'pey' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    פ
                  </div>
                ) : nikud.type === 'tzadi' ? (
                  <div style={{
                    fontFamily: 'Arial !important',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    צ
                  </div>
                ) : nikud.type === 'kuf' ? (
                  <div style={{
                    fontFamily: 'Arial',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ק
                  </div>
                ) : nikud.type === 'resh' ? (
                  <div style={{
                    fontFamily: 'Arial',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ר
                  </div>
                ) : nikud.type === 'shin' ? (
                  <div style={{
                    fontFamily: 'Arial',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ש
                  </div>
                ) : nikud.type === 'tav' ? (
                  <div style={{
                    fontFamily: 'Arial',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ת
                  </div>
                ) : nikud.type === 'kaf-sofit' ? (
                  <div style={{
                    fontFamily: 'Arial',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ך
                  </div>
                ) : nikud.type === 'nun-sofit' ? (
                  <div style={{
                    fontFamily: 'Arial',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ן
                  </div>
                ) : nikud.type === 'mem-sofit' ? (
                  <div style={{
                    fontFamily: 'Arial',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ם
                  </div>
                ) : nikud.type === 'pey-sofit' ? (
                  <div style={{
                    fontFamily: 'Arial',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ף
                  </div>
                ) : nikud.type === 'tzadi-sofit' ? (
                  <div style={{
                    fontFamily: 'Arial',
                    fontSize: '180px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    ץ
                  </div>
                ) : (
                  nikud.component()
                )}
              </NikudTile>
            )}
          </div>
        ))}
      </div>
      {currentVideo && (
        <>
          <VideoOverlay
            videoSrc={currentVideo}
            position={
              lastClickedIndex === 0 ? "right" :
              lastClickedIndex === 1 ? "left" :
              lastClickedIndex === 2 ? "center" :
              "fourth"
            }
            key={videoKey}
            onVideoEnd={handleVideoEnd}
            isVideoFading={isVideoFading}
          />
        </>
      )}
    </div>
  );
}
