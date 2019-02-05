import { Observable, Observer , } from 'rxjs';
import { getRandomInit } from './maths';

export const devicePixelRatio = +function() {
    return window.devicePixelRatio;
}();

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


export const getOneOf = <T>(arr: Array<T>): T => arr[getRandomInit(0, arr.length - 1)];
