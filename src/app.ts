import * as THREE from 'three';
// ポストプロセス用のモジュールをインポート
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

class ThreeJSContainer {
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private clock!: THREE.Clock;
    private asteroids: THREE.Mesh[] = [];
    private keys: { [key: string]: boolean } = {};
    private mouseDown: boolean = false;
    private shootingStars: { mesh: THREE.Points; velocity: THREE.Vector3 }[] = [];
    private composer!: EffectComposer; // ★ EffectComposerプロパティを追加

    constructor() { }

    public createRendererDOM = (width: number, height: number, cameraPos: THREE.Vector3) => {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(new THREE.Color(0x000000));
        document.body.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
        this.camera.position.copy(cameraPos);
        this.camera.rotation.order = 'YXZ';

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);

        // ★ ブルーム効果の設定
        const renderScene = new RenderPass(this.scene, this.camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85);
        // パラメータ: (解像度, 強さ, 半径, しきい値)
        bloomPass.threshold = 0.21;
        bloomPass.strength = 1.2;
        bloomPass.radius = 0.55;

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(renderScene);
        this.composer.addPass(bloomPass);

        this.createStarfield();
        this.createAsteroids(30);
        this.createShootingStars(10);

        this.setupEventListeners();

        this.render();
    }

    // createStarfield, createAsteroids, createShootingStars, resetShootingStar, setupEventListeners,
    // onMouseDown, onMouseUp, onMouseMove, updateCameraByKey, updateShootingStars の各メソッドは変更なし
    // (下に全文記載しています)

    private createStarfield = () => {
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 10000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 2000;
            positions[i + 1] = (Math.random() - 0.5) * 2000;
            positions[i + 2] = (Math.random() - 0.5) * 2000;

            const color = new THREE.Color();
            color.setHSL(Math.random(), 0.8, 0.85);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 1.5,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.8,
        });
        const starField = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(starField);
    }

    private createAsteroids = (numAsteroids: number) => {
        const asteroidGeometry = new THREE.IcosahedronGeometry(1, 0);
        const asteroidColors = [0x808080, 0xa9a9a9, 0x696969, 0x778899];

        for (let i = 0; i < numAsteroids; i++) {
            const randomColor = asteroidColors[Math.floor(Math.random() * asteroidColors.length)];
            const asteroidMaterial = new THREE.MeshStandardMaterial({
                color: randomColor,
                metalness: 0.3,
                roughness: 0.7,
            });
            const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
            asteroid.position.x = (Math.random() - 0.5) * 300;
            asteroid.position.y = (Math.random() - 0.5) * 300;
            asteroid.position.z = (Math.random() - 0.5) * 300;
            const scale = Math.random() * 5 + 2;
            asteroid.scale.set(scale, scale, scale);
            this.scene.add(asteroid);
            this.asteroids.push(asteroid);
        }
    }

    private createShootingStars = (numStars: number) => {
        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));

        for (let i = 0; i < numStars; i++) {
            const starMaterial = new THREE.PointsMaterial({
                size: 5,
                color: new THREE.Color(0xffffcc),
                blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: 0.9,
                depthWrite: false,
            });

            const mesh = new THREE.Points(starGeometry, starMaterial);
            const velocity = new THREE.Vector3();

            this.resetShootingStar({ mesh, velocity });

            this.shootingStars.push({ mesh, velocity });
            this.scene.add(mesh);
        }
    }

    private resetShootingStar = (star: { mesh: THREE.Points; velocity: THREE.Vector3 }) => {
        star.mesh.position.set(
            (Math.random() - 0.5) * 2000,
            Math.random() * 500 + 500,
            (Math.random() - 0.5) * 2000
        );

        star.velocity.set(
            (Math.random() - 0.5) * 4,
            -Math.random() * 5 - 5,
            (Math.random() - 0.5) * 4
        );

        star.velocity.normalize().multiplyScalar(Math.random() * 10 + 20);
    }

    private setupEventListeners = () => {
        document.addEventListener('keydown', (event) => { this.keys[event.key.toLowerCase()] = true; });
        document.addEventListener('keyup', (event) => { this.keys[event.key.toLowerCase()] = false; });

        this.renderer.domElement.addEventListener('mousedown', this.onMouseDown);
        this.renderer.domElement.addEventListener('mouseup', this.onMouseUp);
        this.renderer.domElement.addEventListener('mousemove', this.onMouseMove);
        this.renderer.domElement.addEventListener('mouseleave', this.onMouseUp);
    }

    private onMouseDown = (event: MouseEvent) => {
        if (event.button === 0) {
            this.mouseDown = true;
        }
    }

    private onMouseUp = (event: MouseEvent) => {
        if (event.button === 0) {
            this.mouseDown = false;
        }
    }

    private onMouseMove = (event: MouseEvent) => {
        if (!this.mouseDown) return;

        const sensitivity = 0.002;
        this.camera.rotation.y -= event.movementX * sensitivity;
        this.camera.rotation.x -= event.movementY * sensitivity;
        this.camera.rotation.x = THREE.MathUtils.clamp(this.camera.rotation.x, -Math.PI / 2 * 0.95, Math.PI / 2 * 0.95);
    }

    private updateCameraByKey = (deltaTime: number) => {
        const speed = 50.0;
        const moveDirection = new THREE.Vector3();

        if (this.keys['w'] || this.keys['arrowup']) moveDirection.z -= 1;
        if (this.keys['s'] || this.keys['arrowdown']) moveDirection.z += 1;
        if (this.keys['a'] || this.keys['arrowleft']) moveDirection.x -= 1;
        if (this.keys['d'] || this.keys['arrowright']) moveDirection.x += 1;

        if (moveDirection.length() > 0) {
            moveDirection.normalize();
            this.camera.translateX(moveDirection.x * speed * deltaTime);
            this.camera.translateZ(moveDirection.z * speed * deltaTime);
        }
    }

    private updateShootingStars = () => {
        const resetDistance = 1200;
        this.shootingStars.forEach(star => {
            star.mesh.position.add(star.velocity);
            if (star.mesh.position.length() > resetDistance) {
                this.resetShootingStar(star);
            }
        });
    }

    private update = () => {
        const deltaTime = this.clock.getDelta();

        this.updateCameraByKey(deltaTime);
        this.updateShootingStars();

        this.asteroids.forEach(asteroid => {
            asteroid.rotation.x += 0.1 * deltaTime;
            asteroid.rotation.y += 0.2 * deltaTime;
        });

        // ★ renderer.renderの代わりにcomposer.renderを呼ぶ
        this.composer.render();
    }

    private render = () => {
        requestAnimationFrame(this.render);
        this.update();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const container = new ThreeJSContainer();
    container.createRendererDOM(window.innerWidth, window.innerHeight, new THREE.Vector3(0, 20, 50));
});
