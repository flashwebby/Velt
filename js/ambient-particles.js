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

  // Cloth, tee, trousers, sphere, cube and a final VELT wordmark are all equal-sized point sets for clean morphs.
  shapes.push(
    make((i) => {
      const x = (i % 55) - 27,
        y = Math.floor(i / 55) - 20;
      return [
        x * 1.35,
        y * 1.1,
        Math.sin(x * 0.23) * 5 + Math.cos(y * 0.3) * 3,
      ];
    }),
  );
  shapes.push(
    make(() => {
      const x = (Math.random() * 2 - 1) * 34,
        y = (Math.random() * 2 - 1) * 36,
        body = Math.abs(x) < 19 && y < 28 && y > -34,
        sleeve = Math.abs(x) < 34 && y > 10 && y < 30;
      return body || sleeve
        ? [x, y, Math.sin(x * 0.2) * 2]
        : [x * 0.35, y * 0.35, 0];
    }),
  );
  shapes.push(
    make(() => {
      const leg = Math.random() > 0.5 ? -1 : 1,
        y = Math.random() * 68 - 34,
        x =
          leg * (13 + (y > 12 ? (y - 12) * 0.22 : 0)) +
          (Math.random() - 0.5) * 11;
      return [x, y, Math.sin(y * 0.22) * 3];
    }),
  );
  shapes.push(
    make((i, n) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n),
        theta = Math.PI * (1 + Math.sqrt(5)) * i,
        r = 35;
      return [
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ];
    }),
  );
  shapes.push(
    make(() => {
      const major = 30,
        minor = 10,
        theta = Math.random() * Math.PI * 2,
        phi = Math.random() * Math.PI * 2;
      return [
        (major + minor * Math.cos(phi)) * Math.cos(theta),
        (major + minor * Math.cos(phi)) * Math.sin(theta),
        minor * Math.sin(phi),
      ];
    }),
  );
  const word = (() => {
    const c = document.createElement("canvas");
    c.width = 1200;
    c.height = 280;
    const ctx = c.getContext("2d");
    ctx.font = "200px Anton, Arial Black, sans-serif";
    ctx.fillText("VELT", 12, 220);
    const data = ctx.getImageData(0, 0, c.width, c.height).data,
      coords = [];
    for (let y = 0; y < c.height; y += 5)
      for (let x = 0; x < c.width; x += 5)
        if (data[(y * c.width + x) * 4 + 3])
          coords.push([x / 7.5 - 39, 25 - y / 5, 0]);
    return make((i) => coords[i % coords.length]);
  })();
  shapes.push(word);

  const positions = new Float32Array(shapes[0]);
  for (let i = 0; i < random.length; i++) random[i] = (Math.random() - 0.5) * 2;
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: "#b4cece",
    size: 1.3,
    transparent: true,
    opacity: 1,
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
    const hideForImageParticles =
      disintegration.top < innerHeight * 0.7 &&
      disintegration.bottom > innerHeight * 0.3;
    const targetSignalAura =
      signal.top < innerHeight * 0.75 && signal.bottom > innerHeight
        ? 0.9
        : 0;
    currentSignalAura += (targetSignalAura - currentSignalAura) * 0.02;
    
    material.opacity +=
      ((hideForImageParticles ? 0 : 0.76) - material.opacity) * 0.09;
    for (let i = 0; i < pos.length; i += 3) {
      let x = from[i] + (to[i] - from[i]) * ease,
        y = from[i + 1] + (to[i + 1] - from[i + 1]) * ease,
        z = from[i + 2] + (to[i + 2] - from[i + 2]) * ease;
      const dx = x - pointer.x,
        dy = y - pointer.y,
        distance = Math.hypot(dx, dy),
        cursorForce = Math.max(0, 1 - distance / 22) * 12;
      if (cursorForce) {
        x += (dx / (distance || 1)) * cursorForce;
        y += (dy / (distance || 1)) * cursorForce;
      }
      if (currentSignalAura > 0.001) {
        const radius = Math.hypot(x, y) || 1;
        x += (x / radius) * currentSignalAura * 20;
        y += (y / radius) * currentSignalAura * 12;
      }
      pos[i] = x + random[i] * Math.sin(time * 0.0015 + i * 0.03) * 0.45;
      pos[i + 1] =
        y + random[i + 1] * Math.cos(time * 0.0015 + i * 0.03) * 0.45;
      pos[i + 2] =
        z + random[i + 2] * Math.sin(time * 0.0015 + i * 0.03) * 0.45;
    }
    geometry.attributes.position.needsUpdate = true;
    scene.rotation.y = Math.sin(time * 0.00022) * 0.22 + scroll * 0.7;
    scene.rotation.x = Math.cos(time * 0.00018) * 0.08;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})();
