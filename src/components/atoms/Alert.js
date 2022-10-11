import React, { useEffect, useRef } from 'react'
import { hideAlert } from '../../helpers';

export default function Alert({ children, id, duration = 4000 }) {
  const alert = useRef(null);

  useEffect(() => {
    setTimeout(() => hideAlert(alert.current), duration)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={alert} id={id} className="alert warninig alertSlideAndFadeIn">
      {children}
    </div>
  )
}
