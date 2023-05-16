// Import Library
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/about_us.module.css';

const showContent = {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 0 },
    transition: {
        duration: 0.6,
        delay: 0,
        ease: 'easeOut'
    },
    viewport: {
        once: true
    }
}

export default function Index() {

    return (
        <div className={style.container}>
            <div className={style.first_section}>
                <AnimatePresence>
                    <motion.div {...showContent} className={global.container_width}>
                        <p className={style.title}>Our Vision</p>
                        <p>At deCO2, we dream of a world where the world’s economic practices can align with the global climate commitments and goals.</p>
                        <br />
                        <p>With the global attempt to accelerate the implementation of decarbonization and renewable energy initiatives, we believe that the trading of Carbon Offset & RECs will play a significant role in achieving a fair and inclusive transition to a sustainable future.</p>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className={style.second_section}>
                <AnimatePresence>
                    <motion.div {...showContent} className={global.container_width}>
                        <p className={style.title}>Our Mission</p>
                        <p>deCO2 aims to create a global platform that connects and supports organizations to set the climate transition in motion.</p>
                        <br />
                        <p>We want to help businesses and investors to ultimately participate in reducing the world’s carbon footprint by removing the painful parts out of the equation.</p>
                        <br />
                        <p>We believe as a community we can help accelerate the world’s climate transition together.</p>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className={style.third_section}>
                <AnimatePresence>
                    <motion.div {...showContent} className={global.container_width}>
                        <p className={style.title}>Our Team</p>
                        <p>Here at deCO2 our team is passionate about what we do.</p>
                        <br />
                        <p>Our diverse founding team is made up of :</p>
                        <p>A seasoned entrepreneur who have previously built several start-up companies, a senior executive who worked at a global corporation and public company, a seasoned carbon and climate consultant, an expert communicator and marketeer, as well as a software developer who has decades of experience in software and blockchain.</p>
                        <br />
                        <p>Coming from different backgrounds and skillsets we all have one goal in mind: <br/><em className={global.fw_bold}>to save our earth by creating a climate conscious community.</em></p>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className={style.fourth_section}>
                <AnimatePresence>
                    <motion.div {...showContent} className={global.container_width}>
                        <p className={style.title}>Inspiring stories and insights on Carbon Offset</p>
                        <div className={style.video}>
                            <iframe src="https://embed.ted.com/talks/lang/en/utkarsh_agarwal_carbon_markets_how_solving_climate_change_can_generate_wealth"  frameBorder="0" scrolling="no" allowFullScreen></iframe>
                            <iframe src="https://embed.ted.com/talks/lang/en/rebecca_henderson_to_save_the_climate_we_have_to_reimagine_capitalism" frameBorder="0" scrolling="no" allowFullScreen></iframe>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
