// components/data/cardData.js


// components/data/cardData.js
export const cardData = [
  {
    title: 'Scanning & Modeling',
    description: 'Digitizing the Real World. Capture intricate details through advanced scanning techniques.',
    imageUrl: '/public/images/hq720.jpg',
    menu: [
      { title: 'Configurator', endpoint: '/configurator' },
      { title: 'Billboard', endpoint: '/billboard' }
    ]
  },
  {
    title: 'Beauty Shot & Rendering',
    description: 'Crafting Stunning Visuals. Showcasing photorealistic imagery with perfect lighting and materials.',
    imageUrl: '/public/images/airbrush.jpg',
    menu: [
      { title: 'Configurator', endpoint: '/configurator' },
      { title: 'Billboard', endpoint: '/billboard' }
    ]
  },
  {
    title: 'Interactive',
    description: 'Engage with Technology. Explore dynamic, interactive models to enhance user experience.',
    imageUrl: '/public/images/hq720.jpg',
    menu: [
      { title: 'Configurator', endpoint: '/configurator' },
      { title: 'Billboard', endpoint: '/billboard' }
    ]
  }
  // Uncomment and add menu if needed:
  // {
  //   title: 'Animation',
  //   description: 'Breathing Life into Concepts. Bringing ideas to motion through detailed and fluid animation.',
  //   imageUrl: '/public/images/sharpener.jpg',
  //   menu: [
  //     { title: 'Configurator', endpoint: '/configurator' },
  //     { title: 'Billboard', endpoint: '/billboard' }
  //   ]
  // }
];

// Optional: Keep this if you want it later
function handleCardClick(cardTitle) {
  console.log(`Card clicked: ${cardTitle}`);
}