import { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
function Switchin() {
  const [light, setLight] = useState(true);
  return (
    <>
      <div
        className="darkMode"
        onClick={(prev) => {
          setLight(!light);
        }}
      >
        {light ? <FaSun size={30} /> : <FaMoon size={30} />}
      </div>
    </>
  );
}

export default Switchin;
