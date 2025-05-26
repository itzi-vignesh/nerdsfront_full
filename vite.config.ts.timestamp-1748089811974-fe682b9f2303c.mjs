// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/Projects/Nerdslab2/server%20v3/server%201/nerdslab-cyber-academy-main/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Projects/Nerdslab2/server%20v3/server%201/nerdslab-cyber-academy-main/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import compression from "file:///D:/Projects/Nerdslab2/server%20v3/server%201/nerdslab-cyber-academy-main/node_modules/vite-plugin-compression/dist/index.mjs";
import { VitePWA } from "file:///D:/Projects/Nerdslab2/server%20v3/server%201/nerdslab-cyber-academy-main/node_modules/vite-plugin-pwa/dist/index.js";
import { visualizer } from "file:///D:/Projects/Nerdslab2/server%20v3/server%201/nerdslab-cyber-academy-main/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { createHtmlPlugin } from "file:///D:/Projects/Nerdslab2/server%20v3/server%201/nerdslab-cyber-academy-main/node_modules/vite-plugin-html/dist/index.mjs";
import imagemin from "file:///D:/Projects/Nerdslab2/server%20v3/server%201/nerdslab-cyber-academy-main/node_modules/vite-plugin-imagemin/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\Projects\\Nerdslab2\\server v3\\server 1\\nerdslab-cyber-academy-main";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProduction = mode === "production";
  return {
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"]
        }
      }),
      compression({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 10240,
        // Only compress files larger than 10kb
        deleteOriginFile: false
      }),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.png", "apple-touch-icon.png"],
        manifest: {
          name: "Nerdslab Cyber Academy",
          short_name: "Nerdslab",
          description: "Learn Cybersecurity with Nerdslab",
          theme_color: "#1a1a1a",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any maskable"
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable"
            }
          ]
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/nerd-api\.nerdslab\.in\/.*/i,
              handler: "NetworkFirst",
              options: {
                cacheName: "api-cache",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 24 * 60 * 60
                  // 24 hours
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: "Nerdslab Cyber Academy",
            description: "Learn Cybersecurity with Nerdslab",
            csp: "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; font-src 'self' https: data:;"
          }
        }
      }),
      imagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 80
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: "removeViewBox"
            },
            {
              name: "removeEmptyAttrs",
              active: false
            }
          ]
        }
      }),
      isProduction && visualizer({
        filename: "dist/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      port: 8080,
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "https://nerd-api.nerdslab.in",
          changeOrigin: true,
          secure: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        },
        "/lab-api": {
          target: env.VITE_LAB_API_URL || "https://lab.nerdslab.in",
          changeOrigin: true,
          secure: true
        }
      }
    },
    build: {
      outDir: "dist",
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info", "console.debug", "console.warn"]
        },
        mangle: {
          safari10: true
        },
        format: {
          comments: false
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-toast"],
            forms: ["react-hook-form", "@hookform/resolvers", "zod"],
            utils: ["date-fns", "clsx", "tailwind-merge"]
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];
            if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[ext]/[name]-[hash][extname]`;
          }
        }
      },
      chunkSizeWarningLimit: parseInt(env.VITE_BUILD_CHUNK_SIZE || "1000"),
      cssCodeSplit: true,
      cssMinify: true,
      target: "es2015",
      assetsInlineLimit: 4096,
      modulePreload: {
        polyfill: true
      }
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-toast"
      ],
      exclude: ["@radix-ui/react-icons"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxOZXJkc2xhYjJcXFxcc2VydmVyIHYzXFxcXHNlcnZlciAxXFxcXG5lcmRzbGFiLWN5YmVyLWFjYWRlbXktbWFpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUHJvamVjdHNcXFxcTmVyZHNsYWIyXFxcXHNlcnZlciB2M1xcXFxzZXJ2ZXIgMVxcXFxuZXJkc2xhYi1jeWJlci1hY2FkZW15LW1haW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2plY3RzL05lcmRzbGFiMi9zZXJ2ZXIlMjB2My9zZXJ2ZXIlMjAxL25lcmRzbGFiLWN5YmVyLWFjYWRlbXktbWFpbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGNvbXBvbmVudFRhZ2dlciB9IGZyb20gXCJsb3ZhYmxlLXRhZ2dlclwiO1xyXG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcic7XHJcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJztcclxuaW1wb3J0IGltYWdlbWluIGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlbWluJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKTtcclxuICBjb25zdCBpc1Byb2R1Y3Rpb24gPSBtb2RlID09PSAncHJvZHVjdGlvbic7XHJcbiAgXHJcbiAgcmV0dXJuIHtcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgcmVhY3Qoe1xyXG4gICAgICAgIGpzeEltcG9ydFNvdXJjZTogJ0BlbW90aW9uL3JlYWN0JyxcclxuICAgICAgICBiYWJlbDoge1xyXG4gICAgICAgICAgcGx1Z2luczogWydAZW1vdGlvbi9iYWJlbC1wbHVnaW4nXVxyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICAgIGNvbXByZXNzaW9uKHtcclxuICAgICAgICBhbGdvcml0aG06ICdnemlwJyxcclxuICAgICAgICBleHQ6ICcuZ3onLFxyXG4gICAgICAgIHRocmVzaG9sZDogMTAyNDAsIC8vIE9ubHkgY29tcHJlc3MgZmlsZXMgbGFyZ2VyIHRoYW4gMTBrYlxyXG4gICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlXHJcbiAgICAgIH0pLFxyXG4gICAgICBWaXRlUFdBKHtcclxuICAgICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuICAgICAgICBpbmNsdWRlQXNzZXRzOiBbJ2Zhdmljb24ucG5nJywgJ2FwcGxlLXRvdWNoLWljb24ucG5nJ10sXHJcbiAgICAgICAgbWFuaWZlc3Q6IHtcclxuICAgICAgICAgIG5hbWU6ICdOZXJkc2xhYiBDeWJlciBBY2FkZW15JyxcclxuICAgICAgICAgIHNob3J0X25hbWU6ICdOZXJkc2xhYicsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ0xlYXJuIEN5YmVyc2VjdXJpdHkgd2l0aCBOZXJkc2xhYicsXHJcbiAgICAgICAgICB0aGVtZV9jb2xvcjogJyMxYTFhMWEnLFxyXG4gICAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHNyYzogJ3B3YS0xOTJ4MTkyLnBuZycsXHJcbiAgICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcclxuICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcclxuICAgICAgICAgICAgICBwdXJwb3NlOiAnYW55IG1hc2thYmxlJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgc3JjOiAncHdhLTUxMng1MTIucG5nJyxcclxuICAgICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxyXG4gICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgICAgICAgICAgIHB1cnBvc2U6ICdhbnkgbWFza2FibGUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHdvcmtib3g6IHtcclxuICAgICAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2Zyx3b2ZmMn0nXSxcclxuICAgICAgICAgIHJ1bnRpbWVDYWNoaW5nOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL25lcmQtYXBpXFwubmVyZHNsYWJcXC5pblxcLy4qL2ksXHJcbiAgICAgICAgICAgICAgaGFuZGxlcjogJ05ldHdvcmtGaXJzdCcsXHJcbiAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnYXBpLWNhY2hlJyxcclxuICAgICAgICAgICAgICAgIGV4cGlyYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgbWF4RW50cmllczogMTAwLFxyXG4gICAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiAyNCAqIDYwICogNjAgLy8gMjQgaG91cnNcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjYWNoZWFibGVSZXNwb25zZToge1xyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNlczogWzAsIDIwMF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICBjcmVhdGVIdG1sUGx1Z2luKHtcclxuICAgICAgICBtaW5pZnk6IHRydWUsXHJcbiAgICAgICAgaW5qZWN0OiB7XHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnTmVyZHNsYWIgQ3liZXIgQWNhZGVteScsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTGVhcm4gQ3liZXJzZWN1cml0eSB3aXRoIE5lcmRzbGFiJyxcclxuICAgICAgICAgICAgY3NwOiBcImRlZmF1bHQtc3JjICdzZWxmJyBodHRwczogZGF0YTogJ3Vuc2FmZS1pbmxpbmUnICd1bnNhZmUtZXZhbCc7IGltZy1zcmMgJ3NlbGYnIGh0dHBzOiBkYXRhOjsgZm9udC1zcmMgJ3NlbGYnIGh0dHBzOiBkYXRhOjtcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICAgIGltYWdlbWluKHtcclxuICAgICAgICBnaWZzaWNsZToge1xyXG4gICAgICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDcsXHJcbiAgICAgICAgICBpbnRlcmxhY2VkOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3B0aXBuZzoge1xyXG4gICAgICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDdcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vempwZWc6IHtcclxuICAgICAgICAgIHF1YWxpdHk6IDgwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbmdxdWFudDoge1xyXG4gICAgICAgICAgcXVhbGl0eTogWzAuOCwgMC45XSxcclxuICAgICAgICAgIHNwZWVkOiA0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdmdvOiB7XHJcbiAgICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiAncmVtb3ZlVmlld0JveCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG5hbWU6ICdyZW1vdmVFbXB0eUF0dHJzJyxcclxuICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICBpc1Byb2R1Y3Rpb24gJiYgdmlzdWFsaXplcih7XHJcbiAgICAgICAgZmlsZW5hbWU6ICdkaXN0L3N0YXRzLmh0bWwnLFxyXG4gICAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgICAgZ3ppcFNpemU6IHRydWUsXHJcbiAgICAgICAgYnJvdGxpU2l6ZTogdHJ1ZVxyXG4gICAgICB9KVxyXG4gICAgXS5maWx0ZXIoQm9vbGVhbiksXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHBvcnQ6IDgwODAsXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX0FQSV9VUkwgfHwgJ2h0dHBzOi8vbmVyZC1hcGkubmVyZHNsYWIuaW4nLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgc2VjdXJlOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICcvbGFiLWFwaSc6IHtcclxuICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfTEFCX0FQSV9VUkwgfHwgJ2h0dHBzOi8vbGFiLm5lcmRzbGFiLmluJyxcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHNlY3VyZTogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgb3V0RGlyOiAnZGlzdCcsXHJcbiAgICAgIHNvdXJjZW1hcDogZW52LlZJVEVfQlVJTERfU09VUkNFTUFQID09PSAndHJ1ZScsXHJcbiAgICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxyXG4gICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcclxuICAgICAgICAgIHB1cmVfZnVuY3M6IFsnY29uc29sZS5sb2cnLCAnY29uc29sZS5pbmZvJywgJ2NvbnNvbGUuZGVidWcnLCAnY29uc29sZS53YXJuJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hbmdsZToge1xyXG4gICAgICAgICAgc2FmYXJpMTA6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1hdDoge1xyXG4gICAgICAgICAgY29tbWVudHM6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXHJcbiAgICAgICAgICAgIHVpOiBbJ0ByYWRpeC11aS9yZWFjdC1kaWFsb2cnLCAnQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnUnLCAnQHJhZGl4LXVpL3JlYWN0LXRvYXN0J10sXHJcbiAgICAgICAgICAgIGZvcm1zOiBbJ3JlYWN0LWhvb2stZm9ybScsICdAaG9va2Zvcm0vcmVzb2x2ZXJzJywgJ3pvZCddLFxyXG4gICAgICAgICAgICB1dGlsczogWydkYXRlLWZucycsICdjbHN4JywgJ3RhaWx3aW5kLW1lcmdlJ11cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5mbyA9IGFzc2V0SW5mby5uYW1lLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4dCA9IGluZm9baW5mby5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgaWYgKC9cXC4ocG5nfGpwZT9nfGdpZnxzdmd8d2VicCkkLy50ZXN0KGFzc2V0SW5mby5uYW1lKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBgYXNzZXRzL2ltYWdlcy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoL1xcLih3b2ZmMj98ZW90fHR0ZnxvdGYpJC8udGVzdChhc3NldEluZm8ubmFtZSkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gYGFzc2V0cy9mb250cy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYGFzc2V0cy9bZXh0XS9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdYDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogcGFyc2VJbnQoZW52LlZJVEVfQlVJTERfQ0hVTktfU0laRSB8fCAnMTAwMCcpLFxyXG4gICAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXHJcbiAgICAgIGNzc01pbmlmeTogdHJ1ZSxcclxuICAgICAgdGFyZ2V0OiAnZXMyMDE1JyxcclxuICAgICAgYXNzZXRzSW5saW5lTGltaXQ6IDQwOTYsXHJcbiAgICAgIG1vZHVsZVByZWxvYWQ6IHtcclxuICAgICAgICBwb2x5ZmlsbDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAncmVhY3QnLFxyXG4gICAgICAgICdyZWFjdC1kb20nLFxyXG4gICAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcclxuICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWRpYWxvZycsXHJcbiAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1kcm9wZG93bi1tZW51JyxcclxuICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXRvYXN0J1xyXG4gICAgICBdLFxyXG4gICAgICBleGNsdWRlOiBbJ0ByYWRpeC11aS9yZWFjdC1pY29ucyddXHJcbiAgICB9XHJcbiAgfTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFksU0FBUyxjQUFjLGVBQWU7QUFDcGIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUVqQixPQUFPLGlCQUFpQjtBQUN4QixTQUFTLGVBQWU7QUFDeEIsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyx3QkFBd0I7QUFDakMsT0FBTyxjQUFjO0FBUnJCLElBQU0sbUNBQW1DO0FBV3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxRQUFNLGVBQWUsU0FBUztBQUU5QixTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsUUFD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LFVBQ2QsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsV0FBVyxJQUFJLHlCQUF5QjtBQUFBLE1BQ3hDLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNiLFVBQVU7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLGVBQWU7QUFBQSxVQUNmLFlBQVksQ0FBQyxlQUFlLGdCQUFnQixpQkFBaUIsY0FBYztBQUFBLFFBQzdFO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDTixVQUFVO0FBQUEsUUFDWjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ04sVUFBVTtBQUFBLFFBQ1o7QUFBQSxNQUNGO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixjQUFjO0FBQUEsWUFDWixRQUFRLENBQUMsU0FBUyxhQUFhLGtCQUFrQjtBQUFBLFlBQ2pELElBQUksQ0FBQywwQkFBMEIsaUNBQWlDLHVCQUF1QjtBQUFBLFlBQ3ZGLE9BQU8sQ0FBQyxtQkFBbUIsdUJBQXVCLEtBQUs7QUFBQSxZQUN2RCxPQUFPLENBQUMsWUFBWSxRQUFRLGdCQUFnQjtBQUFBLFVBQzlDO0FBQUEsVUFDQSxnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0IsQ0FBQyxjQUFjO0FBQzdCLGtCQUFNLE9BQU8sVUFBVSxLQUFLLE1BQU0sR0FBRztBQUNyQyxrQkFBTSxNQUFNLEtBQUssS0FBSyxTQUFTLENBQUM7QUFDaEMsZ0JBQUksOEJBQThCLEtBQUssVUFBVSxJQUFJLEdBQUc7QUFDdEQscUJBQU87QUFBQSxZQUNUO0FBQ0EsZ0JBQUksMEJBQTBCLEtBQUssVUFBVSxJQUFJLEdBQUc7QUFDbEQscUJBQU87QUFBQSxZQUNUO0FBQ0EsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLHVCQUF1QixTQUFTLElBQUkseUJBQXlCLE1BQU07QUFBQSxNQUNuRSxjQUFjO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUixtQkFBbUI7QUFBQSxNQUNuQixlQUFlO0FBQUEsUUFDYixVQUFVO0FBQUEsTUFDWjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxTQUFTLENBQUMsdUJBQXVCO0FBQUEsSUFDbkM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
