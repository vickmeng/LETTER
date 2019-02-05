// import { mapArray } from 'src/shared/utils/structure';
import { getImage, devicePixelRatio } from 'src/shared/utils/common';
import { getRandomInit } from 'src/shared/utils/maths';

import * as _ from 'lodash';

import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

interface Element {
    text: string;
    size: number;
    positionX: number;
    positionY: number;
    img?: HTMLImageElement;
}

const sizeList: number[] = [
    42 , 50 , 58 , 66, 72
];

export class PaperCut {
    protected ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');

    private sizeList = sizeList.map(v => v * devicePixelRatio);
    private screenPadding = 30 * devicePixelRatio ;
    private fontMargin = 24 * devicePixelRatio ;


    private elementList: Element[][];
    private lineHeight: number ;


    private contentMaxWidth: number;
    private contentWidth: number;
    private contentHeight: number;

    private contentX: number;
    private contentY: number;

    constructor(
        private canvas: HTMLCanvasElement,
        private drawFinish = () => {},
    ) {
        this.handleInitConstant();
    }

    draw = (text: string) => {
        this.elementList = this.getElementList(text.split(''));
        this.contentWidth = this.getContentWidth();
        this.contentHeight = this.getContentHeight();
        this.contentX = this.getContentX();
        this.contentY = this.getContentY();
        this.handleDrawContent();
    }

    private handleInitConstant = () => {
        this.lineHeight =  _.max(this.sizeList);
        this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
        this.canvas.height = this.canvas.clientHeight * devicePixelRatio;
        this.canvas.width = this.canvas.width;
        this.canvas.height = this.canvas.height;
        this.contentMaxWidth = this.canvas.width - (this.screenPadding * 2);
    }

    private handleDrawContent = () => {
        const img$ = getImage('./assets/img/clippingBG.jpg');
        img$.subscribe(
            img => {
                this.ctx.drawImage( img , 0, 0, this.canvas.width, this.canvas.height);
                this.handleDrawElements();
            }
        );
    }

    private handleDrawElements = () => {
        const _mapper = (_element: Element) => getImage('./assets/img/cl.png').pipe(
            map(
                (img: HTMLImageElement) => ({..._element, img})
            )
        );

        const elements: Element[] = _.flattenDeep<Element>(this.elementList);

        const imgs$ = from(elements)
            .pipe(
                mergeMap(_mapper),
            );

        imgs$.subscribe(
            this.handleDrawElement,
            console.log,
            this.drawFinish,
        );
    }


    private handleDrawElement = ( _element: Element) => {
        const X = _element.positionX + this.contentX;
        const Y = _element.positionY + this.contentY + (this.lineHeight - _element.size) / 2;
        this.ctx.drawImage(
            _element.img,
            X + getRandomInit(-3 , 3),
            Y + getRandomInit(-3 , 3),
            _element.size,
            _element.size
        );
        return this.handleDrawElementText(X, Y, _element);
    }

    private handleDrawElementText = (X: number, Y: number, _element: Element) => {
        const fontSize = _element.size - this.fontMargin + + getRandomInit(-5 , 5  );
        const paddingTop = (this.lineHeight - _element.size) / 2;

        this.ctx.fillStyle = '#111111';
        this.ctx.textBaseline = 'top';

        this.ctx.font =  `${fontSize}px 宋体`;

        this.ctx.fillText(
            _element.text,
            X + (_element.size - fontSize) / 2 + getRandomInit(-3 , 3),
            Y + paddingTop + getRandomInit(-3 , 8),
        );
    }

    private getContentWidth = (): number => {
        if (this.elementList.length > 1) {// 不止一行
            const lineWidthList = this.elementList.map(line => {
                const lastOne = line[line.length - 1];
                return lastOne.positionX + lastOne.size;
            });
            return _.max(lineWidthList);
        } else {// 就一行
            const last = this.elementList[0][ this.elementList[0].length - 1 ];
            return last.positionX + last.size;
        }
    }

    private getContentHeight = (): number => this.elementList.length * this.lineHeight;

    private getContentX = (): number => (this.canvas.width - this.contentWidth) / 2;

    private getContentY = (): number => (this.canvas.height  - this.contentHeight ) / 2;

    // XXX 视图数据映射，这块儿我搞不定了。去TMD RXJS
    private getElementList = (textList: string[]): Element[][] => {
        const ElementList = [[]];
        let lineWith = 0;
        textList.forEach((text, i, arr) => {
            const size = this.sizeList[getRandomInit(0, 3)];
            if (lineWith + size >= this.contentMaxWidth) {// 冒了
                ElementList.push([]);
                lineWith = 0;
            }

            const element: Element = {
                text,
                size,
                positionX: lineWith,
                positionY: (ElementList.length - 1 ) * this.lineHeight,
            };
            ElementList[ElementList.length - 1].push(element);
            lineWith += size;
        });
        return ElementList;
    }
}
