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

  // Expanded, strictly centered full-viewport morph shapes with safe vertical margins
  // 0. Expansive Centered Wave / Fabric Field
  shapes.push(
    make((i) => {
      const cols = 66;
      const x = ((i % cols) / (cols - 1) - 0.5) * 160;
      const y = (Math.floor(i / cols) / (count / cols - 1) - 0.5) * 76;
      return [
        x,
        y,
        Math.sin(x * 0.07) * 7 + Math.cos(y * 0.09) * 5,
      ];
    }),
  );

  // 1. Centered Silhouetted Form & Broad Atmosphere
  shapes.push(
    make(() => {
      const x = (Math.random() * 2 - 1) * 76,
        y = (Math.random() * 2 - 1) * 38,
        body = Math.abs(x) < 38 && y < 32 && y > -36,
        sleeve = Math.abs(x) < 74 && y > 6 && y < 30;
      return body || sleeve
        ? [x, y, Math.sin(x * 0.08) * 3]
        : [x, y, (Math.random() - 0.5) * 8];
    }),
  );

  // 2. Centered Sculptural Trousers
  shapes.push(
    make(() => {
      const leg = Math.random() > 0.5 ? 1 : -1,
        y = Math.random() * 76 - 38,
        x =
          leg * (22 + (y > 8 ? (y - 8) * 0.3 : 0)) +
          (Math.random() - 0.5) * 22;
      return [x, y, Math.sin(y * 0.1) * 4];
    }),
  );

  // 3. Centered Celestial Sphere
  shapes.push(
    make((i, n) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n),
        theta = Math.PI * (1 + Math.sqrt(5)) * i,
        r = 54;
      return [
        r * Math.cos(theta) * Math.sin(phi) * 1.25,
        r * Math.sin(theta) * Math.sin(phi) * 0.85,
        r * Math.cos(phi) * 0.65,
      ];
    }),
  );

  // 4. Centered Torus / Ring
  shapes.push(
    make(() => {
      const major = 50,
        minor = 16,
        theta = Math.random() * Math.PI * 2,
        phi = Math.random() * Math.PI * 2;
      return [
        (major + minor * Math.cos(phi)) * Math.cos(theta) * 1.2,
        (major + minor * Math.cos(phi)) * Math.sin(theta) * 0.75,
        minor * Math.sin(phi),
      ];
    }),
  );

  // 5. Precisely Bounded & Centered VELT Wordmark
  const word = (() => {
    const c = document.createElement("canvas");
    c.width = 2000;
    c.height = 600;
    const ctx = c.getContext("2d");
    ctx.font = "bold 240px Anton, Arial Black, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("VELT", c.width / 2, c.height / 2);
    const data = ctx.getImageData(0, 0, c.width, c.height).data,
      rawCoords = [];

    let minX = c.width,
      maxX = 0,
      minY = c.height,
      maxY = 0;
    for (let y = 0; y < c.height; y += 4) {
      for (let x = 0; x < c.width; x += 4) {
        if (data[(y * c.width + x) * 4 + 3] > 128) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const textWidth = maxX - minX || 1;
    const textHeight = maxY - minY || 1;
    const targetWidth = 116; // spans -58 to +58 in 3D space
    const targetHeight = 30; // spans -15 to +15 in 3D space
    const scaleX = targetWidth / textWidth;
    const scaleY = targetHeight / textHeight;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    for (let y = 0; y < c.height; y += 4) {
      for (let x = 0; x < c.width; x += 4) {
        if (data[(y * c.width + x) * 4 + 3] > 128) {
          rawCoords.push([
            (x - centerX) * scaleX,
            (centerY - y) * scaleY + 2,
            0,
          ]);
        }
      }
    }

    return make((i) => rawCoords[i % rawCoords.length]);
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
    scene.rotation.y = Math.sin(time * 0.00025) * 0.1;
    scene.rotation.x = Math.cos(time * 0.00018) * 0.04;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})();
