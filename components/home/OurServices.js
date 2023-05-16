// Import Library
import React from 'react';

// Import Custom Library
import { cx } from '../Helper';

// Import Style
import global from '/styles/global.module.css';
import style from '/styles/home/our_services.module.css';

export default function OurServices() {
    return (
        <section id="our-services" className={cx(global.container_width, style.our_services)}>
            <p className={style.title}>OUR SERVICES</p>
            <div className={style.content}>
                <div className={style.item}>
                    <div className={style.header}></div>
                    <div className={style.name}>For carbon positive clients</div>
                    <div className={style.name}>For carbon negative clients</div>
                </div>
                <div className={style.item}>
                    <div className={style.header}>Advisory on Profitable Sustainability Solution</div>
                    <div className={style.title}>For carbon positive clients</div>
                    <div className={style.description} style={{ '--url-background-services': "url('https://carbonoffset.asia/wp-content/uploads/2021/06/Rectangle-39-1.png')" }}>
                        We help our clients understand the environmental impact of their activities, and develop roadmap to
                        reduce or offset their carbon emissions.</div>
                    <div className={style.title}>For carbon negative clients</div>
                    <div className={style.description} style={{ '--url-background-services': "url('https://carbonoffset.asia/wp-content/uploads/2021/06/Rectangle-46.png')" }}>
                        We help our clients understand the economic potential of their carbon offset, and develop roadmap to
                        capitalize their carbon offset potential.</div>
                </div>
                <div className={style.item}>
                    <div className={style.header}>Implementation of Profitable Sustainability Solution</div>
                    <div className={style.title}>For carbon positive clients</div>
                    <div className={style.description} style={{ '--url-background-services': "url('https://carbonoffset.asia/wp-content/uploads/2021/06/Rectangle-40.png')" }}>
                        We help our clients execute their roadmap to reduce or offset their carbon emissions.</div>
                    <div className={style.title}>For carbon negative clients</div>
                    <div className={style.description} style={{ '--url-background-services': "url('https://carbonoffset.asia/wp-content/uploads/2021/06/Rectangle-47.png')" }}>
                        We help our clients execute their roadmap to capitalize their carbon offset potential.</div>
                </div>
            </div>
        </section>
    )
}
