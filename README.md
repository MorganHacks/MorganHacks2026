## 3D Track Cities

- `/app/tracks/page.tsx` has a 2D/3D toggle. The 3D scene lives in `components/track-scene-3d.tsx`.
- Data sources:
  - `public/track-cities.json` — includes `id`, `name`, `description`, `position`, `color`, and optional `model` (GLB/GLTF path in `public/models`).
  - `public/track-details.json` — long-form descriptions, challenges, prizes, and resource links.
- Inside view: click a house, hit “Enter Interior”, then click the canvas to lock the cursor. Use WASD + mouse to move; press Esc or the Exit button to leave. A HUD shows track details and resources.

### Adding custom models
1. Drop a `.glb`/`.gltf` file in `public/models`.
2. Set the `model` field for a track in `public/track-cities.json`, e.g. `"model": "/models/your-model.glb"`.
3. Optional per-track transforms:
   - `scale`: number (overall multiplier)
   - `rotation`: `{ "x": 0, "y": 0, "z": 0 }` (radians)
   - `offset`: `{ "x": 0, "y": 0, "z": 0 }` (local offset if the model’s origin isn’t at ground center)
   - `bounds`: `{ "x": 2.3, "z": 2.3 }` (half extents for interior movement clamps)
4. If `model` is absent/null, the scene falls back to the stylized box house.

### Adding an island/ground mesh
- Supply a GLB path when using `TrackScene3D` (prop: `islandModelPath="/models/island.glb"`). Place the file under `public/models`.
- The island is rendered as a primitive GLTF scene (no extra materials required). Keep scale/origin sensible (origin at ground center).
