import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeatureDirective } from '@shared';

@Component({
  selector: 'app-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FeatureDirective],
  template: `
    <div class="navbar bg-base-300">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">
          <svg
            _ngcontent-ng-c249881476=""
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 223 236"
            width="32"
            class="angular-logo"
          >
            <g _ngcontent-ng-c249881476="" clip-path="url(#a)">
              <path
                _ngcontent-ng-c249881476=""
                fill="url(#b)"
                d="m222.077 39.192-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z"
              ></path>
              <path
                _ngcontent-ng-c249881476=""
                fill="url(#c)"
                d="m222.077 39.192-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z"
              ></path>
            </g>
            <defs _ngcontent-ng-c249881476="">
              <linearGradient
                _ngcontent-ng-c249881476=""
                id="b"
                x1="49.009"
                x2="225.829"
                y1="213.75"
                y2="129.722"
                gradientUnits="userSpaceOnUse"
              >
                <stop _ngcontent-ng-c249881476="" stop-color="#00cdb8"></stop>
                <stop
                  _ngcontent-ng-c249881476=""
                  offset=".24"
                  stop-color="#ff52d9"
                ></stop>
                <stop
                  _ngcontent-ng-c249881476=""
                  offset=".352"
                  stop-color="#ff52d9"
                ></stop>
                <stop
                  _ngcontent-ng-c249881476=""
                  offset=".494"
                  stop-color="#ff52d9"
                ></stop>
                <stop
                  _ngcontent-ng-c249881476=""
                  offset=".745"
                  stop-color="#00cdb8"
                ></stop>
                <stop
                  _ngcontent-ng-c249881476=""
                  offset="1"
                  stop-color="#7480ff"
                ></stop>
              </linearGradient>
              <linearGradient
                _ngcontent-ng-c249881476=""
                id="c"
                x1="41.025"
                x2="156.741"
                y1="28.344"
                y2="160.344"
                gradientUnits="userSpaceOnUse"
              >
                <stop _ngcontent-ng-c249881476="" stop-color="#00cdb8"></stop>
                <stop
                  _ngcontent-ng-c249881476=""
                  offset="1"
                  stop-color="#7480ff"
                  stop-opacity="0"
                ></stop>
              </linearGradient>
              <clipPath _ngcontent-ng-c249881476="" id="a">
                <path
                  _ngcontent-ng-c249881476=""
                  fill="#fff"
                  d="M0 0h223v236H0z"
                ></path>
              </clipPath>
            </defs>
          </svg>
          Applied Angular</a
        >
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><a routerLink="books">Books</a></li>
          <li><a routerLink="news">News</a></li>
          <li><a routerLink="golf">Golf</a></li>
          <li><a routerLink="counter">Counter</a></li>
          <li *feature="'lrc'"><a routerLink="lrc">Learning Resources</a></li>
        </ul>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavbarComponent {}
