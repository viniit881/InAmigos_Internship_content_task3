// http-url:https://framer.com/m/AnimatedLiquidBackground-Prod-vIhm.js@ghH1aHLmGZ0iE7qXDFVk
import { jsx as _jsx2, jsxs as _jsxs } from "react/jsx-runtime";

// src/framer/framer-runtime.ts
var ControlType = {
  Boolean: "boolean",
  Number: "number",
  String: "string",
  Color: "color",
  Enum: "enum",
  Array: "array",
  Object: "object",
  Image: "image",
  File: "file",
  BorderRadius: "borderRadius",
  ResponsiveImage: "responsiveImage"
};
function addPropertyControls(_component, _controls) {
}
var RenderTarget = {
  current: () => "preview",
  canvas: "canvas"
};
function useIsStaticRenderer() {
  return false;
}

// http-url:https://framer.com/m/AnimatedLiquidBackground-Prod-vIhm.js@ghH1aHLmGZ0iE7qXDFVk
import { useEffect as useEffect2, useRef, useMemo as useMemo2 } from "react";

// http-url:https://framerusercontent.com/modules/k76epLFsVsF4jlsF5pgg/vhK3G0ntf62fqS2tFDno/useColors.js
import { useEffect, useState, useMemo } from "react";
var cssVariableRegex = /var\s*\(\s*(--[\w-]+)(?:\s*,\s*((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*))?\s*\)/;
function useColors(...colors) {
  const isCanvas = RenderTarget.current() === RenderTarget.canvas;
  const isOptimizing = typeof window === "undefined";
  const darkMode = useDarkMode();
  const [styleValues, setStyleValues] = useState(() => extractStyleValues(colors.map(extractCSSVariableName)));
  useEffect(() => {
    if (!isCanvas) return;
    const div = document.body.querySelector("main > div");
    if (!div) return;
    const observer = new MutationObserver(() => {
      setStyleValues(extractStyleValues(colors.map(extractCSSVariableName)));
    });
    observer.observe(div, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, colors);
  const variableNames = useMemo(() => colors.map(extractCSSVariableName), [colors]);
  if (isOptimizing) {
    return colors.map((color) => extractDefaultValue(color));
  }
  let values = [];
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    if (typeof color !== "string") {
      values.push(color);
      continue;
    }
    const variableName = variableNames[i];
    const colorValues = styleValues[variableName];
    if (variableName && colorValues) {
      values.push(darkMode ? colorValues.dark || colorValues.light || color : colorValues.light || color);
    } else {
      values.push(color);
    }
  }
  return values;
}
function extractStyleValues(variableNames) {
  const isCanvas = RenderTarget.current() === RenderTarget.canvas;
  const result = {};
  let lightVars = {};
  let darkVars = {};
  if (isCanvas && typeof document !== "undefined") {
    const div = document.body.querySelector("main > div");
    if (div) {
      const style = div.getAttribute("style");
      if (style) {
        const vars = parseVariables(style);
        lightVars = vars;
        darkVars = vars;
      }
    }
  } else {
    const { light, dark } = extractColorStyles();
    lightVars = parseVariables(light);
    darkVars = parseVariables(dark);
  }
  const allVarNames = /* @__PURE__ */ new Set([...Object.keys(lightVars), ...Object.keys(darkVars)]);
  allVarNames.forEach((varName) => {
    result[varName] = { light: lightVars[varName] || "", dark: darkVars[varName] || "" };
  });
  return result;
}
function extractColorStyles() {
  let lightSection = "";
  let darkSection = "";
  if (typeof document !== "undefined") {
    const styles = document.head.querySelectorAll("style[data-framer-css], style[data-framer-css-ssr], style[data-framer-css-ssr-minified]");
    for (const style of styles) {
      const rules = style.sheet?.cssRules;
      if (!rules) continue;
      const styleRules = [];
      for (const rule of rules) {
        if (rule instanceof CSSStyleRule) {
          styleRules.push([rule, false]);
        } else if (rule instanceof CSSMediaRule) {
          if (rule.conditionText === "(prefers-color-scheme: dark)") {
            for (const subrule of rule.cssRules) {
              if (subrule instanceof CSSStyleRule) {
                styleRules.push([subrule, true]);
              }
            }
          }
        }
      }
      for (const [rule, isDarkMedia] of styleRules) {
        const css = rule.cssText;
        const hasVars = css.includes("--token-");
        if (!hasVars) continue;
        const isDark = isDarkMedia ? rule.selectorText === "body" : rule.selectorText === 'body[data-framer-theme="dark"]';
        const isLight = !isDarkMedia && rule.selectorText === "body";
        if (!isDark && !isLight) continue;
        if (isDark) {
          if (!darkSection) {
            darkSection = css.substring(css.indexOf("{") + 1, css.lastIndexOf("}")).trim();
          }
        } else {
          if (!lightSection) {
            lightSection = css.substring(css.indexOf("{") + 1, css.lastIndexOf("}")).trim();
          }
        }
        if (darkSection && lightSection) break;
      }
      if (darkSection && lightSection) break;
    }
  }
  return { light: lightSection, dark: darkSection };
}
function useDarkMode() {
  const isPreview = typeof window !== "undefined" && window.location.origin.endsWith("framercanvas.com");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    } else if (isPreview && typeof document !== "undefined") {
      return document.body.getAttribute("data-framer-theme") === "dark";
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  });
  useEffect(() => {
    if (isPreview) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "data-framer-theme") {
            const theme = document.body.getAttribute("data-framer-theme");
            setIsDarkMode(theme === "dark");
          }
        });
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ["data-framer-theme"] });
      return () => observer.disconnect();
    } else {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        setIsDarkMode(e.matches);
      };
      if (mediaQuery.matches !== isDarkMode) {
        setIsDarkMode(mediaQuery.matches);
      }
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [isPreview]);
  return isDarkMode;
}
function extractCSSVariableName(cssString) {
  if (!cssString || !cssString.startsWith("var(")) {
    return "";
  }
  const match = cssVariableRegex.exec(cssString);
  if (match) {
    const variableName = match[1];
    return variableName || "";
  }
  return "";
}
function parseVariables(section) {
  const vars = {};
  if (!section) return vars;
  const declarations = section.split(";").filter(Boolean);
  declarations.forEach((declaration) => {
    const [name, value] = declaration.split(":").map((s) => s.trim());
    if (name && value) {
      vars[name] = value;
    }
  });
  return vars;
}
function extractDefaultValue(cssVar) {
  if (!cssVar || !cssVar.startsWith("var(")) {
    return cssVar;
  }
  const content = cssVar.slice(4, -1);
  const parts = content.split(",");
  if (parts.length > 1) {
    return parts.slice(1).join(",").trim();
  }
  return "";
}

