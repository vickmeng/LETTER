import * as spritejs from 'spritejs';
import { devicePixelRatio, getOneOf } from 'src/shared/utils/common';
const {Scene, Sprite, Label, Resource} = spritejs;

import { ajax } from 'rxjs/ajax';


interface Color {
    CMYK: [number, number, number, number];
    RGB: [number, number, number];
    hex: string;
    name: string;
}

export class ChineseColor {
    private scene: any; // 这就尴尬了
    private $layer: any;
    private $bgColor: any;
    private $bgImg: any;
    private $label: any;
    private color: Color;
    private view_w: number;
    private view_h: number;
    text: string;
    colors: Color[] = [];
    fontFamilies = [
        '印品篆遇简'
    ];

    constructor(
        private $paper: HTMLElement,
        private drawFinish = () => {},
    ) {
        ajax.getJSON('assets/colors.json').subscribe(
            (res: Color[]) => {
                this.colors = res;
                this.color = getOneOf<Color>(this.colors);
                this.text = this.color.name;
                this.initPaper();
            }
        );
    }

    change = (text?: string) => {
        this.color = getOneOf<Color>(this.colors);
        this.text = this.color.name;
        this.drawBgColor();
        this.drawText(text);
        this.drawFinish();
    }

    drawBgColor = () => {
        this.$bgColor.transition(0.5).attr(
            {bgcolor: this.color.hex}
        );
    }

    async drawBgImg () { // 不是必须的，没有也就没有了
        await Resource.loadTexture({id: 'texture', src: 'assets/img/texture.png'});
        this.$bgColor.attr({
            bgimage: {
                id: 'texture',
                display: 'stretch',
              },
        });
    }

    drawText = (text?: string) => {
        text = text || this.text;
        const lineHeight = Math.floor(this.view_h * 0.3 / text.length);
        const fontSize = lineHeight * 0.8;
        const fontFamily = getOneOf(this.fontFamilies);
        const height = lineHeight * text.length;
        const width = lineHeight;
        const pos_x = (this.view_w - width) / 2;
        const pos_y = (this.view_h - height) / 2;

        this.$label.attr(
            {
                text,
                fillColor: '#f4f4f4',
                pos: [pos_x, pos_y],
                fontSize,
                fontFamily,
                lineHeight,
                width,
                height,
                textAlign: 'center',
                lineBreak: 'normal',
            }
        );
    }

    private initPaper = () => {
        this.$paper.id = this.$paper.id || 'paper';
        this.view_w = this.$paper.clientWidth * devicePixelRatio;
        this.view_h = this.$paper.clientHeight * devicePixelRatio;
        this.scene = new Scene(
            '#' + this.$paper.id,
            {
                viewport: ['auto', 'auto'],
                resolution: [this.view_w, this.view_h]
            }
        );

        this.$layer = this.scene.layer('chineseColor');
        //
        this.$bgColor = new Sprite();
        this.$bgColor.attr({
            pos: [0, 0],
            size: [this.view_w, this.view_h],
          });
        this.$layer.appendChild(this.$bgColor);
        //
        this.$bgImg = new Sprite();
        this.$bgImg.attr({
            pos: [0, 0],
            size: [this.view_w, this.view_h],
          });
        this.$layer.appendChild(this.$bgImg);
        //
        this.$label = new Label();
        this.$layer.appendChild(this.$label);

        this.drawBgColor();
        this.drawBgImg();
        this.drawText();
        this.drawFinish();
    }
}
