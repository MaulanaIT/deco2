// Import Library
import Image from 'next/image';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

// Import Custom Library
import { cx } from './Helper';
import { HideLoading, ShowLoading } from './store/reducer';

// Import Assets
import IconBars from '/public/assets/ic-bars.svg';
import IconCharetDown from '/public/assets/ic-charet-down.svg';
import IconLogo from '/public/assets/ic-logo.webp';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/header.module.css';
import jwtDecode from 'jwt-decode';

export default function Header() {

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        let dropdown = document.querySelectorAll(`li.${style.dropdown}`);

        dropdown.forEach(item => {
            item.addEventListener('click', function () {
                this.classList.toggle(`${style.active}`);
            });
        });

        window.onresize = function () {
            let navbarMenu = document.querySelector(`.${style.nav} > .${style.navbar} > .${style.menu}`);

            navbarMenu.classList.remove(style.active);
        }
    }, []);

    const Logout = () => {
        ToggleNavbar();
        localStorage.removeItem(process.env.storageName);
        router.push('/');
    }

    const ScrollElement = id => {
        document.getElementById(id).scrollIntoView();
    }

    const ToggleNavbar = () => {
        let navbarMenu = document.querySelector(`.${style.nav} > .${style.navbar} > .${style.menu}`);

        navbarMenu.classList.toggle(style.active);

        dispatch(ShowLoading());

        setTimeout(() => {
            dispatch(HideLoading());
        }, 1000);
    }

    return (
        <nav className={style.nav}>
            <div className={cx(global.container_width, style.navbar)}>
                <Link href={'/'}>
                    <div className={style.logo}>
                        <Image src={IconLogo} width={176} height={54} alt="Logo" />
                    </div>
                </Link>
                <div className={style.toggle} onClick={ToggleNavbar}>
                    <Image src={IconBars} width={24} height={24} alt="Icon Bars" />
                </div>
                <div className={style.menu}>
                    <ul>
                        <li>
                            {router.pathname === '/' ?
                                <p onClick={() => {
                                    ScrollElement('our-mission');
                                    ToggleNavbar();
                                }}>Our Mission</p>
                                :
                                <Link href={{ pathname: '/', query: { scroll: true } }} as={'/'}>
                                    <p onClick={() => ToggleNavbar()}>Our Mission</p>
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
                        <li className={style.dropdown}>
                            <p>Tools &nbsp; <Image src={IconCharetDown} width={16} height={16} alt='Icon Charet' /></p>
                            <ul className={style.dropdown_menu}>
                                <li onClick={ToggleNavbar}><Link href={'/question/11'}><p>Eligibility Tools</p></Link></li>
                                <li onClick={ToggleNavbar}><p>GHG Calculator</p></li>
                                <li onClick={ToggleNavbar}><Link href={'/question_result/11'}><p>Survey Result</p></Link></li>
                            </ul>
                        </li>
                        {JSON.parse(localStorage.getItem(process.env.storageName))?.token ?
                            <li className={style.dropdown}>
                                <p>{JSON.parse(localStorage.getItem(process.env.storageName))?.full_name.substr(0, 8)}.... &nbsp; <Image src={IconCharetDown} width={16} height={16} alt='Icon Charet' /></p>
                                <ul className={cx(style.dropdown_menu, style.right)}>
                                    <li onClick={ToggleNavbar}>
                                        <Link href={'/project'}>
                                            <p>My Project</p>
                                        </Link>
                                    </li>
                                    <li onClick={Logout}><p>Logout</p></li>
                                </ul>
                            </li>
                            :
                            <li className={style.dropdown} onClick={ToggleNavbar}>
                                <Link href={'/login'}>
                                    <p>Login</p>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
