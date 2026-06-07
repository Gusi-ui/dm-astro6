import type { Element, Root } from 'hast';
import { getImageSrcSet, isCloudinarySource, resolveImageSrc } from './cloudinary';

const DEFAULT_SIZES = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 896px';

const visitElements = (node: Root | Element, callback: (element: Element) => void) => {
  if (node.type !== 'element') {
    return;
  }

  callback(node);

  for (const child of node.children) {
    if (child.type === 'element') {
      visitElements(child, callback);
    }
  }
};

export const rehypeCloudinaryImages = () => {
  return (tree: Root) => {
    visitElements(tree, (node) => {
      if (node.tagName !== 'img' || !node.properties?.src) {
        return;
      }

      const src = String(node.properties.src);

      if (!isCloudinarySource(src)) {
        return;
      }

      node.properties.src = resolveImageSrc(src, 'f_auto,q_auto,w_1200');
      const srcSet = getImageSrcSet(src);

      if (srcSet) {
        node.properties.srcSet = srcSet;
        node.properties.sizes = DEFAULT_SIZES;
      }

      node.properties.loading = node.properties.loading ?? 'lazy';
      node.properties.decoding = 'async';
    });
  };
};
