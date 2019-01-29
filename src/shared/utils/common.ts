import { Observable, Observer , } from 'rxjs';

export const getImage = (src: string) => new Observable( (observer: Observer<HTMLImageElement>) => {
    const img = new Image();
    img.onload = () => {// 回头重构
        observer.next(img);
        observer.complete();
    };
    img.onerror = () => {
        observer.error('加载图片失败');
    };
    img.src = src;
});
