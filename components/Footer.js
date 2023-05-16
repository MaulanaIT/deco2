// Import Library
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

// Import Custom Library
import { cx } from './Helper';

// Import Assets
import IconInstagram from '/public/assets/ic-instagram.svg';
import IconLinkedIn from '/public/assets/ic-linkedin.svg';
import IconTwitter from '/public/assets/ic-twitter.svg';

// Import Styles
import global from '/styles/global.module.css';
import style_header from '/styles/header.module.css';
import style from '/styles/footer.module.css';

export default function Footer() {

    const router = useRouter();

    const ToggleNavbar = () => {
        let navbarMenu = document.querySelector(`.${style_header.nav} > .${style_header.navbar} > .${style_header.menu}`);

        navbarMenu.classList.remove(style_header.active);
    }

    return (
        <footer className={style.footer}>
            <div className={cx(global.container_width, style.content)}>
                <div className={style.menu}>
                    <ul>
                        <li onClick={ToggleNavbar}>
                            <Link href={'/'}>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li>
                            {router.pathname === '/' ?
                                <p onClick={() => {
                                    ScrollElement('our-mission');
                                    ToggleNavbar();
                                }}>Our Mission</p>
                                :
                                <Link href={{ pathname: '/', query: { scroll: true } }} as={'/'}>
                                    <p>Our Mission</p>
                                </Link>
                            }
                        </li>
                        <li onClick={ToggleNavbar}>
                            <Link href={'/our-story'}>
                                <p>Our Story</p>
                            </Link>
                        </li>
                        <li onClick={ToggleNavbar}>
                            <Link href={'/careers'}>
                                <p>Careers</p>
                            </Link>
                        </li>
                        <li onClick={ToggleNavbar}>
                            <Link href={'/contact-us'}>
                                <p>Contact Us</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={style.description}>
                    <div className={style.social_media}>
                        <div className={style.item}>
                            <Link href={'https://www.instagram.com/'} className={style.item}>
                                <React.Fragment>
                                    <Image src={IconInstagram} width={32} height={32} alt="Icon Instagram" />
                                </React.Fragment>
                            </Link>
                        </div>
                        <div className={style.item}>
                            <Link href={'https://www.linkedin.com/'} className={style.item}>
                                <React.Fragment>
                                    <Image src={IconLinkedIn} width={32} height={32} alt="Icon LinkedIn" />
                                </React.Fragment>
                            </Link>
                        </div>
                        <div className={style.item}>
                            <Link href={'https://twitter.com/'} className={style.item}>
                                <React.Fragment>
                                    <Image src={IconTwitter} width={32} height={32} alt="Icon Twitter" />
                                </React.Fragment>
                            </Link>
                        </div>
                    </div>
                    <p className={style.copyright}>2022 © PT Transformasi Decarbon Indonesia</p>
                </div>
            </div>
        </footer>
    )
}
