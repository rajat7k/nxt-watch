import React, { useEffect, useState } from "react";
import { ScreenSizeConstants } from "../constants/ScreenSizeContants";

const withReloadOnScreenChange = (WrappedComp) => {



    function WithReloadOnScreenChange() {

        const [isMobile,setIsMobile]=useState(window.innerWidth<=ScreenSizeConstants.tabletScreenSize)
        
        function handleWindowSizeChange() {
            if(window.innerWidth<=ScreenSizeConstants.tabletScreenSize && !isMobile){
                window.location.reload();
                setIsMobile(true);
            }
            else if(window.innerWidth>ScreenSizeConstants.tabletScreenSize && isMobile){
                window.location.reload();
                setIsMobile(true);
            }
            
        }

        useEffect(() => {
            window.addEventListener('resize', handleWindowSizeChange);
            return () => {
                window.removeEventListener('resize', handleWindowSizeChange);
            }
            //eslint-disable-next-line
        }, []);
        return <WrappedComp />;
    }

    WithReloadOnScreenChange.displayName = `WithReloadOnScreenChange(${WrappedComp.displayName || WrappedComp.name
        })`;

    return WithReloadOnScreenChange;
}

export default withReloadOnScreenChange