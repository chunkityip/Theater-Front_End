import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  private slidingAT: number = 1000;
  private slidingDelay: number = 1000;
  private autoSlidingDelay: number = 4000;
  private curSlide: number = 1;
  private sliding: boolean = false;
  private autoSlidingActive: boolean = true;
  private autoSlidingBlocked: boolean = false;
  private autoSlidingTO: any;
  private numOfSlides: number = 4;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Only initialize slider if we're in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.initSlider();
    }
  }

  private $$(selector: string, context: Document | Element = document): Element[] {
    const elements = (context as Element).querySelectorAll(selector);
    return Array.from(elements);
  }

  private initSlider(): void {
    const prefix = '.fnc-';
    const $slider = document.querySelector('.example-slider') as HTMLElement;
    if (!$slider) return;

    const $slidesCont = $slider.querySelector(prefix + 'slider__slides');
    const $slides = this.$$(prefix + 'slide', $slider);
    const $controls = this.$$(prefix + 'nav__control', $slider);
    const $controlsBgs = this.$$(prefix + 'nav__bg', $slider);
    const $progressAS = this.$$(prefix + 'nav__control-progress', $slider);

    // Set IDs for slides and controls
    this.setIDs($slides, $controls, $controlsBgs);

    // Set first control as active
    ($slider.querySelector('.fnc-nav__control:first-child') as HTMLElement)
      ?.classList.add('m--active-control');

    // Add click handlers to controls
    $controls.forEach((control) => {
      control.addEventListener('click', (e) => this.controlClickHandler(e, $slider));
    });

    // Initialize auto sliding
    if (this.autoSlidingActive) {
      this.setAutoslidingTO($slider);
      $slider.classList.add('m--with-autosliding');

      // Set transition for progress bars
      const delay = this.autoSlidingDelay + this.slidingDelay + this.slidingAT;
      $progressAS.forEach((progress) => {
        (progress as HTMLElement).style.transition =
          `transform ${delay / 1000}s`;
      });
    }

    // Add credits button handlers
    this.initCreditsHandlers();
  }

  private setIDs($slides: Element[], $controls: Element[], $controlsBgs: Element[]): void {
    $slides.forEach((slide, index) => {
      slide.classList.add(`fnc-slide-${index + 1}`);
    });

    $controls.forEach((control, index) => {
      control.setAttribute('data-slide', (index + 1).toString());
      control.classList.add(`fnc-nav__control-${index + 1}`);
    });

    $controlsBgs.forEach((bg, index) => {
      bg.classList.add(`fnc-nav__bg-${index + 1}`);
    });
  }

  private controlClickHandler(event: Event, $slider: HTMLElement): void {
    const control = event.currentTarget as HTMLElement;

    if (this.sliding) return;
    if (control.classList.contains('m--active-control')) return;

    this.autoSlidingBlocked = true;
    $slider.classList.add('m--autosliding-blocked');

    const slideID = Number(control.getAttribute('data-slide'));
    this.performSliding(slideID, $slider);
  }

  private performSliding(slideID: number, $slider: HTMLElement): void {
    if (this.sliding) return;
    this.sliding = true;
    clearTimeout(this.autoSlidingTO);
    this.curSlide = slideID;

    const $prevControl = $slider.querySelector('.m--active-control');
    $prevControl?.classList.remove('m--active-control');
    $prevControl?.classList.add('m--prev-control');
    $slider.querySelector(`.fnc-nav__control-${slideID}`)
      ?.classList.add('m--active-control');

    const $activeSlide = $slider.querySelector(`.fnc-slide-${slideID}`);
    const $activeControlsBg = $slider.querySelector(`.fnc-nav__bg-${slideID}`);

    $slider.querySelector('.m--active-slide')
      ?.classList.add('m--previous-slide');
    $slider.querySelector('.m--active-nav-bg')
      ?.classList.add('m--previous-nav-bg');

    $activeSlide?.classList.add('m--before-sliding');
    $activeControlsBg?.classList.add('m--nav-bg-before');

    $activeSlide?.classList.add('m--active-slide');
    $activeControlsBg?.classList.add('m--active-nav-bg');

    setTimeout(() => this.afterSlidingHandler($slider),
      this.slidingAT + this.slidingDelay);
  }

  private afterSlidingHandler($slider: HTMLElement): void {
    $slider.querySelector('.m--previous-slide')
      ?.classList.remove('m--active-slide', 'm--previous-slide');
    $slider.querySelector('.m--previous-nav-bg')
      ?.classList.remove('m--active-nav-bg', 'm--previous-nav-bg');

    $slider.querySelector('.m--before-sliding')
      ?.classList.remove('m--before-sliding');
    $slider.querySelector('.m--nav-bg-before')
      ?.classList.remove('m--nav-bg-before');

    const $prevControl = $slider.querySelector('.m--prev-control');
    $prevControl?.classList.remove('m--prev-control');
    $prevControl?.classList.add('m--reset-progress');

    // Force reflow
    $prevControl?.classList.remove('m--reset-progress');

    this.sliding = false;

    if (this.autoSlidingActive && !this.autoSlidingBlocked) {
      this.setAutoslidingTO($slider);
    }
  }

  private setAutoslidingTO($slider: HTMLElement): void {
    clearTimeout(this.autoSlidingTO);

    this.curSlide++;
    if (this.curSlide > this.numOfSlides) this.curSlide = 1;

    this.autoSlidingTO = setTimeout(() => {
      this.performSliding(this.curSlide, $slider);
    }, this.autoSlidingDelay);
  }

  private initCreditsHandlers(): void {
    const $demoCont = document.querySelector('.demo-cont');

    this.$$('.fnc-slide__action-btn').forEach($btn => {
      $btn.addEventListener('click', () => {
        $demoCont?.classList.toggle('credits-active');
      });
    });

    document.querySelector('.demo-cont__credits-close')
      ?.addEventListener('click', () => {
        $demoCont?.classList.remove('credits-active');
      });

    document.querySelector('.js-activate-global-blending')
      ?.addEventListener('click', () => {
        document.querySelector('.example-slider')
          ?.classList.toggle('m--global-blending-active');
      });
  }
}
