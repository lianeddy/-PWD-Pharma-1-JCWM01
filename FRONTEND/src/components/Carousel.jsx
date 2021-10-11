import React from "react";
import { UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src: "http://jogjapercetakan.com/wp-content/uploads/2018/07/86aa75a0-3253-4605-8d84-f8b688eb2820.jpg",
    altText: "",
    caption: "",
    header: "",
    key: "1",
  },
  {
    src: "https://cdnuploads.aa.com.tr/uploads/Contents/2021/05/07/thumbs_b_c_de6e62f21001508e3cfb3bb2d1b365f1.jpg?v=023857",
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
