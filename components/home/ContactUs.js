// Import Library
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

// Import Custom Library
import { cx } from '../Helper';

// Import Style
import global from '/styles/global.module.css';
import style from '/styles/home/contact_us.module.css';

const container = {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    transition: {
        duration: 0.6,
        ease: 'easeOut'
    },
    viewport: {
        once: true
    }
}

export default function ContactUs() {
    return (
        <section id="contact-us" className={style.contact_us}>
            <div className={cx(global.container_width, style.content)}>
                <motion.div {...container} className={style.description}>
                    <p className={style.article}>Interested to be <span className={global.primary_color}>DECO2&apos;s</span> partner? <br /> We&apos;d love to be yours!</p>
                    <div>
                        <Link href={'/contact-us'}>
                            <button type="button" className={global.button}>CONTACT US</button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
