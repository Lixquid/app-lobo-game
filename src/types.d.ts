/** CSS Modules export an object with css class names as keys.
 * @example
 * - `styles.module.css`:
 *   ```css
 *   .red { background: red; }
 *   ```
 * - `App.tsx`:
 *   ```tsx
 *   import * as css from "./styles.module.css";
 *   const e = <div class={css["red"]}>Hello!</div>;
 *   ```
 */
declare module "*.module.css" {
	const classes: { [key: string]: string };
	export = classes;
}
