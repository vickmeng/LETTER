import { Injectable } from '@angular/core';
import { ComponentFactoryResolver, Injector, EmbeddedViewRef } from '@angular/core';
import { LoadingComponent } from './loading.component';
import { Overlay } from '@angular/cdk/overlay';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private $loader: HTMLElement;
    constructor(
        private overlay: Overlay,
        private cfr: ComponentFactoryResolver,
        private injector: Injector,
    ) {}

    getInstance = () => {
        const factory = this.cfr.resolveComponentFactory(LoadingComponent);
        const componentRef = factory.create(this.injector); // Use root injector
        const overlayPane = this.overlay.create().overlayElement;
        return overlayPane.appendChild((componentRef.hostView as EmbeddedViewRef<{}>).rootNodes[ 0 ] as HTMLElement);
    }

    on = () => {
        if (!this.$loader) {
            return this.$loader = this.getInstance();
        }
        return this.$loader.style.display = 'block';
    }

    off = () => {
        if (!this.$loader) {
            this.$loader = this.getInstance();
        }
        return this.$loader.style.display = 'none';
    }
}
