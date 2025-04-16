import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Chip, createTheme, ThemeProvider } from '@mui/material';
import './index.css';
import info from './info.json';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import Looks6Icon from '@mui/icons-material/Looks6';

// ライトテーマを作成
const theme = createTheme({
  palette: {
    mode: 'light', // ライトテーマを指定
  },
});

// 数字に対応するアイコンを取得する関数
const getIconForNumber = (number) => {
  switch (number) {
    case '1':
      return <LooksOneIcon />;
    case '2':
      return <LooksTwoIcon />;
    case '3':
      return <Looks3Icon />;
    case '4':
      return <Looks4Icon />;
    case '5':
      return <Looks5Icon />;
    case '6':
      return <Looks6Icon />;
    default:
      return null;
  }
};

function App() {
  const raceInfo = info[0]['time-line'][0].name;
  const lane = info[0].lane;

  // 時刻を管理するstate
  const [time, setTime] = useState('');

  // スポンサー画像を管理するstate
  const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);

  // スポンサー画像のリスト
  const sponsorImages = [
    './image/logo/1.png',
    './image/logo/2.png',
    './image/logo/3.png',
  ];

  // 時刻を更新するuseEffect
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateClock(); // 初回実行
    const interval = setInterval(updateClock, 3000); // 3秒ごとに更新

    return () => clearInterval(interval); // クリーンアップ
  }, []);

  // スポンサー画像を切り替えるuseEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSponsorIndex((prevIndex) => (prevIndex + 1) % sponsorImages.length);
    }, 5000); // 3秒ごとに切り替え

    return () => clearInterval(interval); // クリーンアップ
  }, [sponsorImages.length]);

  return (
    <div>
      <div className='race-info'>{raceInfo}</div>
      <div className='lane'>
        {lane.map((team, index) => {
          const firstChar = team.charAt(0);
          const icon = getIconForNumber(firstChar);
          const teamNameWithoutNumber = team.slice(2);

          return (
            <Chip
              key={index}
              label={teamNameWithoutNumber}
              icon={icon}
              sx={{
                m: 1,
                color: '#fff',
                backgroundColor: 'rgba(10, 10, 10, 0.8)',
                fontSize: '1.1rem',
                height: '40px',
                borderRadius: '20px',
                padding: '0 8px',
                '& .MuiChip-icon': {
                  fontSize: '1.8rem',
                  color: 'rgba(255, 255, 255, 1)',
                },
              }}
            />
          );
        })}
      </div>
      <div className='local-time'>{time}</div>
      {/* スポンサー画像を右上に表示 */}
      <div className='sponsor'>
        {sponsorImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt='スポンサー'
            className={`sponsor-image ${index === currentSponsorIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
