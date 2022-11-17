import React from "react";
import styles from './Footer.module.scss'
import {FaLinkedinIn,FaGithub} from "react-icons/fa";

const Footer = () => {
  return (
      <footer className={styles.footer}>
          <div className={styles['footer-wrapper']}>
              <a className={styles['footer-link']} href="https://www.linkedin.com/in/eugene-serdyuk-511969252/" target="_blank"><FaLinkedinIn color={'white'} size={20}/></a>
              <a  className={styles['footer-link']} href="https://github.com/Gituservn" target="_blank"><FaGithub color={'white'} size={20}/></a>
          </div>
          <p>© 2022 . all rights reserved.</p>
      </footer>
  );
};

export default Footer;
