/* Isolated Three.js image-to-image disintegration; no other section modifies this scene. */
(() => {
  const canvas = document.getElementById("particle-canvas");
  const enabled = matchMedia(
    "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
  ).matches;
  if (!canvas || !window.THREE || !enabled) return;

  const load = (src) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  const sample = (image, size) => {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const x = c.getContext("2d");
    const scale = Math.max(size / image.width, size / image.height);
    x.drawImage(
      image,
      (size - image.width * scale) / 2,
      (size - image.height * scale) / 2,
      image.width * scale,
      image.height * scale,
    );
    return x.getImageData(0, 0, size, size).data;
  };

  Promise.all([
    load(
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    ),
    load(
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=85",
    ),
  ])
    .then(([imageA, imageB]) => {
      const grid = 150,
        count = grid * grid,
        pixelsA = sample(imageA, grid),
        pixelsB = sample(imageB, grid);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        46,
        innerWidth / innerHeight,
        0.1,
        1000,
      );
      camera.position.z = 170;
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      const positions = new Float32Array(count * 3),
        starts = new Float32Array(count * 3),
        ends = new Float32Array(count * 3),
        colors = new Float32Array(count * 3),
        colorA = new Float32Array(count * 3),
        colorB = new Float32Array(count * 3),
        delays = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const ix = i % grid,
          iy = Math.floor(i / grid),
          p = i * 3,
          px = i * 4;
        starts[p] = (ix - grid / 2) * 0.78;
        starts[p + 1] = (grid / 2 - iy) * 0.78;
        ends[p] = (ix - grid / 2) * 0.78 + Math.sin(iy * 0.11) * 10;
        ends[p + 1] = (grid / 2 - iy) * 0.78 + Math.cos(ix * 0.11) * 7;
        for (let channel = 0; channel < 3; channel++) {
          colorA[p + channel] = pixelsA[px + channel] / 255;
          colorB[p + channel] = pixelsB[px + channel] / 255;
          colors[p + channel] = colorA[p + channel];
        }
        delays[i] = Math.random() * 0.18;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      scene.add(
        new THREE.Points(
          geometry,
          new THREE.PointsMaterial({
            size: 1.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.92,
            sizeAttenuation: true,
          }),
        ),
      );
      let progress = 0;
      ScrollTrigger.create({
        trigger: ".particle-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: ".particle-stage",
        onUpdate: (self) => {
          progress = self.progress;
        },
      });
      function resize() {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
      }
      resize();
      addEventListener("resize", resize);
      function render(time) {
        const p = geometry.attributes.position.array,
          c = geometry.attributes.color.array;
        for (let i = 0; i < count; i++) {
          const j = i * 3;
          let t = Math.max(0, Math.min(1, (progress - delays[i]) / 0.82));
          t = t * t * (3 - 2 * t);
          p[j] = starts[j] + (ends[j] - starts[j]) * t;
          p[j + 1] = starts[j + 1] + (ends[j + 1] - starts[j + 1]) * t;
          p[j + 2] =
            Math.sin(t * Math.PI) * 18 + Math.sin(time * 0.001 + i) * 0.35;
          c[j] = colorA[j] + (colorB[j] - colorA[j]) * t;
          c[j + 1] = colorA[j + 1] + (colorB[j + 1] - colorA[j + 1]) * t;
          c[j + 2] = colorA[j + 2] + (colorB[j + 2] - colorA[j + 2]) * t;
        }
        geometry.attributes.position.needsUpdate =
          geometry.attributes.color.needsUpdate = true;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    })
    .catch(() => {
      document.querySelector(".particle-stage").style.display = "none";
      document.querySelector(".particle-fallback").style.display = "grid";
    });
})();
