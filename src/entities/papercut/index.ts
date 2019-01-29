import { mapArray } from 'src/shared/utils/structure';
import { getImage } from 'src/shared/utils/common';
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

const screenPadding = 30; // 控制占屏比

export class PaperCut {
    protected ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');

    private elementList: Element[][];
    private lineHeight = _.max(sizeList);

    private canvasWidth: number;
    private canvasHeight: number;

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
        this.handleDrawBackground();
        this.handleDrawContent();
    }

    private handleInitConstant = () => {
        this.canvasWidth = +this.canvas.getAttribute('width');
        this.canvasHeight = +this.canvas.getAttribute('height');

        this.contentMaxWidth = this.canvasWidth - (screenPadding * 2);
    }

    private handleDrawBackground = (fill = '#f2f2f2') => {
        this.ctx.fillStyle = fill;
        this.ctx.fillRect(
            0,
            0,
            this.canvasWidth,
            this.canvasHeight,
        );
    }

    private handleDrawContent = () => {
        const img$ = getImage('./assets/clippingBG.jpg');
        img$.subscribe(
            img => {
                this.ctx.drawImage( img , 0, 0, 691, 921);
                this.handleDrawElements();
            }
        );
    }

    private handleDrawElements = () => {
        const _mapper = (_element: Element) => getImage('./assets/cl.png').pipe(
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
        const fontSize = _element.size - 24;
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

    private getContentX = (): number => (this.canvasWidth - this.contentWidth) / 2;

    private getContentY = (): number => (this.canvasHeight  - this.contentHeight ) / 2;

    // XXX 视图数据映射，这块儿我搞不定了。去TMD RXJS
    private getElementList = (textList: string[]): Element[][] => {
        const ElementList = [[]];
        let lineWith = 0;
        textList.forEach((text, i, arr) => {
            const size = sizeList[getRandomInit(0, 3)];
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
