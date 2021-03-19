import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    Vue(),
    VitePWA({
      manifest: {
        'name': 'CommunityManager',
        'short_name': 'CM',
        'start_url': '/',
        'display': 'standalone',
        'background_color': '#fff',
        'theme_color': '#00734d',
        'description': 'A Community Manager app.',
        'icons': [
          {
            'src': 'cm_icon_x48.png',
            'sizes': '48x48',
            'type': 'image/png'
          },
          {
            'src': 'cm_icon_x72.png',
            'sizes': '72x72',
            'type': 'image/png'
          },
          {
            'src': 'cm_icon_x96.png',
            'sizes': '96x96',
            'type': 'image/png'
          },
          {
            'src': 'cm_icon_x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'cm_icon_x192.png',
            'sizes': '192x192',
            'type': 'image/png',
            'purpose': 'maskable'
          },
          {
            'src': 'cm_icon_x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'cm_icon_x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ],
        'prefer_related_applications': false
      }
    })
  ]
})