import Particles from "react-tsparticles"
import { useEffect, useState } from "react";
export function Layout({children}) { 

	const themeColor = "#23D375";

	const [ numParticles ,  setNumParticles ] = useState(0);

	useEffect(() => {
		const windowsWidth = window.innerWidth;
		if ( windowsWidth < 500 ) { 
			setNumParticles(25);
		} else {
			setNumParticles(60);
		}

	})
	return (
		<>
			<div className="layout-box" >
				{children}
			</div>
			<Particles 
				id="tsparticles"
        params={{
          fpsLimit: 60,
          particles: {
						opacity	: {
							value: 0.5,
						},
            color: {
              value: themeColor,
            },
            links: {
              enable: true,
              color: themeColor,
              distance:150,
							opacity : 0.2
            },
            move: {
              enable: true
            },
						number: {
							value:  numParticles,
						},
          }
        }}
      />
			<style>{`
				#tsparticles { 
					z-index: -1;
					position: relative;
				}
			`}</style>
		</>
	)
}

