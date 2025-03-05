// components/data/cardData.js


export const cardData = [
    {
      title: 'Scanning & Modeling',
      description: 'Digitizing the Real World. Capture intricate details through advanced scanning techniques.',
      imageUrl: '/public/images/hq720.jpg',
      onClick: () => handleCardClick('Scanning & Modeling')
    },
    {
      title: 'Beauty Shot & Rendering',
      description: 'Crafting Stunning Visuals. Showcasing photorealistic imagery with perfect lighting and materials.',
      imageUrl: '/public/images/airbrush.jpg',
      onClick: () => handleCardClick('Beauty Shot & Rendering')
    },
    {
      title: 'Interactive',
      description: 'Engage with Technology. Explore dynamic, interactive models to enhance user experience.',
      imageUrl: '/public/images/hq720.jpg',
      onClick: () => handleCardClick('Interactive')
    }
  //  {
  //    title: 'Animation',
  //    description: 'Breathing Life into Concepts. Bringing ideas to motion through detailed and fluid animation.',
  //    imageUrl: '/public/images/sharpener.jpg',
  //    onClick: () => handleCardClick('Animation')
 //   },
  ];

  // Handle the card click action
  function handleCardClick(cardTitle) {
    console.log(`Card clicked: ${cardTitle}`);
    // Add any other logic to handle click events, like showing WebGL models or interaction
  }
