import React, { useState, useEffect } from 'react';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';

const Footer = ({ usernameInput }) => {
    const today = new Date();
    const [isFullscreen, setIsFullscreen] = useState(false);
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
    
        document.addEventListener('fullscreenchange', handleFullscreenChange);
    
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            const docEl = document.documentElement;
            const requestFullScreen =
                docEl.requestFullscreen ||
                docEl.mozRequestFullScreen ||
                docEl.webkitRequestFullscreen ||
                docEl.msRequestFullscreen;

            if (requestFullScreen) {
                requestFullScreen.call(docEl);
                setIsFullscreen(true);
            }
        } else {
            const exitFullScreen =
                document.exitFullscreen ||
                document.mozCancelFullScreen ||
                document.webkitExitFullscreen ||
                document.msExitFullscreen;

            if (exitFullScreen) {
                exitFullScreen.call(document);
                setIsFullscreen(false);
            }
        }
    };

    return (
        <footer className='footer'>
            <p>&copy; {today.getFullYear()}</p>
            <button
                style={{
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    color: 'white',
                    marginLeft: '20px',
                    border: 'none',
                    outline: 'none'
                }}
                onClick={toggleFullscreen}
            >
                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </button>
        </footer>
    );
};

export default Footer;
