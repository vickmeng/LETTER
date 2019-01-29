export const mapArray = <T>(list: any[] , iterator: (item: T) => void) => {
    const loop = (_list: any[]) => {
        _list.forEach(item => {
            if (Array.isArray(item)) {
                loop(item);
            } else {
                iterator(item);
            }
        });
    };
    loop(list);
};
