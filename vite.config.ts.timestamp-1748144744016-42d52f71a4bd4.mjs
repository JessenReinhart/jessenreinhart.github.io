// vite.config.ts
import { rezact } from "file:///C:/Users/jesse/jessen-page/node_modules/@rezact/rezact/vite-plugin.js";
import { rezact_mdx } from "file:///C:/Users/jesse/jessen-page/node_modules/@rezact/rezact/vite-mdx-plugin.js";
import remarkFrontmatter from "file:///C:/Users/jesse/jessen-page/node_modules/remark-frontmatter/index.js";
import remarkMdxFrontmatter from "file:///C:/Users/jesse/jessen-page/node_modules/remark-mdx-frontmatter/index.js";
import rehypeHighlight from "file:///C:/Users/jesse/jessen-page/node_modules/rehype-highlight/index.js";
import mdx from "file:///C:/Users/jesse/jessen-page/node_modules/@mdx-js/rollup/index.js";
var vite_config_default = {
  resolve: {
    alias: {
      src: "/src",
      rezact: "@rezact/rezact"
    }
  },
  build: {
    target: "esnext",
    modulePreload: {
      polyfill: false
    }
  },
  esbuild: {
    jsxFactory: "xCreateElement",
    jsxFragment: "xFragment"
  },
  plugins: [
    mdx({
      pragma: "r.xCreateElement",
      pragmaFrag: "r.xFragment",
      jsxRuntime: "classic",
      pragmaImportSource: "@rezact/rezact/mdx",
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: "fm" }]
      ],
      rehypePlugins: [rehypeHighlight]
    }),
    rezact(),
    rezact_mdx()
  ]
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqZXNzZVxcXFxqZXNzZW4tcGFnZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcamVzc2VcXFxcamVzc2VuLXBhZ2VcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2plc3NlL2plc3Nlbi1wYWdlL3ZpdGUuY29uZmlnLnRzXCI7LyoqQHR5cGV7aW1wb3J0KCd2aXRlJykuVXNlckNvbmZpZ30gKi9cbmltcG9ydCB7IHJlemFjdCB9IGZyb20gXCJAcmV6YWN0L3JlemFjdC92aXRlLXBsdWdpblwiO1xuaW1wb3J0IHsgcmV6YWN0X21keCB9IGZyb20gXCJAcmV6YWN0L3JlemFjdC92aXRlLW1keC1wbHVnaW5cIjtcbmltcG9ydCByZW1hcmtGcm9udG1hdHRlciBmcm9tIFwicmVtYXJrLWZyb250bWF0dGVyXCI7XG5pbXBvcnQgcmVtYXJrTWR4RnJvbnRtYXR0ZXIgZnJvbSBcInJlbWFyay1tZHgtZnJvbnRtYXR0ZXJcIjtcbmltcG9ydCByZWh5cGVIaWdobGlnaHQgZnJvbSBcInJlaHlwZS1oaWdobGlnaHRcIjtcbmltcG9ydCBtZHggZnJvbSBcIkBtZHgtanMvcm9sbHVwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBzcmM6IFwiL3NyY1wiLFxuICAgICAgcmV6YWN0OiBcIkByZXphY3QvcmV6YWN0XCIsXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6IFwiZXNuZXh0XCIsXG4gICAgbW9kdWxlUHJlbG9hZDoge1xuICAgICAgcG9seWZpbGw6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIGVzYnVpbGQ6IHtcbiAgICBqc3hGYWN0b3J5OiBcInhDcmVhdGVFbGVtZW50XCIsXG4gICAganN4RnJhZ21lbnQ6IFwieEZyYWdtZW50XCIsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBtZHgoe1xuICAgICAgcHJhZ21hOiBcInIueENyZWF0ZUVsZW1lbnRcIixcbiAgICAgIHByYWdtYUZyYWc6IFwici54RnJhZ21lbnRcIixcbiAgICAgIGpzeFJ1bnRpbWU6IFwiY2xhc3NpY1wiLFxuICAgICAgcHJhZ21hSW1wb3J0U291cmNlOiBcIkByZXphY3QvcmV6YWN0L21keFwiLFxuICAgICAgcmVtYXJrUGx1Z2luczogW1xuICAgICAgICByZW1hcmtGcm9udG1hdHRlcixcbiAgICAgICAgW3JlbWFya01keEZyb250bWF0dGVyLCB7IG5hbWU6IFwiZm1cIiB9XSxcbiAgICAgIF0sXG4gICAgICByZWh5cGVQbHVnaW5zOiBbcmVoeXBlSGlnaGxpZ2h0XSxcbiAgICB9KSxcbiAgICByZXphY3QoKSxcbiAgICByZXphY3RfbWR4KCksXG4gIF0sXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsY0FBYztBQUN2QixTQUFTLGtCQUFrQjtBQUMzQixPQUFPLHVCQUF1QjtBQUM5QixPQUFPLDBCQUEwQjtBQUNqQyxPQUFPLHFCQUFxQjtBQUM1QixPQUFPLFNBQVM7QUFFaEIsSUFBTyxzQkFBUTtBQUFBLEVBQ2IsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUEsTUFDWixZQUFZO0FBQUEsTUFDWixvQkFBb0I7QUFBQSxNQUNwQixlQUFlO0FBQUEsUUFDYjtBQUFBLFFBQ0EsQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUFBLE1BQ3ZDO0FBQUEsTUFDQSxlQUFlLENBQUMsZUFBZTtBQUFBLElBQ2pDLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxFQUNiO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
