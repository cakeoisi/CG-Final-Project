/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer.js */ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass.js */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_UnrealBloomPass_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/postprocessing/UnrealBloomPass.js */ "./node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js");

// ポストプロセス用のモジュールをインポート



class ThreeJSContainer {
    constructor() {
        this.asteroids = [];
        this.keys = {};
        this.mouseDown = false;
        this.shootingStars = [];
        this.createRendererDOM = (width, height, cameraPos) => {
            this.renderer = new three__WEBPACK_IMPORTED_MODULE_3__.WebGLRenderer();
            this.renderer.setSize(width, height);
            this.renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_3__.Color(0x000000));
            document.body.appendChild(this.renderer.domElement);
            this.scene = new three__WEBPACK_IMPORTED_MODULE_3__.Scene();
            this.clock = new three__WEBPACK_IMPORTED_MODULE_3__.Clock();
            this.camera = new three__WEBPACK_IMPORTED_MODULE_3__.PerspectiveCamera(75, width / height, 0.1, 2000);
            this.camera.position.copy(cameraPos);
            this.camera.rotation.order = 'YXZ';
            const ambientLight = new three__WEBPACK_IMPORTED_MODULE_3__.AmbientLight(0xffffff, 0.5);
            this.scene.add(ambientLight);
            const directionalLight = new three__WEBPACK_IMPORTED_MODULE_3__.DirectionalLight(0xffffff, 1.0);
            directionalLight.position.set(1, 1, 1);
            this.scene.add(directionalLight);
            // ★ ブルーム効果の設定
            const renderScene = new three_examples_jsm_postprocessing_RenderPass_js__WEBPACK_IMPORTED_MODULE_1__.RenderPass(this.scene, this.camera);
            const bloomPass = new three_examples_jsm_postprocessing_UnrealBloomPass_js__WEBPACK_IMPORTED_MODULE_2__.UnrealBloomPass(new three__WEBPACK_IMPORTED_MODULE_3__.Vector2(width, height), 1.5, 0.4, 0.85);
            // パラメータ: (解像度, 強さ, 半径, しきい値)
            bloomPass.threshold = 0.21;
            bloomPass.strength = 1.2;
            bloomPass.radius = 0.55;
            this.composer = new three_examples_jsm_postprocessing_EffectComposer_js__WEBPACK_IMPORTED_MODULE_0__.EffectComposer(this.renderer);
            this.composer.addPass(renderScene);
            this.composer.addPass(bloomPass);
            this.createStarfield();
            this.createAsteroids(30);
            this.createShootingStars(10);
            this.setupEventListeners();
            this.render();
        };
        // createStarfield, createAsteroids, createShootingStars, resetShootingStar, setupEventListeners,
        // onMouseDown, onMouseUp, onMouseMove, updateCameraByKey, updateShootingStars の各メソッドは変更なし
        // (下に全文記載しています)
        this.createStarfield = () => {
            const particlesGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
            const count = 10000;
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);
            for (let i = 0; i < count * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 2000;
                positions[i + 1] = (Math.random() - 0.5) * 2000;
                positions[i + 2] = (Math.random() - 0.5) * 2000;
                const color = new three__WEBPACK_IMPORTED_MODULE_3__.Color();
                color.setHSL(Math.random(), 0.8, 0.85);
                colors[i] = color.r;
                colors[i + 1] = color.g;
                colors[i + 2] = color.b;
            }
            particlesGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(positions, 3));
            particlesGeometry.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(colors, 3));
            const particlesMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
                size: 1.5,
                vertexColors: true,
                blending: three__WEBPACK_IMPORTED_MODULE_3__.AdditiveBlending,
                transparent: true,
                opacity: 0.8,
            });
            const starField = new three__WEBPACK_IMPORTED_MODULE_3__.Points(particlesGeometry, particlesMaterial);
            this.scene.add(starField);
        };
        this.createAsteroids = (numAsteroids) => {
            const asteroidGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.IcosahedronGeometry(1, 0);
            const asteroidColors = [0x808080, 0xa9a9a9, 0x696969, 0x778899];
            for (let i = 0; i < numAsteroids; i++) {
                const randomColor = asteroidColors[Math.floor(Math.random() * asteroidColors.length)];
                const asteroidMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({
                    color: randomColor,
                    metalness: 0.3,
                    roughness: 0.7,
                });
                const asteroid = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(asteroidGeometry, asteroidMaterial);
                asteroid.position.x = (Math.random() - 0.5) * 300;
                asteroid.position.y = (Math.random() - 0.5) * 300;
                asteroid.position.z = (Math.random() - 0.5) * 300;
                const scale = Math.random() * 5 + 2;
                asteroid.scale.set(scale, scale, scale);
                this.scene.add(asteroid);
                this.asteroids.push(asteroid);
            }
        };
        this.createShootingStars = (numStars) => {
            const starGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
            starGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(new Float32Array([0, 0, 0]), 3));
            for (let i = 0; i < numStars; i++) {
                const starMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
                    size: 5,
                    color: new three__WEBPACK_IMPORTED_MODULE_3__.Color(0xffffcc),
                    blending: three__WEBPACK_IMPORTED_MODULE_3__.AdditiveBlending,
                    transparent: true,
                    opacity: 0.9,
                    depthWrite: false,
                });
                const mesh = new three__WEBPACK_IMPORTED_MODULE_3__.Points(starGeometry, starMaterial);
                const velocity = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3();
                this.resetShootingStar({ mesh, velocity });
                this.shootingStars.push({ mesh, velocity });
                this.scene.add(mesh);
            }
        };
        this.resetShootingStar = (star) => {
            star.mesh.position.set((Math.random() - 0.5) * 2000, Math.random() * 500 + 500, (Math.random() - 0.5) * 2000);
            star.velocity.set((Math.random() - 0.5) * 4, -Math.random() * 5 - 5, (Math.random() - 0.5) * 4);
            star.velocity.normalize().clone().multiplyScalar(Math.random() * 10 + 20);
        };
        this.setupEventListeners = () => {
            document.addEventListener('keydown', (event) => { this.keys[event.key.toLowerCase()] = true; });
            document.addEventListener('keyup', (event) => { this.keys[event.key.toLowerCase()] = false; });
            this.renderer.domElement.addEventListener('mousedown', this.onMouseDown);
            this.renderer.domElement.addEventListener('mouseup', this.onMouseUp);
            this.renderer.domElement.addEventListener('mousemove', this.onMouseMove);
            this.renderer.domElement.addEventListener('mouseleave', this.onMouseUp);
        };
        this.onMouseDown = (event) => {
            if (event.button === 0) {
                this.mouseDown = true;
            }
        };
        this.onMouseUp = (event) => {
            if (event.button === 0) {
                this.mouseDown = false;
            }
        };
        this.onMouseMove = (event) => {
            if (!this.mouseDown)
                return;
            const sensitivity = 0.002;
            this.camera.rotation.y -= event.movementX * sensitivity;
            this.camera.rotation.x -= event.movementY * sensitivity;
            this.camera.rotation.x = three__WEBPACK_IMPORTED_MODULE_3__.MathUtils.clamp(this.camera.rotation.x, -Math.PI / 2 * 0.95, Math.PI / 2 * 0.95);
        };
        this.updateCameraByKey = (deltaTime) => {
            const speed = 50.0;
            const moveDirection = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3();
            if (this.keys['w'] || this.keys['arrowup'])
                moveDirection.z -= 1;
            if (this.keys['s'] || this.keys['arrowdown'])
                moveDirection.z += 1;
            if (this.keys['a'] || this.keys['arrowleft'])
                moveDirection.x -= 1;
            if (this.keys['d'] || this.keys['arrowright'])
                moveDirection.x += 1;
            if (moveDirection.length() > 0) {
                moveDirection.clone().normalize();
                this.camera.translateX(moveDirection.x * speed * deltaTime);
                this.camera.translateZ(moveDirection.z * speed * deltaTime);
            }
        };
        this.updateShootingStars = () => {
            const resetDistance = 1200;
            this.shootingStars.forEach(star => {
                star.mesh.position.clone().add(star.velocity);
                if (star.mesh.position.length() > resetDistance) {
                    this.resetShootingStar(star);
                }
            });
        };
        this.update = () => {
            const deltaTime = this.clock.getDelta();
            this.updateCameraByKey(deltaTime);
            this.updateShootingStars();
            this.asteroids.forEach(asteroid => {
                asteroid.rotation.x += 0.1 * deltaTime;
                asteroid.rotation.y += 0.2 * deltaTime;
            });
            // ★ renderer.renderの代わりにcomposer.renderを呼ぶ
            this.composer.render();
        };
        this.render = () => {
            requestAnimationFrame(this.render);
            this.update();
        };
    }
}
window.addEventListener("DOMContentLoaded", () => {
    const container = new ThreeJSContainer();
    container.createRendererDOM(window.innerWidth, window.innerHeight, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 20, 50));
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_examples_jsm_postprocessing_EffectComposer_js-node_modules_three_e-eaf715"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3JHLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O1VDN09IO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbi8vIOODneOCueODiOODl+ODreOCu+OCueeUqOOBruODouOCuOODpeODvOODq+OCkuOCpOODs+ODneODvOODiFxuaW1wb3J0IHsgRWZmZWN0Q29tcG9zZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvRWZmZWN0Q29tcG9zZXIuanMnO1xuaW1wb3J0IHsgUmVuZGVyUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9SZW5kZXJQYXNzLmpzJztcbmltcG9ydCB7IFVucmVhbEJsb29tUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9VbnJlYWxCbG9vbVBhc3MuanMnO1xuXG5jbGFzcyBUaHJlZUpTQ29udGFpbmVyIHtcbiAgICBwcml2YXRlIHNjZW5lITogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBjYW1lcmEhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcbiAgICBwcml2YXRlIHJlbmRlcmVyITogVEhSRUUuV2ViR0xSZW5kZXJlcjtcbiAgICBwcml2YXRlIGNsb2NrITogVEhSRUUuQ2xvY2s7XG4gICAgcHJpdmF0ZSBhc3Rlcm9pZHM6IFRIUkVFLk1lc2hbXSA9IFtdO1xuICAgIHByaXZhdGUga2V5czogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcbiAgICBwcml2YXRlIG1vdXNlRG93bjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgc2hvb3RpbmdTdGFyczogeyBtZXNoOiBUSFJFRS5Qb2ludHM7IHZlbG9jaXR5OiBUSFJFRS5WZWN0b3IzIH1bXSA9IFtdO1xuICAgIHByaXZhdGUgY29tcG9zZXIhOiBFZmZlY3RDb21wb3NlcjsgLy8g4piFIEVmZmVjdENvbXBvc2Vy44OX44Ot44OR44OG44Kj44KS6L+95YqgXG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcHVibGljIGNyZWF0ZVJlbmRlcmVyRE9NID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjYW1lcmFQb3M6IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKG5ldyBUSFJFRS5Db2xvcigweDAwMDAwMCkpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgICAgICB0aGlzLmNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7XG5cbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDIwMDApO1xuICAgICAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7XG4gICAgICAgIHRoaXMuY2FtZXJhLnJvdGF0aW9uLm9yZGVyID0gJ1lYWic7XG5cbiAgICAgICAgY29uc3QgYW1iaWVudExpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweGZmZmZmZiwgMC41KTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoYW1iaWVudExpZ2h0KTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uYWxMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAxLjApO1xuICAgICAgICBkaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uLnNldCgxLCAxLCAxKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoZGlyZWN0aW9uYWxMaWdodCk7XG5cbiAgICAgICAgLy8g4piFIOODluODq+ODvOODoOWKueaenOOBruioreWumlxuICAgICAgICBjb25zdCByZW5kZXJTY2VuZSA9IG5ldyBSZW5kZXJQYXNzKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICAgICAgY29uc3QgYmxvb21QYXNzID0gbmV3IFVucmVhbEJsb29tUGFzcyhuZXcgVEhSRUUuVmVjdG9yMih3aWR0aCwgaGVpZ2h0KSwgMS41LCAwLjQsIDAuODUpO1xuICAgICAgICAvLyDjg5Hjg6njg6Hjg7zjgr86ICjop6Plg4/luqYsIOW8t+OBlSwg5Y2K5b6ELCDjgZfjgY3jgYTlgKQpXG4gICAgICAgIGJsb29tUGFzcy50aHJlc2hvbGQgPSAwLjIxO1xuICAgICAgICBibG9vbVBhc3Muc3RyZW5ndGggPSAxLjI7XG4gICAgICAgIGJsb29tUGFzcy5yYWRpdXMgPSAwLjU1O1xuXG4gICAgICAgIHRoaXMuY29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIodGhpcy5yZW5kZXJlcik7XG4gICAgICAgIHRoaXMuY29tcG9zZXIuYWRkUGFzcyhyZW5kZXJTY2VuZSk7XG4gICAgICAgIHRoaXMuY29tcG9zZXIuYWRkUGFzcyhibG9vbVBhc3MpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlU3RhcmZpZWxkKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQXN0ZXJvaWRzKDMwKTtcbiAgICAgICAgdGhpcy5jcmVhdGVTaG9vdGluZ1N0YXJzKDEwKTtcblxuICAgICAgICB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZVN0YXJmaWVsZCwgY3JlYXRlQXN0ZXJvaWRzLCBjcmVhdGVTaG9vdGluZ1N0YXJzLCByZXNldFNob290aW5nU3Rhciwgc2V0dXBFdmVudExpc3RlbmVycyxcbiAgICAvLyBvbk1vdXNlRG93biwgb25Nb3VzZVVwLCBvbk1vdXNlTW92ZSwgdXBkYXRlQ2FtZXJhQnlLZXksIHVwZGF0ZVNob290aW5nU3RhcnMg44Gu5ZCE44Oh44K944OD44OJ44Gv5aSJ5pu044Gq44GXXG4gICAgLy8gKOS4i+OBq+WFqOaWh+iomOi8ieOBl+OBpuOBhOOBvuOBmSlcblxuICAgIHByaXZhdGUgY3JlYXRlU3RhcmZpZWxkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJ0aWNsZXNHZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBjb25zdCBjb3VudCA9IDEwMDAwO1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KGNvdW50ICogMyk7XG4gICAgICAgIGNvbnN0IGNvbG9ycyA9IG5ldyBGbG9hdDMyQXJyYXkoY291bnQgKiAzKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50ICogMzsgaSArPSAzKSB7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaV0gPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyMDAwO1xuICAgICAgICAgICAgcG9zaXRpb25zW2kgKyAxXSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIwMDA7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaSArIDJdID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMjAwMDtcblxuICAgICAgICAgICAgY29uc3QgY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoKTtcbiAgICAgICAgICAgIGNvbG9yLnNldEhTTChNYXRoLnJhbmRvbSgpLCAwLjgsIDAuODUpO1xuICAgICAgICAgICAgY29sb3JzW2ldID0gY29sb3IucjtcbiAgICAgICAgICAgIGNvbG9yc1tpICsgMV0gPSBjb2xvci5nO1xuICAgICAgICAgICAgY29sb3JzW2kgKyAyXSA9IGNvbG9yLmI7XG4gICAgICAgIH1cbiAgICAgICAgcGFydGljbGVzR2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLCAzKSk7XG4gICAgICAgIHBhcnRpY2xlc0dlb21ldHJ5LnNldEF0dHJpYnV0ZSgnY29sb3InLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGNvbG9ycywgMykpO1xuXG4gICAgICAgIGNvbnN0IHBhcnRpY2xlc01hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICAgICAgICAgIHNpemU6IDEuNSxcbiAgICAgICAgICAgIHZlcnRleENvbG9yczogdHJ1ZSxcbiAgICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjgsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzdGFyRmllbGQgPSBuZXcgVEhSRUUuUG9pbnRzKHBhcnRpY2xlc0dlb21ldHJ5LCBwYXJ0aWNsZXNNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHN0YXJGaWVsZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVBc3Rlcm9pZHMgPSAobnVtQXN0ZXJvaWRzOiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgYXN0ZXJvaWRHZW9tZXRyeSA9IG5ldyBUSFJFRS5JY29zYWhlZHJvbkdlb21ldHJ5KDEsIDApO1xuICAgICAgICBjb25zdCBhc3Rlcm9pZENvbG9ycyA9IFsweDgwODA4MCwgMHhhOWE5YTksIDB4Njk2OTY5LCAweDc3ODg5OV07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Bc3Rlcm9pZHM7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmFuZG9tQ29sb3IgPSBhc3Rlcm9pZENvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhc3Rlcm9pZENvbG9ycy5sZW5ndGgpXTtcbiAgICAgICAgICAgIGNvbnN0IGFzdGVyb2lkTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgICAgICAgICAgIGNvbG9yOiByYW5kb21Db2xvcixcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3M6IDAuMyxcbiAgICAgICAgICAgICAgICByb3VnaG5lc3M6IDAuNyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgYXN0ZXJvaWQgPSBuZXcgVEhSRUUuTWVzaChhc3Rlcm9pZEdlb21ldHJ5LCBhc3Rlcm9pZE1hdGVyaWFsKTtcbiAgICAgICAgICAgIGFzdGVyb2lkLnBvc2l0aW9uLnggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAzMDA7XG4gICAgICAgICAgICBhc3Rlcm9pZC5wb3NpdGlvbi55ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMzAwO1xuICAgICAgICAgICAgYXN0ZXJvaWQucG9zaXRpb24ueiA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDMwMDtcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlID0gTWF0aC5yYW5kb20oKSAqIDUgKyAyO1xuICAgICAgICAgICAgYXN0ZXJvaWQuc2NhbGUuc2V0KHNjYWxlLCBzY2FsZSwgc2NhbGUpO1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQoYXN0ZXJvaWQpO1xuICAgICAgICAgICAgdGhpcy5hc3Rlcm9pZHMucHVzaChhc3Rlcm9pZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVNob290aW5nU3RhcnMgPSAobnVtU3RhcnM6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBzdGFyR2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgc3Rhckdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDBdKSwgMykpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtU3RhcnM7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgc3Rhck1hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICAgICAgICAgICAgICBzaXplOiA1LFxuICAgICAgICAgICAgICAgIGNvbG9yOiBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmY2MpLFxuICAgICAgICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuOSxcbiAgICAgICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLlBvaW50cyhzdGFyR2VvbWV0cnksIHN0YXJNYXRlcmlhbCk7XG4gICAgICAgICAgICBjb25zdCB2ZWxvY2l0eSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgICAgICAgICAgIHRoaXMucmVzZXRTaG9vdGluZ1N0YXIoeyBtZXNoLCB2ZWxvY2l0eSB9KTtcblxuICAgICAgICAgICAgdGhpcy5zaG9vdGluZ1N0YXJzLnB1c2goeyBtZXNoLCB2ZWxvY2l0eSB9KTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKG1lc2gpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldFNob290aW5nU3RhciA9IChzdGFyOiB7IG1lc2g6IFRIUkVFLlBvaW50czsgdmVsb2NpdHk6IFRIUkVFLlZlY3RvcjMgfSkgPT4ge1xuICAgICAgICBzdGFyLm1lc2gucG9zaXRpb24uc2V0KFxuICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMjAwMCxcbiAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiA1MDAgKyA1MDAsXG4gICAgICAgICAgICAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyMDAwXG4gICAgICAgICk7XG5cbiAgICAgICAgc3Rhci52ZWxvY2l0eS5zZXQoXG4gICAgICAgICAgICAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA0LFxuICAgICAgICAgICAgLU1hdGgucmFuZG9tKCkgKiA1IC0gNSxcbiAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDRcbiAgICAgICAgKTtcblxuICAgICAgICBzdGFyLnZlbG9jaXR5Lm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKE1hdGgucmFuZG9tKCkgKiAxMCArIDIwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwRXZlbnRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHsgdGhpcy5rZXlzW2V2ZW50LmtleS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7IH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT4geyB0aGlzLmtleXNbZXZlbnQua2V5LnRvTG93ZXJDYXNlKCldID0gZmFsc2U7IH0pO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLm9uTW91c2VVcCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1vdXNlRG93biA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTW91c2VVcCA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1vdXNlTW92ZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMubW91c2VEb3duKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgc2Vuc2l0aXZpdHkgPSAwLjAwMjtcbiAgICAgICAgdGhpcy5jYW1lcmEucm90YXRpb24ueSAtPSBldmVudC5tb3ZlbWVudFggKiBzZW5zaXRpdml0eTtcbiAgICAgICAgdGhpcy5jYW1lcmEucm90YXRpb24ueCAtPSBldmVudC5tb3ZlbWVudFkgKiBzZW5zaXRpdml0eTtcbiAgICAgICAgdGhpcy5jYW1lcmEucm90YXRpb24ueCA9IFRIUkVFLk1hdGhVdGlscy5jbGFtcCh0aGlzLmNhbWVyYS5yb3RhdGlvbi54LCAtTWF0aC5QSSAvIDIgKiAwLjk1LCBNYXRoLlBJIC8gMiAqIDAuOTUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQ2FtZXJhQnlLZXkgPSAoZGVsdGFUaW1lOiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3Qgc3BlZWQgPSA1MC4wO1xuICAgICAgICBjb25zdCBtb3ZlRGlyZWN0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAgICAgICBpZiAodGhpcy5rZXlzWyd3J10gfHwgdGhpcy5rZXlzWydhcnJvd3VwJ10pIG1vdmVEaXJlY3Rpb24ueiAtPSAxO1xuICAgICAgICBpZiAodGhpcy5rZXlzWydzJ10gfHwgdGhpcy5rZXlzWydhcnJvd2Rvd24nXSkgbW92ZURpcmVjdGlvbi56ICs9IDE7XG4gICAgICAgIGlmICh0aGlzLmtleXNbJ2EnXSB8fCB0aGlzLmtleXNbJ2Fycm93bGVmdCddKSBtb3ZlRGlyZWN0aW9uLnggLT0gMTtcbiAgICAgICAgaWYgKHRoaXMua2V5c1snZCddIHx8IHRoaXMua2V5c1snYXJyb3dyaWdodCddKSBtb3ZlRGlyZWN0aW9uLnggKz0gMTtcblxuICAgICAgICBpZiAobW92ZURpcmVjdGlvbi5sZW5ndGgoKSA+IDApIHtcbiAgICAgICAgICAgIG1vdmVEaXJlY3Rpb24ubm9ybWFsaXplKCk7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2xhdGVYKG1vdmVEaXJlY3Rpb24ueCAqIHNwZWVkICogZGVsdGFUaW1lKTtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zbGF0ZVoobW92ZURpcmVjdGlvbi56ICogc3BlZWQgKiBkZWx0YVRpbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVTaG9vdGluZ1N0YXJzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNldERpc3RhbmNlID0gMTIwMDtcbiAgICAgICAgdGhpcy5zaG9vdGluZ1N0YXJzLmZvckVhY2goc3RhciA9PiB7XG4gICAgICAgICAgICBzdGFyLm1lc2gucG9zaXRpb24uYWRkKHN0YXIudmVsb2NpdHkpO1xuICAgICAgICAgICAgaWYgKHN0YXIubWVzaC5wb3NpdGlvbi5sZW5ndGgoKSA+IHJlc2V0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0U2hvb3RpbmdTdGFyKHN0YXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZGVsdGFUaW1lID0gdGhpcy5jbG9jay5nZXREZWx0YSgpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ2FtZXJhQnlLZXkoZGVsdGFUaW1lKTtcbiAgICAgICAgdGhpcy51cGRhdGVTaG9vdGluZ1N0YXJzKCk7XG5cbiAgICAgICAgdGhpcy5hc3Rlcm9pZHMuZm9yRWFjaChhc3Rlcm9pZCA9PiB7XG4gICAgICAgICAgICBhc3Rlcm9pZC5yb3RhdGlvbi54ICs9IDAuMSAqIGRlbHRhVGltZTtcbiAgICAgICAgICAgIGFzdGVyb2lkLnJvdGF0aW9uLnkgKz0gMC4yICogZGVsdGFUaW1lO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyDimIUgcmVuZGVyZXIucmVuZGVy44Gu5Luj44KP44KK44GrY29tcG9zZXIucmVuZGVy44KS5ZG844G2XG4gICAgICAgIHRoaXMuY29tcG9zZXIucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXIgPSAoKSA9PiB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlcik7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IG5ldyBUaHJlZUpTQ29udGFpbmVyKCk7XG4gICAgY29udGFpbmVyLmNyZWF0ZVJlbmRlcmVyRE9NKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQsIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDIwLCA1MCkpO1xufSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9wb3N0cHJvY2Vzc2luZ19FZmZlY3RDb21wb3Nlcl9qcy1ub2RlX21vZHVsZXNfdGhyZWVfZS1lYWY3MTVcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=