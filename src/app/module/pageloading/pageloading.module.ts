import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class PageloadingModule {
  start(): void {
    const defaults = {
      opacity : 1,
      backgroundColor: '#000',
      delayTime: 1000,
      zindex: 999,
      sleep: 0
    };
    const options = defaults;
    const _PageHeight = window.innerHeight;
    const _PageWidth = window.innerWidth;
    const _LoadingHtml = '<div id="loadingPage"' +
      ' style="position:fixed;left:0;top:0;position: absolute;width:100%;' +
      'height:' + _PageHeight + 'px;background:' + options.backgroundColor + ';' +
      'opacity:' + options.opacity + ';filter:alpha(opacity=' + options.opacity * 100 + ');' +
      'z-index:' + options.zindex + ';overflow:hidden;">' +
      '<canvas id="c" style="position:absolute;top:0;left:0;z-index:-1;"></canvas>' +
      '<div style="position:absolute;top:80px;left:120px;">' +
      // '<img src="template/default/member/img/logo.png" width="100%" height="100%"/>' +
      '</div>' +
      // '<div id ="main_img" style="position: absolute;top: 8%;left: 0px;right:0px;width:1149px;height:679px;margin:auto;">' +
      // '<img src="template/default/member/img/demo2.png" width="100%" height="100%" />' +
      // '</div>' +
      '</div>';

  }
}
