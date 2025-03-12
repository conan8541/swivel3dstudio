import './style.css';

import { gsap } from "gsap";
import createHeroModelScene from "../components/airbrushScene.js";
import createIllustrationSection from "../components/illustrationSection.js";
import createCards from "../components/webGlCards.js";
import createFooterSection from "../components/footerSection.js";
import "@babylonjs/loaders";

createHeroModelScene();
createCards();
createIllustrationSection();
createFooterSection();
