import * as THREE from "three";

function createDigitTexture(value) {
  const size = 128;
  const canvasEl = document.createElement("canvas");
  canvasEl.width = size;
  canvasEl.height = size;
  const ctx = canvasEl.getContext("2d");
  ctx.font = "700 96px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000000";
  ctx.fillText(value, size / 2, size / 2 + 6);
  const texture = new THREE.CanvasTexture(canvasEl);
  texture.needsUpdate = true;
  return texture;
}

function initBinarySphere() {
  const canvas = document.getElementById("binary-sphere-canvas");
  const section = document.getElementById("ecosystem-section");
  if (!canvas || !section) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  } catch (error) {
    return;
  }

  renderer.setClearColor(0xffffff, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 9;

  const group = new THREE.Group();
  scene.add(group);

  const textures = { 0: createDigitTexture("0"), 1: createDigitTexture("1") };
  const total = 170;
  const radius = 4.6;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < total; i += 1) {
    const digit = Math.random() > 0.5 ? 1 : 0;
    const material = new THREE.SpriteMaterial({
      map: textures[digit],
      transparent: true,
      opacity: 0.5 + Math.random() * 0.4,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(material);

    const y = 1 - (i / (total - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    sprite.position.set(Math.cos(theta) * radiusAtY * radius, y * radius, Math.sin(theta) * radiusAtY * radius);

    const scale = 0.4 + Math.random() * 0.22;
    sprite.scale.set(scale, scale, 1);
    group.add(sprite);
  }

  const resize = () => {
    const rect = section.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  };

  resize();
  window.addEventListener("resize", resize);

  let isVisible = true;
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
      });
    });
    observer.observe(section);
  }

  const animate = () => {
    requestAnimationFrame(animate);
    if (!isVisible) return;
    group.rotation.y += 0.0022;
    group.rotation.x = Math.sin(Date.now() * 0.00018) * 0.18;
    renderer.render(scene, camera);
  };

  animate();
}

initBinarySphere();
