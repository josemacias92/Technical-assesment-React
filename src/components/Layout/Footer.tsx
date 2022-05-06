import { Fragment } from "react";
import estilos from "./Footer.module.css";

const Footer = () => {

  return (
    <Fragment>
      <footer className={estilos.footer}>
        <a href="https://github.com/josemacias92/Technical-assesment-React">Created by josemm92</a>
      </footer>
    </Fragment>
  );
};

export default Footer;
