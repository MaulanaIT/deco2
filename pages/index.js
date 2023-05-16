// Import Library
import loadable from '@loadable/component';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

// Import Component
const ContactUs = loadable(() => import('/components/home/ContactUs.js'));
const Main = loadable(() => import('/components/home/Main.js'));
const OurMission = loadable(() => import('/components/home/OurMission.js'));
// const OurServices = loadable(() => import('/components/home/OurServices.js'));
// const WhoWeAre = loadable(() => import('/components/home/WhoWeAre.js'));

export default function Index() {

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            if (router?.query?.scroll && router.isReady && document.getElementById('our-mission')) ScrollElement('our-mission');
        }, 50);
    }, [router?.query?.scroll, router.isReady]);

    const ScrollElement = id => {
        document.getElementById(id).scrollIntoView();
    }

    return (
        <React.Fragment>
            <Main />
            <OurMission />
            {/* <WhoWeAre /> */}
            {/* <OurServices /> */}
            {/* <ContactUs /> */}
        </React.Fragment>
    )
}