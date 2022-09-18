import './switch.css';
import { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useDarkMode } from '../../context/ContextDarkmode';
function Switchin() {
  const { swithTheme } = useDarkMode();
  const [light, setLight] = useState(true);
  return (
    <>
      <div
        className="darkMode"
        onClick={() => {
          setLight(!light);
          swithTheme();
        }}
      >
        {light ? <FaSun size={30} /> : <FaMoon size={30} />}
      </div>
    </>
  );
}

export default Switchin;
