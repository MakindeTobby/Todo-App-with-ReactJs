import { useState, useEffect } from 'react'
import './App.css'
import '../../bootstrap-5.0.2-dist/css/bootstrap.min.css'


const Clock = () => {

    // const time = new Date().toLocaleTimeString();
    const [date, setDate] = useState(new Date());
    function refreshClock() {
        setDate(new Date());
    }
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId)
        };
    }, []);
    return (
        <span className='text-white time-zone w-100 d-flex justify-content-center '>{date.toLocaleTimeString()}</span>
    );
}

export default Clock;