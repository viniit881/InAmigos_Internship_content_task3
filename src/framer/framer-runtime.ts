/** Minimal Framer code-component runtime stubs for use outside Framer canvas */
export const ControlType = {
  Boolean: 'boolean',
  Number: 'number',
  String: 'string',
  Color: 'color',
  Enum: 'enum',
  Array: 'array',
  Object: 'object',
  Image: 'image',
  File: 'file',
  BorderRadius: 'borderRadius',
  ResponsiveImage: 'responsiveImage',
} as const

export function addPropertyControls(_component: unknown, _controls: unknown) {
  // no-op outside Framer
}

export const RenderTarget = {
  current: () => 'preview',
  canvas: 'canvas',
}

export function useIsStaticRenderer() {
  return false
}
