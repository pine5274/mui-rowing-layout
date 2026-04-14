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

const endPoint = "https://script.google.com/macros/s/AKfycbw3sXeqPDRPIjpkMmkBlAviya1C82UIprzQRMX31am4-vVVbrOQvAj9_x9tIj6m9jiuLg/exec";

// スポンサー画像表示のON/OFFパラメータ
const showSponsor = true;

// スポンサー画像のリスト
const sponsorImages = [
  './image/logo/n-1.jpg',
  './image/logo/n-2.jpg',
  './image/logo/n-3.jpg',
];

const theme = createTheme({
  palette: {
    mode: 'light',
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

  const [remoteInfo, setRemoteInfo] = useState(null);

  const lane = remoteInfo
    ? remoteInfo.map(item => `${item['lane-number']} ${item.team}`)
    : [];

  const raceInfo = remoteInfo?.[0]?.['boat'] + " " + remoteInfo?.[0]?.['class'];
  const [time, setTime] = useState('');
  const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);

  // 5秒ごとにendpointからデータ取得
  useEffect(() => {
    const fetchRemoteInfo = async () => {
      try {
        const res = await fetch(endPoint);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setRemoteInfo(data);
      } catch (e) {
      }
    };
    fetchRemoteInfo();
    const interval = setInterval(fetchRemoteInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 3000); // 3秒ごとに更新

    return () => clearInterval(interval); // クリーンアップ
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSponsorIndex((prevIndex) => (prevIndex + 1) % sponsorImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className='race-info'>{raceInfo}</div>
      <div className='lane'>
        {lane.map((team, index) => {
          const firstChar = team.charAt(0);
          const icon = getIconForNumber(firstChar);
          // 先頭の数字とスペースを除去
          const teamNameWithoutNumber = team.replace(/^\d+\s*/, '');

          return (
            <Chip
              key={team}
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
      {showSponsor && (
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
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
