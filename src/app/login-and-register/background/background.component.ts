import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import {TweenMax, Power2, TimelineLite} from 'gsap/TweenMax';


@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  isMouseDown;
  emptySlot;
  planeTop;
  planeBottom;
  camera;
  renderer;
  scene;
  mouse;
  camPos;
  sw;
  sh;
  cols;
  rows;
  gap;
  size;
  planeOffset;
  allRowsDepth;
  allColsWidth;
  speedNormal;
  speedFast;
  speed;
  boxes;
  boxes1d;
  object;

  vertexShader;
  fragmentShader;

  num;
  draw;
  createBox;
  init;
  listen;
  move;
  render;


  // isMouseDown = false;
  // emptySlot = 'emptySlot';
  // planeTop = 'planeTop';
  // planeBottom = 'planeBottom';
  // camera;
  // renderer;
  // scene;
  // mouse = {x: 0, y: 0};
  // camPos = {x: 0, y: 0, z: 10};
  // sw = window.innerWidth;
  // sh = window.innerHeight;
  // cols = 20;
  // rows = 16;
  // gap = 20;
  // size = {
  //   width: 100,
  //   height: 30,
  //   depth: 150
  // };
  // planeOffset = 250;
  // allRowsDepth = BackgroundComponent.prototype.rows * (BackgroundComponent.prototype.size.depth + BackgroundComponent.prototype.gap);
  // allColsWidth = BackgroundComponent.prototype.cols * (BackgroundComponent.prototype.size.depth + BackgroundComponent.prototype.gap);
  //
  // speedNormal = 4;
  // speedFast = 34;
  // speed = BackgroundComponent.prototype.speedNormal;
  // boxes = {
  //   planeBottom: [],
  //   planeTop: []
  // };
  // boxes1d = [];
  //
  // object;

  constructor() {

  }

  ngOnInit() {
    this.initParam();
    BackgroundComponent.prototype.init();
    // console.log(BackgroundComponent.prototype.speedNormal);
  }

  initParam(): void {
    BackgroundComponent.prototype.isMouseDown = false;
    BackgroundComponent.prototype.emptySlot = 'emptySlot';
    BackgroundComponent.prototype.planeTop = 'planeTop';
    BackgroundComponent.prototype.planeBottom = 'planeBottom';
    /* BackgroundComponent.prototype.camera;
     BackgroundComponent.prototype.scene;
     BackgroundComponent.prototype.renderer;*/
    BackgroundComponent.prototype.mouse = {x: 0, y: 0};
    BackgroundComponent.prototype.camPos = {x: 0, y: 0, z: 10};
    BackgroundComponent.prototype.sw = window.innerWidth;
    BackgroundComponent.prototype.sh = window.innerHeight;
    BackgroundComponent.prototype.cols = 20;
    BackgroundComponent.prototype.rows = 16;
    BackgroundComponent.prototype.gap = 20;
    BackgroundComponent.prototype.size = {
      width: 100,
      height: 30,
      depth: 150,
    };
    BackgroundComponent.prototype.planeOffset = 250;
    BackgroundComponent.prototype.allRowsDepth =
      BackgroundComponent.prototype.rows * (BackgroundComponent.prototype.size.depth + BackgroundComponent.prototype.gap);
    BackgroundComponent.prototype.allColsWidth =
      BackgroundComponent.prototype.cols * (BackgroundComponent.prototype.size.depth + BackgroundComponent.prototype.gap);

    BackgroundComponent.prototype.speedNormal = 4;
    BackgroundComponent.prototype.speedFast = 34;
    BackgroundComponent.prototype.speed = BackgroundComponent.prototype.speedNormal;
    BackgroundComponent.prototype.boxes = {
      planeBottom: [],
      planeTop: []
    };
    BackgroundComponent.prototype.boxes1d = [];

    BackgroundComponent.prototype.vertexShader = [
      'varying vec2 vUv;',
      'void main()',
      '{',
      '  vUv = uv;',
      '  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
      '  gl_Position = projectionMatrix * mvPosition;',
      '}'].join('');

    BackgroundComponent.prototype.fragmentShader = [
      'uniform float r;',
      'uniform float g;',
      'uniform float b;',
      'uniform float distanceZ;',
      'uniform float distanceX;',
      'uniform float pulse;',
      'uniform float speed;',

      'varying vec2 vUv;',

// 'float checkerRows = 8.0;',
// 'float checkerCols = 16.0;',

      'void main( void ) {',
      '  vec2 position = abs(-1.0 + 2.0 * vUv);',
      '  float edging = abs((pow(position.y, 5.0) + pow(position.x, 5.0)) / 2.0);',
      '  float perc = (0.2 * pow(speed + 1.0, 2.0) + edging * 0.8) * distanceZ * distanceX;',

// '  float perc = distanceX * distanceZ;',
// '  vec2 checkPosition = vUv;',
// '  float checkerX = ceil(mod(checkPosition.x, 1.0 / checkerCols) - 1.0 / checkerCols / 2.0);',
// '  float checkerY = ceil(mod(checkPosition.y, 1.0 / checkerRows) - 1.0 / checkerRows / 2.0);',
// '  float checker = ceil(checkerX * checkerY);',
// '  float r = checker;',
// '  float g = checker;',
// '  float b = checker;',

// '  float perc = 1.0;',
      '  float red = r * perc + pulse;',
      '  float green = g * perc + pulse;',
      '  float blue = b * perc + pulse;',
      '  gl_FragColor = vec4(red, green, blue, 1.0);',
      '}'].join('');
    /*
        BackgroundComponent.prototype.createBox = () => {
          const xi = Math.floor(Math.random() * BackgroundComponent.prototype.cols), xai = xi;
          const yi = Math.random() > 0.5 ? 1 : -1, yai = yi === -1 ?
            BackgroundComponent.prototype.planeBottom : BackgroundComponent.prototype.planeTop;
          const zi = Math.floor(Math.random() * BackgroundComponent.prototype.rows), zai = zi ;
          const x = (xi - BackgroundComponent.prototype.cols / 2) *
            (BackgroundComponent.prototype.size.width + BackgroundComponent.prototype.gap);
          const y = yi * BackgroundComponent.prototype.planeOffset;
          const z = zi * (BackgroundComponent.prototype.size.depth + BackgroundComponent.prototype.gap);
          if (BackgroundComponent.prototype.boxes[yai][zai][xai] === BackgroundComponent.prototype.emptySlot) {
            const box = BackgroundComponent.prototype.draw(BackgroundComponent.prototype.size);
            box.position.y = y;
            box.isWarping = false;
            box.offset = {x: x, z: 0};
            box.posZ = z;
            BackgroundComponent.prototype.boxes[yai][zai][xai] = box;
            BackgroundComponent.prototype.boxes1d.push(box);
            BackgroundComponent.prototype.scene.add(box);
          }
        };*/

    BackgroundComponent.prototype.num = function (min, max) {
      return Math.random() * (max - min) + min;
    };
    BackgroundComponent.prototype.draw = function draw(props) {

      const colours = {
        slow: {
          r: BackgroundComponent.prototype.num(0, 0.2),
          g: BackgroundComponent.prototype.num(0.5, 0.9),
          b: BackgroundComponent.prototype.num(0.3, 0.7)
        },
        fast: {
          r: BackgroundComponent.prototype.num(0.9, 1.0),
          g: BackgroundComponent.prototype.num(0.1, 0.7),
          b: BackgroundComponent.prototype.num(0.2, 0.5)
        }
      };

      const uniforms = {
        r: {type: 'f', value: colours.slow.r},
        g: {type: 'f', value: colours.slow.g},
        b: {type: 'f', value: colours.slow.b},
        distanceX: {type: 'f', value: 1.0},
        distanceZ: {type: 'f', value: 1.0},
        pulse: {type: 'f', value: 0},
        speed: {type: 'f', value: BackgroundComponent.prototype.speed},
      };

      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: BackgroundComponent.prototype.vertexShader,
        fragmentShader: BackgroundComponent.prototype.fragmentShader
      });

      const geometry = new THREE.BoxGeometry(props.width, props.height, props.depth);
      BackgroundComponent.prototype.object = new THREE.Mesh(geometry, material);
      // object.colours = colours;
      BackgroundComponent.prototype.object.colours = colours;
      return BackgroundComponent.prototype.object;
    };

    BackgroundComponent.prototype.init = function init() {
      BackgroundComponent.prototype.scene = new THREE.Scene();
      BackgroundComponent.prototype.camera =
        new THREE.PerspectiveCamera(100,
          BackgroundComponent.prototype.sw / BackgroundComponent.prototype.sh, 1, 10000);
      BackgroundComponent.prototype.scene.add(BackgroundComponent.prototype.camera);
      BackgroundComponent.prototype.renderer = new THREE.WebGLRenderer({antialias: true});
      BackgroundComponent.prototype.renderer.setSize(BackgroundComponent.prototype.sw, BackgroundComponent.prototype.sh);
      for (let j = 0, jl = BackgroundComponent.prototype.rows; j < jl; j++) {
        BackgroundComponent.prototype.boxes.planeBottom[j] = [];
        BackgroundComponent.prototype.boxes.planeTop[j] = [];
        for (let i = 0, il = BackgroundComponent.prototype.cols; i < il; i++) {
          BackgroundComponent.prototype.boxes.planeBottom[j][i] = BackgroundComponent.prototype.emptySlot;
          BackgroundComponent.prototype.boxes.planeTop[j][i] = BackgroundComponent.prototype.emptySlot;
        }
      }

      function createBox() {
        const xi = Math.floor(Math.random() * BackgroundComponent.prototype.cols), xai = xi;
        const yi = Math.random() > 0.5 ? 1 : -1,
          yai = yi === -1 ? BackgroundComponent.prototype.planeBottom : BackgroundComponent.prototype.planeTop;
        const zi = Math.floor(Math.random() * BackgroundComponent.prototype.rows), zai = zi;
        const x = (xi - BackgroundComponent.prototype.cols / 2)
          * (BackgroundComponent.prototype.size.width + BackgroundComponent.prototype.gap);
        const y = yi * BackgroundComponent.prototype.planeOffset;
        const z = zi * (BackgroundComponent.prototype.size.depth + BackgroundComponent.prototype.gap);
        if (BackgroundComponent.prototype.boxes[yai][zai][xai] === BackgroundComponent.prototype.emptySlot) {
          const box = BackgroundComponent.prototype.draw(BackgroundComponent.prototype.size);
          box.position.y = y;
          box.isWarping = false;
          box.offset = {x: x, z: 0};
          box.posZ = z;
          BackgroundComponent.prototype.boxes[yai][zai][xai] = box;
          BackgroundComponent.prototype.boxes1d.push(box);
          BackgroundComponent.prototype.scene.add(box);
        }

      }

      for (let i = 0, il = BackgroundComponent.prototype.rows * BackgroundComponent.prototype.cols; i < il; i++) {
        createBox();
      }
      document.body.appendChild(BackgroundComponent.prototype.renderer.domElement);

      function listen(eventNames, callback) {
        for (let i = 0; i < eventNames.length; i++) {
          window.addEventListener(eventNames[i], callback);
        }
      }

      listen(['resize'], function (e) {
        BackgroundComponent.prototype.sw = window.innerWidth;
        BackgroundComponent.prototype.sh = window.innerHeight;
        BackgroundComponent.prototype.camera.aspect = BackgroundComponent.prototype.sw / BackgroundComponent.prototype.sh;
        BackgroundComponent.prototype.camera.updateProjectionMatrix();
        BackgroundComponent.prototype.renderer.setSize(BackgroundComponent.prototype.sw, BackgroundComponent.prototype.sh);
      });
      listen(['mousedown', 'touchstart'], function (e) {
        e.preventDefault();
        BackgroundComponent.prototype.isMouseDown = true;
      });
      listen(['mousemove', 'touchmove'], function (e) {
        e.preventDefault();
        if (e.changedTouches && e.changedTouches[0]) {
          e = e.changedTouches[0];
        }
        BackgroundComponent.prototype.mouse.x = (e.clientX / BackgroundComponent.prototype.sw) * 2 - 1;
        BackgroundComponent.prototype.mouse.y = -(e.clientY / BackgroundComponent.prototype.sh) * 2 + 1;
      });
      listen(['mouseup', 'touchend'], function (e) {
        e.preventDefault();
        BackgroundComponent.prototype.isMouseDown = false;
      });
      BackgroundComponent.prototype.render(0);

    };


    BackgroundComponent.prototype.move = function move(x, y, z) {
      const box = BackgroundComponent.prototype.boxes[y][z][x];

      if (box !== BackgroundComponent.prototype.emptySlot) {

        box.position.x = box.offset.x;

        box.position.z = box.offset.z + box.posZ;

        if (box.position.z > 0) {
          box.posZ -= BackgroundComponent.prototype.allRowsDepth;
        }

        // return;
        // if (isMouseDown) return;
        if (!box.isWarping && Math.random() > 0.999) {

          const dir = Math.floor(Math.random() * 5);
          let xn = x, zn = z, yn = y, yi = 0, xo = 0, zo = 0;
          switch (dir) {
            case 0 :
              xn++;
              xo = 1;
              break;
            case 1 :
              xn--;
              xo = -1;
              break;
            case 2 :
              zn++;
              zo = 1;
              break;
            case 3 :
              zn--;
              zo = -1;
              break;
            case 4 :
              yn = (y === BackgroundComponent.prototype.planeTop) ?
                BackgroundComponent.prototype.planeBottom : BackgroundComponent.prototype.planeTop;
              yi = (y === BackgroundComponent.prototype.planeTop) ? -1 : 1;

              break;
          }

          if (BackgroundComponent.prototype.boxes[yn][zn] &&
            BackgroundComponent.prototype.boxes[yn][zn][xn] === BackgroundComponent.prototype.emptySlot) {

            BackgroundComponent.prototype.boxes[y][z][x] = BackgroundComponent.prototype.emptySlot;

            box.isWarping = true;

            BackgroundComponent.prototype.boxes[yn][zn][xn] = box;

            // con.log( box.offset.x,  box.offset.z);

            if (dir === 4) { // slide vertically
              TweenMax.to(box.position, 0.5, {
                y: yi * BackgroundComponent.prototype.planeOffset
              });
            } else { // slide horizontally
              TweenMax.to(box.offset, 0.5, {
                x: box.offset.x + xo * (BackgroundComponent.prototype.size.width + BackgroundComponent.prototype.gap),
                z: box.offset.z + zo * (BackgroundComponent.prototype.size.depth + BackgroundComponent.prototype.gap),
              });
            }
            TweenMax.to(box.offset, 0.6, {
              onComplete: function () {
                box.isWarping = false;
              }
            });

          }
        }

      }
    };

    BackgroundComponent.prototype.render = function render(time) {
      BackgroundComponent.prototype.speed -=
        (BackgroundComponent.prototype.speed -
          (BackgroundComponent.prototype.isMouseDown ?
            BackgroundComponent.prototype.speedFast : BackgroundComponent.prototype.speedNormal)) * 0.05;

      let box;
      for (let b = 0, bl = BackgroundComponent.prototype.boxes1d.length; b < bl; b++) {
        box = BackgroundComponent.prototype.boxes1d[b];
        box.posZ += BackgroundComponent.prototype.speed;

        // normalized z distance from camera
        const distanceZ =
          1 - ((BackgroundComponent.prototype.allRowsDepth - box.posZ) / (BackgroundComponent.prototype.allRowsDepth) - 1);
        box.material.uniforms.distanceZ.value = distanceZ;

        // normalized x distance from camera (centre)
        const distanceX = 1 - (Math.abs(box.position.x)) / (BackgroundComponent.prototype.allColsWidth / 3);
        box.material.uniforms.distanceX.value = distanceX;

        const colour = BackgroundComponent.prototype.isMouseDown ? box.colours.fast : box.colours.slow;
        box.material.uniforms.r.value -= (box.material.uniforms.r.value - colour.r) * 0.1;
        box.material.uniforms.g.value -= (box.material.uniforms.g.value - colour.g) * 0.1;
        box.material.uniforms.b.value -= (box.material.uniforms.b.value - colour.b) * 0.1;

        // normalized speed
        const currentSpeed =
          (BackgroundComponent.prototype.speed - BackgroundComponent.prototype.speedNormal) /
          (BackgroundComponent.prototype.speedFast - BackgroundComponent.prototype.speedNormal);
        box.material.uniforms.speed.value = currentSpeed;

        // pulses more with more speed... of course!
        if (Math.random() > (0.99995 - currentSpeed * 0.005)) {
          box.material.uniforms.pulse.value = 1;
        }
        box.material.uniforms.pulse.value -= box.material.uniforms.pulse.value * 0.1 / (currentSpeed + 1);

        // if (b ==13) con.log(box.material.uniforms.speed.value);
      }

      for (let j = 0, jl = BackgroundComponent.prototype.rows; j < jl; j++) { // iterate through rows: z
        for (let i = 0, il = BackgroundComponent.prototype.cols; i < il; i++) { // iterate throw cols: x
          BackgroundComponent.prototype.move(i, BackgroundComponent.prototype.planeBottom, j);
          BackgroundComponent.prototype.move(i, BackgroundComponent.prototype.planeTop, j);
        }
      }

      BackgroundComponent.prototype.camPos.x -=
        (BackgroundComponent.prototype.camPos.x - BackgroundComponent.prototype.mouse.x * 400) * 0.02;
      BackgroundComponent.prototype.camPos.y -=
        (BackgroundComponent.prototype.camPos.y - BackgroundComponent.prototype.mouse.y * 150) * 0.05;
      BackgroundComponent.prototype.camPos.z = -100;
      BackgroundComponent.prototype.camera.position.set(BackgroundComponent.prototype.camPos.x,
        BackgroundComponent.prototype.camPos.y, BackgroundComponent.prototype.camPos.z);

      // camera.lookAt( scene.position );

      // camera.rotation.z = time * 0.0001;
      BackgroundComponent.prototype.camera.rotation.y = BackgroundComponent.prototype.camPos.x / -1000;
      BackgroundComponent.prototype.camera.rotation.x = BackgroundComponent.prototype.camPos.y / 1000;
      // camera.rotation.z = camPos.x / -2000;
      BackgroundComponent.prototype.camera.rotation.z =
        (BackgroundComponent.prototype.camPos.x - BackgroundComponent.prototype.mouse.x * 400) / 2000;

      BackgroundComponent.prototype.renderer.render(BackgroundComponent.prototype.scene, BackgroundComponent.prototype.camera);

      // if (time < 800)
      requestAnimationFrame(BackgroundComponent.prototype.render);
    };
  }

 /* num(min: number, max: number): any {
    return Math.random() * (max - min) + min;
  }*/

  /*draw(props: any): any {
    const colours = {
      slow: {
        r: BackgroundComponent.prototype.num(0, 0.2),
        g: BackgroundComponent.prototype.num(0.5, 0.9),
        b: BackgroundComponent.prototype.num(0.3, 0.7)
      },
      fast: {
        r: BackgroundComponent.prototype.num(0.9, 1.0),
        g: BackgroundComponent.prototype.num(0.1, 0.7),
        b: BackgroundComponent.prototype.num(0.2, 0.5)
      }
    };

    const uniforms = {
      r: {type: 'f', value: colours.slow.r},
      g: {type: 'f', value: colours.slow.g},
      b: {type: 'f', value: colours.slow.b},
      distanceX: {type: 'f', value: 1.0},
      distanceZ: {type: 'f', value: 1.0},
      pulse: {type: 'f', value: 0},
      speed: {type: 'f', value: BackgroundComponent.prototype.speed}
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: BackgroundComponent.prototype.vertexShader,
      fragmentShader: BackgroundComponent.prototype.fragmentShader
    });

    const geometry = new THREE.BoxGeometry(props.width, props.height, props.depth);
    BackgroundComponent.prototype.object = new THREE.Mesh(geometry, material);
    BackgroundComponent.prototype.object.colours = colours;
    return BackgroundComponent.prototype.object;
  }*/

  /*init(): void {
    BackgroundComponent.prototype.scene = new THREE.Scene();
    BackgroundComponent.prototype.camera =
      new THREE.PerspectiveCamera(100, BackgroundComponent.prototype.sw / BackgroundComponent.prototype.sh, 1, 10000);
    BackgroundComponent.prototype.scene.add(BackgroundComponent.prototype.camera);
    BackgroundComponent.prototype.renderer = new THREE.WebGLRenderer({antialias: true});
    BackgroundComponent.prototype.renderer.setSize(BackgroundComponent.prototype.sw, BackgroundComponent.prototype.sh);

    for (let j = 0, jl = BackgroundComponent.prototype.rows; j < jl; j++) {
      BackgroundComponent.prototype.boxes.planeBottom[j] = [];
      BackgroundComponent.prototype.boxes.planeTop[j] = [];
      for (let i = 0, il = BackgroundComponent.prototype.cols; i < il; i++) {
       BackgroundComponent.prototype.boxes.planeBottom[j][i] = BackgroundComponent.prototype.emptySlot;
       BackgroundComponent.prototype.boxes.planeTop[j][i] = BackgroundComponent.prototype.emptySlot;
      }
    }

    for (let i = 0, il = BackgroundComponent.prototype.rows * BackgroundComponent.prototype.cols; i < il ; i++) {
     BackgroundComponent.prototype.createBox();
    }
    document.body.appendChild(BackgroundComponent.prototype.renderer.domElement);

    BackgroundComponent.prototype.listen(['resize'], (e) => {
      BackgroundComponent.prototype.sw = window.innerWidth;
      BackgroundComponent.prototype.sh = window.innerHeight;
      BackgroundComponent.prototype.camera.aspect = BackgroundComponent.prototype.sw / BackgroundComponent.prototype.sh;
      BackgroundComponent.prototype.camera.updateProjectionMatrix();
      BackgroundComponent.prototype.renderer.setSize(BackgroundComponent.prototype.sw, BackgroundComponent.prototype.sh);
    });

    BackgroundComponent.prototype.listen(['mousedown', 'touchstart'], (e) => {
      e.preventDefault();
      BackgroundComponent.prototype.isMouseDown = true;
    });

    BackgroundComponent.prototype.listen(['mousemove', 'touchmove'], (e) => {
      e.preventDefault();
      if (e.changedTouches && e.changedTouches[0]) {
        e = e.changedTouches[0];
      }
      BackgroundComponent.prototype.mouse.x = (e.clientX / BackgroundComponent.prototype.sw) * 2 - 1;
      BackgroundComponent.prototype.mouse.y = -(e.clientY / BackgroundComponent.prototype.sh) * 2 - 1;
    });

    BackgroundComponent.prototype.listen(['ouseup', 'touchend'], (e) => {
      e.preventDefault();
      BackgroundComponent.prototype.isMouseDown = false;
    });

    BackgroundComponent.prototype.render(0);
  }*/

  /*createBox(): void {
    const xi = Math.floor(Math.random() * BackgroundComponent.prototype.cols), xai = xi;
    const yi = Math.random() > 0.5 ? 1 : -1, yai = yi === -1 ?
      BackgroundComponent.prototype.planeBottom : BackgroundComponent.prototype.planeTop;
    const zi = Math.floor(Math.random() * BackgroundComponent.prototype.rows), zai = zi ;
    const x = (xi - BackgroundComponent.prototype.cols / 2) *
      (BackgroundComponent.prototype.size.width + BackgroundComponent.prototype.gap);
    const y = yi * BackgroundComponent.prototype.planeOffset;
    const z = zi * (BackgroundComponent.prototype.size.depth + BackgroundComponent.prototype.gap);
    if (BackgroundComponent.prototype.boxes[yai][zai][xai] === BackgroundComponent.prototype.emptySlot) {
      const box = BackgroundComponent.prototype.draw(BackgroundComponent.prototype.size);
      box.position.y = y;
      box.isWarping = false;
      box.offset = {x: x, z: 0};
      box.posZ = z;
      BackgroundComponent.prototype.boxes[yai][zai][xai] = box;
      BackgroundComponent.prototype.boxes1d.push(box);
      BackgroundComponent.prototype.scene.add(box);
    }
  }*/

  /*listen(eventNames: any, callback: any): void {
    for (let i = 0 ; i < eventNames.length; i++) {
     window.addEventListener(eventNames[i], callback);
    }
  }*/

  /*move(x: any, y: any, z: any): void {
    const box = BackgroundComponent.prototype.boxes[y][z][x];

    if (box !== BackgroundComponent.prototype.emptySlot) {
      box.position.x = box.offset.x;
      box.position.y = box.offset.z;

      if (box.position.z > 0) {
        box.posZ -= BackgroundComponent.prototype.allRowsDepth;
      }

      if (!box.isWarping && Math.random() > 0.999) {
        const dir = Math.floor(Math.random() * 5);
        let xn = x, zn = z, yn = y, yi = 0, xo = 0, zo = 0;
        switch (dir) {
          case 0 : xn++; xo = 1; break;
          case 1 : xn--; xo = -1; break;
          case 2 : zn++; zo = 1; break;
          case 3 : zn--; zo = -1; break;
          case 4 :
            yn = (y === BackgroundComponent.prototype.planeTop) ?
              BackgroundComponent.prototype.planeBottom : BackgroundComponent.prototype.planeTop;
            yi = (y === BackgroundComponent.prototype.planeTop) ? -1 : 1;
            break;
        }

        if (BackgroundComponent.prototype.boxes[yn][zn] &&
          BackgroundComponent.prototype.boxes[yn][zn][xn] === BackgroundComponent.prototype.emptySlot) {
          BackgroundComponent.prototype.boxes[y][z][x] = BackgroundComponent.prototype.emptySlot;
          box.isWarping = true;
          BackgroundComponent.prototype.boxes[yn][zn][xn] = box;

          if (dir === 4) {
            TweenMax.to(box.position, 0.5, {
              y : yi * BackgroundComponent.prototype.planeOffset
            });
          } else {
            TweenMax.to(box.offset, 0.5, {
              x: box.offset.x + xo * (BackgroundComponent.prototype.size.width + BackgroundComponent.prototype.gap),
              z: box.offset.z + zo * (BackgroundComponent.prototype.size.depth + BackgroundComponent.prototype.gap),
            });
          }
          TweenMax.to(box.offset, 0.6, {
            onComplete: function () {
              box.isWarping = false;
            }
          });
        }
      }
    }
  }*/

  /*render(time: any): void {
    // debugger;
    // console.log(`BackgroundComponent.prototype.speed: ${BackgroundComponent.prototype.speed}`);
    // BackgroundComponent.prototype.speed = 4;
    // console.log(`backgroundComponent.property.speed: ${BackgroundComponent.prototype.speed}`);
    BackgroundComponent.prototype.speed =
      BackgroundComponent.prototype.speed - (BackgroundComponent.prototype.speed -
      (BackgroundComponent.prototype.isMouseDown ?
        BackgroundComponent.prototype.speedFast : BackgroundComponent.prototype.speedNormal)) * 0.05;

    let box;
    for (let b = 0, bl = BackgroundComponent.prototype.boxes1d.length; b < bl; b ++) {
      box = BackgroundComponent.prototype.boxes1d[b];
      box.posZ += BackgroundComponent.prototype.speed;

      // 摄像机正常化Z距离
      const distanceZ = 1 - ((BackgroundComponent.prototype.allRowsDepth - box.posZ) / (BackgroundComponent.prototype.allRowsDepth) - 1 );
      box.material.uniforms.distanceZ.value = distanceZ;

      // 从相机（中心）正常化X距离
      const distanceX = 1 - (Math.abs(box.position.x)) / (BackgroundComponent.prototype.allColsWidth / 3);
      box.material.uniforms.distanceX.value = distanceX;

      const colour = BackgroundComponent.prototype.isMouseDown ? box.colours.fast : box.colours.slow;
      box.material.uniforms.r.value -= (box.material.uniforms.r.value - colour.r) * 0.1;
      box.material.uniforms.g.value -= (box.material.uniforms.g.value - colour.g) * 0.1;
      box.material.uniforms.b.value -= (box.material.uniforms.b.value - colour.b) * 0.1;

      // 正常化速度
      const currentSpeed = (BackgroundComponent.prototype.speed -
        BackgroundComponent.prototype.speedNormal) / (BackgroundComponent.prototype.speedFast - BackgroundComponent.prototype.speedNormal)
      box.material.uniforms.speed.value = currentSpeed;

      // 脉冲速度
      if (Math.random() > (0.99995 - currentSpeed * 0.005)) {
        box.material.uniforms.pulse.value = 1;
      }
      box.material.uniforms.pulse.value -= box.material.uniforms.pulse.value * 0.1 / (currentSpeed + 1);
      // if (b ==13) con.log(box.material.uniforms.speed.value);
    }

    for (let j = 0, jl = BackgroundComponent.prototype.rows; j < jl; j++) {
      for (let i = 0, il = BackgroundComponent.prototype.cols; i < il; i++) {
        BackgroundComponent.prototype.move(i, BackgroundComponent.prototype.planeBottom, j);
        BackgroundComponent.prototype.move(i, BackgroundComponent.prototype.planeTop, j);
      }
    }

    BackgroundComponent.prototype.camPos.x -= (BackgroundComponent.prototype.camPos.x - BackgroundComponent.prototype.mouse.x * 400) * 0.02;
    BackgroundComponent.prototype.camPos.y -= (BackgroundComponent.prototype.camPos.y - BackgroundComponent.prototype.mouse.y * 150) * 0.05;
    BackgroundComponent.prototype.camPos.z = -100;
    BackgroundComponent.prototype.camera.position.set(BackgroundComponent.prototype.camPos.x,
      BackgroundComponent.prototype.camPos.y, BackgroundComponent.prototype.camPos.z);

    BackgroundComponent.prototype.camera.rotation.y = BackgroundComponent.prototype.camPos.x / -1000;
    BackgroundComponent.prototype.camera.rotation.x = BackgroundComponent.prototype.camPos.y / 1000;
    BackgroundComponent.prototype.camera.rotation.z = (BackgroundComponent.prototype.camPos.x
      - BackgroundComponent.prototype.mouse.x * 400) / 2000;

    BackgroundComponent.prototype.renderer.render(BackgroundComponent.prototype.scene, BackgroundComponent.prototype.camera);
    requestAnimationFrame(BackgroundComponent.prototype.render);
  }*/

}

