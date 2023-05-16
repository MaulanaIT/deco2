// Import Library
import loadable from '@loadable/component';
import Head from 'next/head';
import Image from 'next/image';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider, useSelector } from 'react-redux';
import { wrapper, store } from '../components/store';
import { useDispatch } from 'react-redux';

// Import Custom Library
import { HideLoading, HidePopupResponse } from '../components/store/reducer';

// Import Assets
import loading from '/public/assets/loading.gif';

// Import Styles
import '/styles/index.css';
import 'react-phone-input-2/lib/style.css'
import style from '/styles/loading.module.css';

// Import Component
const Footer = loadable(() => import('/components/Footer.js'));
const Header = loadable(() => import('/components/Header.js'));
const LiveChat = loadable(() => import('/components/LiveChat.js'));
const PopupResponse = loadable(() => import('/components/Response.js'));

function _app({ Component, pageProps }) {

    const StoreLoading = useSelector((state) => state.store.Loading);
    const StorePopupResponse = useSelector((state) => state.store.PopupResponse);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem(process.env.storageName)) {
            let expired = jwtDecode(JSON.parse(localStorage.getItem(process.env.storageName)).token).exp;
            if (moment().unix() > expired) {
                localStorage.removeItem(process.env.storageName);

                window.location.href = '/';
            };
        }

        dispatch(HidePopupResponse());
        dispatch(HideLoading());
    }, [router.pathname]);

    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (this.window.scrollY > 0) this.document.querySelector('nav')?.classList.add('scroll');
            else this.document.querySelector('nav').classList.remove('scroll');
        });
    }, []);

    return (
        <React.Fragment>
            <Provider store={store}>
                {StoreLoading.active &&
                    <div key={0} className={style.container}>
                        <div className={style.card}>
                            <Image src={loading} width={64} height={64} alt={'Loading Animation'} />
                        </div>
                    </div>
                }
                {StorePopupResponse.active && <PopupResponse />}
                <Head>
                    <link rel="shortcut icon" href="/favicon.ico" />
                </Head>
                <Header />
                <Component {...pageProps} />
                {/* <LiveChat /> */}
                <Footer />
            </Provider>
        </React.Fragment>
    )
}

export default wrapper.withRedux(_app);