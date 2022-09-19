import './switch.css';
import { useState } from 'react';
import { useDarkMode } from '../../context/ContextDarkmode';
function Switchin() {
  const { swithTheme } = useDarkMode();
  const [spin, setSpin] = useState(false);
  return (
    <>
      <div
        className={spin ? 'spin darkModeCircle' : 'darkModeCircle'}
        onClick={() => {
          setSpin(!spin);
          swithTheme();
        }}
      >
        <span className="left"></span>
        <span className="right"></span>
      </div>
    </>
  );
}

export default Switchin;
