const handleObserver = (btn) => (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
        btn.current.click();
    }
};

export default handleObserver;
