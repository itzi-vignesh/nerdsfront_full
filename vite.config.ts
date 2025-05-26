import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteImagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  
  return {
    plugins: [
      react(),
      // Only enable PWA in production
      isProduction && VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'NerdsLab Cyber Academy',
          short_name: 'NerdsLab',
          description: 'Interactive cybersecurity learning platform',
          theme_color: '#1A1F2C',
          icons: [
            {
              src: '/image/fca6de80-801d-4784-9884-31b8324b4fe3.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/image/fca6de80-801d-4784-9884-31b8324b4fe3.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/nerd-api\.nerdslab\.in\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                networkTimeoutSeconds: 10,
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 24 * 60 * 60 // 24 hours
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/lab\.nerdslab\.in\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'lab-api-cache',
                networkTimeoutSeconds: 10,
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 24 * 60 * 60 // 24 hours
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      }),
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 10240,
        deleteOriginFile: false
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: 'NerdsLab Cyber Academy',
            description: 'Interactive cybersecurity learning platform',
            keywords: 'cybersecurity, learning, academy, nerdslab'
          }
        }
      }),
      viteImagemin({
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
              name: 'removeViewBox'
            },
            {
              name: 'removeEmptyAttrs',
              active: false
            }
          ]
        }
      }),
      isProduction && visualizer({
        filename: 'stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@lib": path.resolve(__dirname, "./src/lib"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@contexts": path.resolve(__dirname, "./src/contexts"),
        "@types": path.resolve(__dirname, "./src/types")
      },
    },
    server: {
      port: 3000,
      host: true,
      strictPort: true,
      hmr: {
        overlay: true
      },
      headers: {
        'Content-Security-Policy': isProduction 
          ? "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://nerd-api.nerdslab.in https://lab.nerdslab.in https://learn.nerdslab.in wss:; img-src 'self' data: https:; font-src 'self' data: https:;"
          : "default-src 'self' http: https: data: 'unsafe-inline' 'unsafe-eval'; connect-src 'self' http://localhost:* http://127.0.0.1:* https://nerd-api.nerdslab.in https://lab.nerdslab.in https://learn.nerdslab.in wss:; img-src 'self' data: http: https:; font-src 'self' data: http: https:;"
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
            'utils-vendor': ['date-fns', 'clsx', 'tailwind-merge', 'class-variance-authority']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      cssMinify: true,
      target: 'esnext',
      assetsInlineLimit: 4096,
      modulePreload: {
        polyfill: true
      }
    },
    preview: {
      port: 3000,
      host: true,
      strictPort: true
    },
    css: {
      devSourcemap: true,
      modules: {
        localsConvention: 'camelCase'
      }
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-toast',
        'date-fns',
        'clsx',
        'tailwind-merge',
        'class-variance-authority'
      ]
    }
  };
});
