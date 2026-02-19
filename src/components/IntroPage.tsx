import '../styles/IntroPage.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const IntroPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/opening');
    }

    const handleKeyDown = (e: React.KeyboardEvent | KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            navigate('/opening');
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="click-to-start" onClick={handleClick}>
            <p className="click-text">CLICK TO START</p>
        </div>
    )
}

export default IntroPage;