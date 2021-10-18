import React from "react";
import { UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src: "https://lirp.cdn-website.com/0ead930f/dms3rep/multi/opt/CETIRIZINE-10MG-TABLET+SALUT+SELAPUT-1920w.jpg",
    altText: "",
    caption: "",
    header: "",
    key: "1",
  },
  {
    src: "https://www.kalbemed.com/storage/products/ec5f39e7f0c80b20c0bf1e614e968acf.jpg",
    altText: "",
    caption: "",
    header: "",
    key: "2",
  },
  {
    src: "https://www.fresenius-kabi.com/images/Company_sub_Quality_Management-l5aO9HkPQbOYiVrtHN1C9qa2xmuSoGr-ISOzNTL2dz8.jpg",
    altText: "",
    caption: "",
    header: "",
    key: "3",
  },
];

const Carousel = () => <UncontrolledCarousel items={items} />;

export default Carousel;
