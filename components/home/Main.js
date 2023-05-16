// Import Library
import React from 'react';
import { motion } from 'framer-motion';

// Import Custom Library
import { cx } from '../Helper';

// Import Style
import global from '/styles/global.module.css';
import style from '/styles/home/main.module.css';

const containerVariant = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const itemVariant = {
    hidden: { y: 100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
};

const container = {
    initial: "hidden",
    whileInView: "visible",
    viewport: {
        once: true
    }
}

export default function Main() {

    const ScrollElement = id => {
        document.getElementById(id).scrollIntoView();
    }

    return (
        <main id="main" className={style.main}>
            <div className={cx(global.container_width, style.content)}>
                <motion.div variants={containerVariant} {...container} className={style.title}>
                    <motion.p variants={itemVariant}>HELPING YOU REALIZE <br /> YOUR CLIMATE AMBITIONS</motion.p>
                    <motion.p variants={itemVariant}>At deCO2 we provide businesses, goverments <br /> and institutions with accessible carbon solutions</motion.p>
                    {/* <motion.div variants={itemVariant}>
                        <button type="button" className={global.button} onClick={() => ScrollElement('our-mission')}>Get Started</button>
                    </motion.div> */}
                </motion.div>
            </div>
        </main>
    )
}
