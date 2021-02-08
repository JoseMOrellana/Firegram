const handleObserver = (btn) => (entities) => {
    console.log("working");
    const target = entities[0];
    if (target.isIntersecting) {
        btn.current.click();
    }
};

export default handleObserver;
