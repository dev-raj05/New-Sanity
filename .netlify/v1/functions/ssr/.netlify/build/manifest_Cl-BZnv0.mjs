import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_BqO5gSP-.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/User/OneDrive/Desktop/New-Sanity/","cacheDir":"file:///C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/.astro/","outDir":"file:///C:/Users/User/OneDrive/Desktop/New-Sanity/dist/","srcDir":"file:///C:/Users/User/OneDrive/Desktop/New-Sanity/src/","publicDir":"file:///C:/Users/User/OneDrive/Desktop/New-Sanity/public/","buildClientDir":"file:///C:/Users/User/OneDrive/Desktop/New-Sanity/dist/","buildServerDir":"file:///C:/Users/User/OneDrive/Desktop/New-Sanity/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{margin:0;padding:0}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/studio/[...params]","pattern":"^\\/studio(?:\\/(.*?))?\\/?$","segments":[[{"content":"studio","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@sanity/astro/dist/studio/studio-route.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/@sanity/astro/dist/studio/studio-route.astro",{"propagation":"none","containsHead":true}],["C:/Users/User/OneDrive/Desktop/New-Sanity/src/pages/author/[author].astro",{"propagation":"none","containsHead":true}],["C:/Users/User/OneDrive/Desktop/New-Sanity/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/User/OneDrive/Desktop/New-Sanity/src/pages/posts/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/User/OneDrive/Desktop/New-Sanity/src/pages/tags/[tag].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/author/[author]@_@astro":"pages/author/_author_.astro.mjs","\u0000@astro-page:src/pages/posts/[slug]@_@astro":"pages/posts/_slug_.astro.mjs","\u0000@astro-page:node_modules/@sanity/astro/dist/studio/studio-route@_@astro":"pages/studio/_---params_.astro.mjs","\u0000@astro-page:src/pages/tags/[tag]@_@astro":"pages/tags/_tag_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Cl-BZnv0.mjs","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BOF4Em6j.mjs","C:/Users/User/OneDrive/Desktop/New-Sanity/src/pages/posts/[slug].astro?astro&type=script&index=0&lang.ts":"_astro/_slug_.astro_astro_type_script_index_0_lang.l0sNRNKZ.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/@sanity/astro/dist/visual-editing/visual-editing-component":"_astro/visual-editing-component.C42ZVA0T.js","C:/Users/User/OneDrive/Desktop/New-Sanity/src/pages/posts/[slug].astro?astro&type=script&index=1&lang.ts":"_astro/_slug_.astro_astro_type_script_index_1_lang.CbUcU0P1.js","C:/Users/User/OneDrive/Desktop/New-Sanity/src/pages/posts/[slug].astro?astro&type=script&index=2&lang.ts":"_astro/_slug_.astro_astro_type_script_index_2_lang.CYFycPRQ.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/resources2.mjs":"_astro/resources2.CVNa29Hy.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/resources.mjs":"_astro/resources.-3Tg6AHj.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/resources4.mjs":"_astro/resources4.U_MYaCHt.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/resources3.mjs":"_astro/resources3.C1CigO98.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/ViteDevServerStopped.mjs":"_astro/ViteDevServerStopped.BkfzoVk2.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/@sanity/client/dist/_chunks-es/stegaEncodeSourceMap.js":"_astro/stegaEncodeSourceMap.CqX4NsKr.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/@sanity/ui/dist/_chunks-es/refractor.mjs":"_astro/refractor.D-3Bxl9I.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/resources5.mjs":"_astro/resources5.Bfa-9t4J.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/resources6.mjs":"_astro/resources6.BmTsiFky.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/BroadcastDisplayedDocument.mjs":"_astro/BroadcastDisplayedDocument.Cu0OMkTM.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/@sanity/vision/lib/_chunks-es/resources.mjs":"_astro/resources.BBMZ_LSs.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/@sanity/visual-editing/dist/_chunks-es/renderVisualEditing.js":"_astro/renderVisualEditing.DlBkb29q.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/index.mjs":"_astro/index.DGariIhb.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/index2.mjs":"_astro/index2.D4slXhU3.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/QRCodeSVG.mjs":"_astro/QRCodeSVG.BmbQ6Xk9.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/PostMessageDocuments.mjs":"_astro/PostMessageDocuments.BI9U9cD2.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/PostMessageRefreshMutations.mjs":"_astro/PostMessageRefreshMutations.CpnTeht7.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/PostMessagePerspective.mjs":"_astro/PostMessagePerspective.94Vt_f5d.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/PostMessageSchema.mjs":"_astro/PostMessageSchema.DpCpFK-8.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/PostMessageTelemetry.mjs":"_astro/PostMessageTelemetry.Vt6srain.js","@astrojs/react/client.js":"_astro/client.DQfYPaXj.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/index3.mjs":"_astro/index3.C9-gc8Ml.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/PostMessagePreviewSnapshots.mjs":"_astro/PostMessagePreviewSnapshots.0hMWFiki.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/LiveQueries.mjs":"_astro/LiveQueries.BHvaWfUg.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/sanity/lib/_chunks-es/PresentationToolGrantsCheck.mjs":"_astro/PresentationToolGrantsCheck.1Do-ViBH.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/@sanity/vision/lib/_chunks-es/SanityVision.mjs":"_astro/SanityVision.Asx6Ny2E.js","C:/Users/User/OneDrive/Desktop/New-Sanity/node_modules/@sanity/astro/dist/studio/studio-component":"_astro/studio-component.DRK49_TI.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/User/OneDrive/Desktop/New-Sanity/src/pages/posts/[slug].astro?astro&type=script&index=0&lang.ts",""],["C:/Users/User/OneDrive/Desktop/New-Sanity/src/pages/posts/[slug].astro?astro&type=script&index=1&lang.ts","const e=document.querySelector(\".share-btn\"),t=document.getElementById(\"#share-options\");e?.addEventListener(\"click\",()=>{t?.classList.toggle(\"active\")});"],["C:/Users/User/OneDrive/Desktop/New-Sanity/src/pages/posts/[slug].astro?astro&type=script&index=2&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const e=document.querySelector(\".share-btn\"),t=document.getElementById(\"share-options\"),o=document.getElementById(\"copy-url-btn\");e.addEventListener(\"click\",function(){t.classList.toggle(\"opacity-0\"),t.classList.toggle(\"scale-95\"),t.classList.toggle(\"pointer-events-none\")}),document.addEventListener(\"click\",function(n){!e.contains(n.target)&&!t.contains(n.target)&&(t.classList.add(\"opacity-0\"),t.classList.add(\"scale-95\"),t.classList.add(\"pointer-events-none\"))}),o.addEventListener(\"click\",function(){navigator.clipboard.writeText(window.location.href).then(()=>{alert(\"URL copied to clipboard!\")})})});"]],"assets":["/_astro/_author_.CadTWNjS.css","/favicon.svg","/styles.css","/_redirects","/_astro/BroadcastDisplayedDocument.Cu0OMkTM.js","/_astro/browser.eAeLldmR.js","/_astro/client.CI_GHnT6.js","/_astro/client.DQfYPaXj.js","/_astro/DisplayedDocumentBroadcaster.BftGkIpI.js","/_astro/index.BriNxBLE.js","/_astro/index.CGenSdnf.js","/_astro/index.D-jre8u3.js","/_astro/index.DGariIhb.js","/_astro/index.VacfkYPP.js","/_astro/index2.D4slXhU3.js","/_astro/index3.C9-gc8Ml.js","/_astro/LiveQueries.BHvaWfUg.js","/_astro/PostMessageDocuments.BI9U9cD2.js","/_astro/PostMessagePerspective.94Vt_f5d.js","/_astro/PostMessagePreviewSnapshots.0hMWFiki.js","/_astro/PostMessageRefreshMutations.CpnTeht7.js","/_astro/PostMessageSchema.DpCpFK-8.js","/_astro/PostMessageTelemetry.Vt6srain.js","/_astro/PresentationToolGrantsCheck.1Do-ViBH.js","/_astro/QRCodeSVG.BmbQ6Xk9.js","/_astro/refractor.D-3Bxl9I.js","/_astro/Refractor.pr3hAomv.js","/_astro/renderVisualEditing.DlBkb29q.js","/_astro/resources.-3Tg6AHj.js","/_astro/resources.BBMZ_LSs.js","/_astro/resources2.CVNa29Hy.js","/_astro/resources3.C1CigO98.js","/_astro/resources4.U_MYaCHt.js","/_astro/resources5.Bfa-9t4J.js","/_astro/resources6.BmTsiFky.js","/_astro/SanityVision.Asx6Ny2E.js","/_astro/stegaEncodeSourceMap.CqX4NsKr.js","/_astro/studio-component.DRK49_TI.js","/_astro/studio-component._Jn8ObAr.js","/_astro/visual-editing-component.C42ZVA0T.js","/_astro/ViteDevServerStopped.BkfzoVk2.js","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"q3KNGgmLZBDaENyxUH8qiIV7JZIriSdpBpf6VhKP/Wc="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
