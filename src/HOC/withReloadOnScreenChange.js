import React, { useEffect, useState } from "react";

const withReloadOnScreenChange = (WrappedComp) => {



    function WithReloadOnScreenChange() {

        const [isMobile,setIsMobile]=useState(window.innerWidth<=768)
        
        function handleWindowSizeChange() {
            if(window.innerWidth<=768 && !isMobile){
                window.location.reload(false);
                setIsMobile(true);
            }
            if(window.innerWidth>768 && isMobile){
                window.location.reload(false);
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

        console.log("HOC createing")

        return <WrappedComp />;
    }

    WithReloadOnScreenChange.displayName = `WithReloadOnScreenChange(${WrappedComp.displayName || WrappedComp.name
        })`;

    return WithReloadOnScreenChange;
}

export default withReloadOnScreenChange