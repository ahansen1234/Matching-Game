const shuffle = () => {
    const assets = [
        { image: '/assets/beach.png' },
        { image: '/assets/city.png' },
        { image: '/assets/grassy-hills.png' },
        { image: '/assets/rainforest.png' },
        { image: '/assets/Sand-dunes.png' },
        { image: '/assets/siberia-forest.png' },
        { image: '/assets/Snowy-Mountains.png' },
        { image: '/assets/Temperate-Forest.png' },
    ];
    return [...assets, ...assets].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));
};

export default shuffle;