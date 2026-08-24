/* Global particle sculpture: scroll advances six forms through the site's empty space. */
(() => {
  const canvas = document.getElementById("ambient-particle-canvas");
  const enabled = matchMedia(
    "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
  ).matches;
  if (!canvas || !window.THREE || !enabled) return;

  const count = 3300,
    shapes = [],
    random = new Float32Array(count * 3);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    innerWidth / innerHeight,
    0.1,
    600,
  );
  camera.position.z = 100;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  const make = (fn) => {
    const out = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) out.set(fn(i, count), i * 3);
    return out;
  };

  // Expanded, full-viewport morph shapes
  // 0. Expansive Wave / Fabric Field
  shapes.push(
    make((i) => {
      const cols = 66;
      const x = ((i % cols) / (cols - 1) - 0.5) * 165;
      const y = (Math.floor(i / cols) / (count / cols - 1) - 0.5) * 92;
      return [
        x,
        y,
        Math.sin(x * 0.07) * 8 + Math.cos(y * 0.09) * 6,
      ];
    }),
  );

  // 1. Broad Silhouetted Form & Atmosphere
  shapes.push(
    make(() => {
      const x = (Math.random() * 2 - 1) * 80,
        y = (Math.random() * 2 - 1) * 48,
        body = Math.abs(x) < 42 && y < 38 && y > -44,
        sleeve = Math.abs(x) < 76 && y > 10 && y < 36;
      return body || sleeve
        ? [x, y, Math.sin(x * 0.08) * 3]
        : [x * 1.05, y * 1.05, (Math.random() - 0.5) * 8];
    }),
  );

  // 2. Full-height Sculptural Trousers
  shapes.push(
    make(() => {
      const leg = Math.random() > 0.5 ? -1 : 1,
        y = Math.random() * 94 - 47,
        x =
          leg * (26 + (y > 10 ? (y - 10) * 0.35 : 0)) +
          (Math.random() - 0.5) * 28;
      return [x, y, Math.sin(y * 0.1) * 5];
    }),
  );

  // 3. Expansive Celestial Sphere
  shapes.push(
    make((i, n) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n),
        theta = Math.PI * (1 + Math.sqrt(5)) * i,
        r = 66;
      return [
        r * Math.cos(theta) * Math.sin(phi) * 1.25,
        r * Math.sin(theta) * Math.sin(phi) * 0.95,
        r * Math.cos(phi) * 0.7,
      ];
    }),
  );

  // 4. Wide Aperture Torus / Ring
  shapes.push(
    make(() => {
      const major = 58,
        minor = 18,
        theta = Math.random() * Math.PI * 2,
        phi = Math.random() * Math.PI * 2;
      return [
        (major + minor * Math.cos(phi)) * Math.cos(theta) * 1.25,
        (major + minor * Math.cos(phi)) * Math.sin(theta) * 0.8,
        minor * Math.sin(phi),
      ];
    }),
  );

  // 5. Expansive VELT Wordmark
  const word = (() => {
    const c = document.createElement("canvas");
    c.width = 1600;
    c.height = 380;
    const ctx = c.getContext("2d");
    ctx.font = "260px Anton, Arial Black, sans-serif";
    ctx.fillText("VELT", 24, 290);
    const data = ctx.getImageData(0, 0, c.width, c.height).data,
      coords = [];
    for (let y = 0; y < c.height; y += 4)
      for (let x = 0; x < c.width; x += 4)
        if (data[(y * c.width + x) * 4 + 3])
          coords.push([x / 10 - 78, 30 - y / 5.5, 0]);
    return make((i) => coords[i % coords.length]);
  })();
  shapes.push(word);

  const positions = new Float32Array(shapes[0]);
  for (let i = 0; i < random.length; i++) random[i] = (Math.random() - 0.5) * 2;
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: "#b0cece",
    size: 1.05,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  });
  scene.add(new THREE.Points(geometry, material));
  const pointer = new THREE.Vector2(999, 999);
  addEventListener("pointermove", (event) =>
    pointer.set(
      (event.clientX / innerWidth - 0.5) * 180,
      (0.5 - event.clientY / innerHeight) * 112,
    ),
  );
  function resize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  }
  resize();
  addEventListener("resize", resize);
  let morph = 0;
  let currentSignalAura = 0;
  function render(time) {
    const scroll =
        scrollY /
        Math.max(1, document.documentElement.scrollHeight - innerHeight),
      desiredPhase = scroll * (shapes.length - 1);
    morph += (desiredPhase - morph) * 0.038;
    const index = Math.min(shapes.length - 2, Math.floor(morph)),
      local = morph - index,
      ease = local * local * (3 - 2 * local),
      from = shapes[index],
      to = shapes[index + 1],
      pos = geometry.attributes.position.array;
    const disintegration = document
        .querySelector(".particle-section")
        .getBoundingClientRect(),
      signal = document
        .querySelector(".signal-section")
        .getBoundingClientRect();
    const targetSignalAura =
      signal.top < innerHeight * 0.75 && signal.bottom > innerHeight
        ? 0.9
        : 0;
    currentSignalAura += (targetSignalAura - currentSignalAura) * 0.02;
    
    canvas.style.webkitMaskImage = `linear-gradient(to bottom, black ${disintegration.top}px, transparent ${disintegration.top + 80}px, transparent ${disintegration.bottom - 80}px, black ${disintegration.bottom}px)`;
    canvas.style.maskImage = canvas.style.webkitMaskImage;

    for (let i = 0; i < pos.length; i += 3) {
      let x = from[i] + (to[i] - from[i]) * ease,
        y = from[i + 1] + (to[i + 1] - from[i + 1]) * ease,
        z = from[i + 2] + (to[i + 2] - from[i + 2]) * ease;
      const dx = x - pointer.x,
        dy = y - pointer.y,
        distance = Math.hypot(dx, dy),
        cursorForce = Math.max(0, 1 - distance / 26) * 14;
      if (cursorForce) {
        x += (dx / (distance || 1)) * cursorForce;
        y += (dy / (distance || 1)) * cursorForce;
      }
      if (currentSignalAura > 0.001) {
        const radius = Math.hypot(x, y) || 1;
        x += (x / radius) * currentSignalAura * 22;
        y += (y / radius) * currentSignalAura * 14;
      }
      pos[i] = x + random[i] * Math.sin(time * 0.0012 + i * 0.03) * 0.75;
      pos[i + 1] =
        y + random[i + 1] * Math.cos(time * 0.0012 + i * 0.03) * 0.75;
      pos[i + 2] =
        z + random[i + 2] * Math.sin(time * 0.0012 + i * 0.03) * 0.75;
    }
    geometry.attributes.position.needsUpdate = true;
    scene.rotation.y = Math.sin(time * 0.0002) * 0.18 + scroll * 0.5;
    scene.rotation.x = Math.cos(time * 0.00015) * 0.06;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})();