// http-url:https://framer.com/m/index-uMsj.js@PVl4bshKvCOZO36e3vK1
import { jsx as _jsx } from "react/jsx-runtime";

// http-url:https://framerusercontent.com/modules/NLpw4UPElXpirDfZ8gK3/pnnblFdmCm84r7TGjG3U/shader_mount.js
function _define_property(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ShaderMount = class {
  constructor(canvas, fragmentShader, uniforms = {}, webGlContextAttributes, speed = 1, seed = 0) {
    _define_property(this, "canvas", void 0);
    _define_property(this, "gl", void 0);
    _define_property(this, "program", null);
    _define_property(this, "uniformLocations", {});
    _define_property(this, "fragmentShader", void 0);
    _define_property(this, "rafId", null);
    _define_property(this, "lastFrameTime", 0);
    _define_property(this, "totalAnimationTime", 0);
    _define_property(this, "speed", 1);
    _define_property(this, "providedUniforms", void 0);
    _define_property(this, "hasBeenDisposed", false);
    _define_property(this, "resolutionChanged", true);
    _define_property(this, "initWebGL", () => {
      const program = createProgram(this.gl, vertexShaderSource, this.fragmentShader);
      if (!program) return;
      this.program = program;
      this.setupPositionAttribute();
      this.setupUniforms();
    });
    _define_property(this, "setupPositionAttribute", () => {
      const positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
      const positionBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
      const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
      this.gl.enableVertexAttribArray(positionAttributeLocation);
      this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
    });
    _define_property(this, "setupUniforms", () => {
      this.uniformLocations = { u_time: this.gl.getUniformLocation(this.program, "u_time"), u_pixelRatio: this.gl.getUniformLocation(this.program, "u_pixelRatio"), u_resolution: this.gl.getUniformLocation(this.program, "u_resolution"), ...Object.fromEntries(Object.keys(this.providedUniforms).map((key) => [key, this.gl.getUniformLocation(this.program, key)])) };
    });
    _define_property(this, "resizeObserver", null);
    _define_property(this, "setupResizeObserver", () => {
      this.resizeObserver = new ResizeObserver(() => this.handleResize());
      this.resizeObserver.observe(this.canvas);
      this.handleResize();
    });
    _define_property(this, "handleResize", () => {
      const pixelRatio = window.devicePixelRatio;
      const newWidth = this.canvas.clientWidth * pixelRatio;
      const newHeight = this.canvas.clientHeight * pixelRatio;
      if (this.canvas.width !== newWidth || this.canvas.height !== newHeight) {
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
        this.resolutionChanged = true;
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.render(performance.now());
      }
    });
    _define_property(this, "render", (currentTime) => {
      if (this.hasBeenDisposed) return;
      const dt = currentTime - this.lastFrameTime;
      this.lastFrameTime = currentTime;
      if (this.speed !== 0) {
        this.totalAnimationTime += dt * this.speed;
      }
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.useProgram(this.program);
      this.gl.uniform1f(this.uniformLocations.u_time, this.totalAnimationTime * 1e-3);
      if (this.resolutionChanged) {
        this.gl.uniform2f(this.uniformLocations.u_resolution, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.uniform1f(this.uniformLocations.u_pixelRatio, window.devicePixelRatio);
        this.resolutionChanged = false;
      }
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
      if (this.speed !== 0) {
        this.requestRender();
      } else {
        this.rafId = null;
      }
    });
    _define_property(this, "requestRender", () => {
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
      }
      this.rafId = requestAnimationFrame(this.render);
    });
    _define_property(this, "updateProvidedUniforms", () => {
      this.gl.useProgram(this.program);
      Object.entries(this.providedUniforms).forEach(([key, value]) => {
        const location = this.uniformLocations[key];
        if (location) {
          if (Array.isArray(value)) {
            switch (value.length) {
              case 2:
                this.gl.uniform2fv(location, value);
                break;
              case 3:
                this.gl.uniform3fv(location, value);
                break;
              case 4:
                this.gl.uniform4fv(location, value);
                break;
              default:
                if (value.length === 9) {
                  this.gl.uniformMatrix3fv(location, false, value);
                } else if (value.length === 16) {
                  this.gl.uniformMatrix4fv(location, false, value);
                } else {
                  console.warn(`Unsupported uniform array length: ${value.length}`);
                }
            }
          } else if (typeof value === "number") {
            this.gl.uniform1f(location, value);
          } else if (typeof value === "boolean") {
            this.gl.uniform1i(location, value ? 1 : 0);
          } else {
            console.warn(`Unsupported uniform type for ${key}: ${typeof value}`);
          }
        }
      });
    });
    _define_property(this, "setSeed", (newSeed) => {
      const oneFrameAt120Fps = 1e3 / 120;
      this.totalAnimationTime = newSeed * oneFrameAt120Fps;
      this.lastFrameTime = performance.now();
      this.render(performance.now());
    });
    _define_property(this, "setSpeed", (newSpeed = 1) => {
      this.speed = newSpeed;
      if (this.rafId === null && newSpeed !== 0) {
        this.lastFrameTime = performance.now();
        this.rafId = requestAnimationFrame(this.render);
      }
      if (this.rafId !== null && newSpeed === 0) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    });
    _define_property(this, "setUniforms", (newUniforms) => {
      this.providedUniforms = { ...this.providedUniforms, ...newUniforms };
      this.updateProvidedUniforms();
      this.render(performance.now());
    });
    _define_property(this, "dispose", () => {
      this.hasBeenDisposed = true;
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      if (this.gl && this.program) {
        this.gl.deleteProgram(this.program);
        this.program = null;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.getError();
      }
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
      this.uniformLocations = {};
    });
    this.canvas = canvas;
    this.fragmentShader = fragmentShader;
    this.providedUniforms = uniforms;
    this.totalAnimationTime = seed;
    const gl = canvas.getContext("webgl2", webGlContextAttributes);
    if (!gl) {
      throw new Error("WebGL not supported");
    }
    this.gl = gl;
    this.initWebGL();
    this.setupResizeObserver();
    this.setSpeed(speed);
    this.canvas.setAttribute("data-paper-shaders", "true");
  }
};
var vertexShaderSource = `#version 300 es
layout(location = 0) in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
function createProgram(gl, vertexShaderSource2, fragmentShaderSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource2);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (!vertexShader || !fragmentShader) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }
  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  return program;
}

// http-url:https://framerusercontent.com/modules/zIDOp1iaNFIXSAIx7ljo/VX06XYWdAlD95B9usTKm/warp.js
var PatternShapes = { Checks: 0, Stripes: 1, Edge: 2 };
var warpFragmentShader = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;


out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  // Smoothstep for interpolation
  vec2 u = f * f * (3.0 - 2.0 * f);

  // Do the interpolation as two nested mix operations
  // If you try to do this in one big operation, there's enough precision loss to be off by 1px at cell boundaries
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);

}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;

    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);

    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);

    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv_original = uv;

    float t = .5 * u_time;

    float noise_scale = .0005 + .006 * u_scale;

    uv -= .5;
    uv *= (noise_scale * u_resolution);
    uv = rotate(uv, u_rotation * .5 * PI);
    uv /= u_pixelRatio;
    uv += .5;

    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * u_distortion * n2 * cos(angle);
    uv.y += 4. * u_distortion * n2 * sin(angle);

    float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }

    float proportion = clamp(u_proportion, 0., 1.);

    float shape = 0.;
    float mixer = 0.;
    if (u_shape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
      shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (u_shape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
      float f = fract(stripes_shape_uv.y);
      shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {
      float sh = 1. - uv.y;
      sh -= .5;
      sh /= (noise_scale * u_resolution.y);
      sh += .5;
      float shape_scaling = .2 * (1. - u_shapeScale);
      shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
      mixer = shape;
    }

    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);

    fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;

// http-url:https://framerusercontent.com/modules/r591zLdRh7n2CKaaHRG7/PCYxubr6wk68eTxKLhEH/get_shader_color_from_string.js
function getShaderColorFromString(colorString, fallback = [0, 0, 0, 1]) {
  if (Array.isArray(colorString)) {
    if (colorString.length === 4) return colorString;
    if (colorString.length === 3) return [...colorString, 1];
    return getShaderColorFromString(fallback);
  }
  if (typeof colorString !== "string") {
    return getShaderColorFromString(fallback);
  }
  let r, g, b, a = 1;
  if (colorString.startsWith("#")) {
    [r, g, b, a] = hexToRgba(colorString);
  } else if (colorString.startsWith("rgb")) {
    [r, g, b, a] = parseRgba(colorString);
  } else if (colorString.startsWith("hsl")) {
    [r, g, b, a] = hslaToRgba(parseHsla(colorString));
  } else {
    console.error("Unsupported color format", colorString);
    return getShaderColorFromString(fallback);
  }
  return [clamp(r, 0, 1), clamp(g, 0, 1), clamp(b, 0, 1), clamp(a, 0, 1)];
}
function hexToRgba(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((char) => char + char).join("");
  }
  if (hex.length === 6) {
    hex = hex + "ff";
  }
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const a = parseInt(hex.slice(6, 8), 16) / 255;
  return [r, g, b, a];
}
function parseRgba(rgba) {
  const match = rgba.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);
  if (!match) return [0, 0, 0, 1];
  return [parseInt(match[1] ?? "0") / 255, parseInt(match[2] ?? "0") / 255, parseInt(match[3] ?? "0") / 255, match[4] === void 0 ? 1 : parseFloat(match[4])];
}
function parseHsla(hsla) {
  const match = hsla.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);
  if (!match) return [0, 0, 0, 1];
  return [parseInt(match[1] ?? "0"), parseInt(match[2] ?? "0"), parseInt(match[3] ?? "0"), match[4] === void 0 ? 1 : parseFloat(match[4])];
}
function hslaToRgba(hsla) {
  const [h, s, l, a] = hsla;
  const hDecimal = h / 360;
  const sDecimal = s / 100;
  const lDecimal = l / 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = lDecimal;
  } else {
    const hue2rgb = (p2, q2, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
      if (t < 1 / 2) return q2;
      if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
      return p2;
    };
    const q = lDecimal < 0.5 ? lDecimal * (1 + sDecimal) : lDecimal + sDecimal - lDecimal * sDecimal;
    const p = 2 * lDecimal - q;
    r = hue2rgb(p, q, hDecimal + 1 / 3);
    g = hue2rgb(p, q, hDecimal);
    b = hue2rgb(p, q, hDecimal - 1 / 3);
  }
  return [r, g, b, a];
}
var clamp = (n, min, max) => Math.min(Math.max(n, min), max);

// http-url:https://framer.com/m/AnimatedLiquidBackground-Prod-vIhm.js@ghH1aHLmGZ0iE7qXDFVk
import { cubicBezier, useInView } from "framer-motion";
var speedEase = cubicBezier(0.65, 0, 0.88, 0.77);
var templates = { Prism: { color1: "#050505", color2: "#66B3FF", color3: "#FFFFFF", rotation: -50, proportion: 1, scale: 0.01, speed: 30, distortion: 0, swirl: 50, swirlIterations: 16, softness: 47, offset: -299, shape: "Checks", shapeSize: 45 }, Lava: { color1: "#FF9F21", color2: "#FF0303", color3: "#000000", rotation: 114, proportion: 100, scale: 0.52, speed: 30, distortion: 7, swirl: 18, swirlIterations: 20, softness: 100, offset: 717, shape: "Edge", shapeSize: 12 }, Plasma: { color1: "#B566FF", color2: "#000000", color3: "#000000", rotation: 0, proportion: 63, scale: 0.75, speed: 30, distortion: 5, swirl: 61, swirlIterations: 5, softness: 100, offset: -168, shape: "Checks", shapeSize: 28 }, Pulse: { color1: "#66FF85", color2: "#000000", color3: "#000000", rotation: -167, proportion: 92, scale: 0, speed: 20, distortion: 54, swirl: 75, swirlIterations: 3, softness: 28, offset: -813, shape: "Checks", shapeSize: 79 }, Vortex: { color1: "#000000", color2: "#FFFFFF", color3: "#000000", rotation: 50, proportion: 41, scale: 0.4, speed: 20, distortion: 0, swirl: 100, swirlIterations: 3, softness: 5, offset: -744, shape: "Stripes", shapeSize: 80 }, Mist: { color1: "#050505", color2: "#FF66B8", color3: "#050505", rotation: 0, proportion: 33, scale: 0.48, speed: 39, distortion: 4, swirl: 65, swirlIterations: 5, softness: 100, offset: -235, shape: "Edge", shapeSize: 48 } };
function AnimatedGradientBackground(props) {
  const isStaticRenderer = useIsStaticRenderer();
  const isCanvas = RenderTarget.current() === RenderTarget.canvas;
  const useCustomColors = props.preset === "custom" || props.colorMode === "custom";
  const values = props.preset === "custom" ? props : templates[props.preset] || Object.values(templates)[0];
  const [color1, color2, color3] = useColors(props.color1, props.color2, props.color3);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const currentSpeed = useMemo2(() => {
    if (isCanvas && props.preview) return speedEase(props.speed / 100) * 5;
    if (!isStaticRenderer && isInView) return speedEase(props.speed / 100) * 5;
    return 0;
  }, [isInView, isStaticRenderer, props.speed, props.preview, isCanvas]);
  return /* @__PURE__ */ _jsxs("div", { ref, style: { borderRadius: props.radius, overflow: "hidden", position: "relative", ...props.style }, children: [/* @__PURE__ */ _jsx2(Warp, { color1: useCustomColors ? color1 : values.color1, color2: useCustomColors ? color2 : values.color2, color3: useCustomColors ? color3 : values.color3, scale: values.scale, proportion: values.proportion / 100, distortion: values.distortion / 50, swirl: values.swirl / 100, swirlIterations: values.swirl === 0 ? 0 : values.swirlIterations, rotation: values.rotation * Math.PI / 180, speed: currentSpeed, seed: values.offset * 10, shape: PatternShapes[values.shape], shapeScale: values.shapeSize / 100, softness: values.softness / 100, style: props.style }), props.noise && props.noise.opacity > 0 && /* @__PURE__ */ _jsx2("div", { style: { position: "absolute", inset: 0, backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`, backgroundSize: props.noise.scale * 200, backgroundRepeat: "repeat", opacity: props.noise.opacity / 2 } })] });
}
addPropertyControls(AnimatedGradientBackground, { preset: { type: ControlType.Enum, defaultValue: Object.keys(templates)[0], options: [...Object.keys(templates), "custom"], optionTitles: [...Object.keys(templates), "Custom"] }, preview: { type: ControlType.Boolean, defaultValue: false }, colorMode: { type: ControlType.Enum, defaultValue: "preset", options: ["preset", "custom"], optionTitles: ["Preset", "Custom"], displaySegmentedControl: true, title: "Colors", hidden: (props) => props.preset === "custom" }, color1: { type: ControlType.Color, defaultValue: "#262626", hidden: (props) => props.preset !== "custom" && props.colorMode === "preset" }, color2: { type: ControlType.Color, defaultValue: "#75c1f0", hidden: (props) => props.preset !== "custom" && props.colorMode === "preset" }, color3: { type: ControlType.Color, defaultValue: "#ffffff", hidden: (props) => props.preset !== "custom" && props.colorMode === "preset" }, noise: { type: ControlType.Object, optional: true, icon: "effect", controls: { opacity: { type: ControlType.Number, defaultValue: 0.5, min: 0, max: 1, step: 0.01 }, scale: { type: ControlType.Number, defaultValue: 1, min: 0.2, max: 2, step: 0.1 } } }, rotation: { type: ControlType.Number, defaultValue: 0, min: -360, max: 360, step: 1, unit: "\xB0", hidden: (props) => props.preset !== "custom" }, proportion: { type: ControlType.Number, defaultValue: 35, min: 0, max: 100, step: 1, hidden: (props) => props.preset !== "custom" }, scale: { type: ControlType.Number, defaultValue: 1, min: 0, max: 10, step: 0.01, hidden: (props) => props.preset !== "custom" }, speed: { type: ControlType.Number, defaultValue: 25, step: 1, min: 0, max: 100 }, distortion: { type: ControlType.Number, defaultValue: 12, min: 0, max: 100, step: 1, hidden: (props) => props.preset !== "custom" }, swirl: { type: ControlType.Number, defaultValue: 80, min: 0, max: 100, step: 1, hidden: (props) => props.preset !== "custom" }, swirlIterations: { type: ControlType.Number, defaultValue: 10, min: 0, max: 20, step: 1, title: "Iterations", hidden: (props) => props.swirl === 0 || props.preset !== "custom" }, softness: { type: ControlType.Number, defaultValue: 100, min: 0, max: 100, step: 1, hidden: (props) => props.preset !== "custom" }, offset: { type: ControlType.Number, defaultValue: 0, min: -1e3, max: 1e3, step: 1, hidden: (props) => props.preset !== "custom" }, shape: { type: ControlType.Enum, defaultValue: "Checks", options: Object.keys(PatternShapes), hidden: (props) => props.preset !== "custom" }, shapeSize: { type: ControlType.Number, defaultValue: 10, min: 0, max: 100, step: 1, hidden: (props) => props.preset !== "custom" }, radius: { type: ControlType.BorderRadius, defaultValue: "0px" } });
var defaultPreset = { name: "Default", params: { scale: 1, rotation: 0, speed: 20, seed: 0, color1: "hsla(0, 0%, 15%, 1)", color2: "hsla(203, 80%, 70%, 1)", color3: "hsla(0, 0%, 100%, 1)", proportion: 0.35, softness: 1, distortion: 0.25, swirl: 0.8, swirlIterations: 10, shapeScale: 0.1, shape: PatternShapes.Checks } };
var Warp = (props) => {
  const uniforms = useMemo2(() => {
    return { u_scale: props.scale ?? defaultPreset.params.scale, u_rotation: props.rotation ?? defaultPreset.params.rotation, u_color1: getShaderColorFromString(props.color1, defaultPreset.params.color1), u_color2: getShaderColorFromString(props.color2, defaultPreset.params.color2), u_color3: getShaderColorFromString(props.color3, defaultPreset.params.color2), u_proportion: props.proportion ?? defaultPreset.params.proportion, u_softness: props.softness ?? defaultPreset.params.softness, u_distortion: props.distortion ?? defaultPreset.params.distortion, u_swirl: props.swirl ?? defaultPreset.params.swirl, u_swirlIterations: props.swirlIterations ?? defaultPreset.params.swirlIterations, u_shapeScale: props.shapeScale ?? defaultPreset.params.shapeScale, u_shape: props.shape ?? defaultPreset.params.shape };
  }, [props.scale, props.rotation, props.color1, props.color2, props.color3, props.proportion, props.softness, props.distortion, props.swirl, props.swirlIterations, props.shapeScale, props.shape, props.speed]);
  return /* @__PURE__ */ _jsx2(ShaderMount2, { ...props, fragmentShader: warpFragmentShader, uniforms });
};
var ShaderMount2 = ({ ref, fragmentShader, style, uniforms = {}, webGlContextAttributes, speed = 1, seed = 0 }) => {
  const canvasRef = ref ?? useRef(null);
  const shaderMountRef = useRef(null);
  useEffect2(() => {
    if (canvasRef.current) {
      shaderMountRef.current = new ShaderMount(canvasRef.current, fragmentShader, uniforms, webGlContextAttributes, speed, seed);
    }
    return () => {
      shaderMountRef.current?.dispose();
    };
  }, [fragmentShader, webGlContextAttributes]);
  useEffect2(() => {
    shaderMountRef.current?.setUniforms(uniforms);
  }, [uniforms]);
  useEffect2(() => {
    shaderMountRef.current?.setSpeed(speed);
  }, [speed]);
  useEffect2(() => {
    shaderMountRef.current?.setSeed(seed);
  }, [seed]);
  return /* @__PURE__ */ _jsx2("canvas", { ref: canvasRef, style });
};
AnimatedGradientBackground.displayName = "Animated Gradient Background";
var __FramerMetadata__ = { "exports": { "default": { "type": "reactComponent", "name": "AnimatedGradientBackground", "slots": [], "annotations": { "framerIntrinsicWidth": "400", "framerSupportedLayoutHeight": "fixed", "framerContractVersion": "1", "framerSupportedLayoutWidth": "fixed", "framerDisableUnlink": "*", "framerIntrinsicHeight": "400" } }, "__FramerMetadata__": { "type": "variable" } } };
export {
  __FramerMetadata__,
  AnimatedGradientBackground as default
};
