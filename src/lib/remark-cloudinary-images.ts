import { transformCloudinaryHtml } from './cloudinary-html';

type MarkdownNode = {
  type: string;
  value?: string;
  children?: MarkdownNode[];
};

const visitMarkdown = (node: MarkdownNode, callback: (node: MarkdownNode) => void) => {
  callback(node);

  if (!node.children) {
    return;
  }

  for (const child of node.children) {
    visitMarkdown(child, callback);
  }
};

export const remarkCloudinaryImages = () => {
  return (tree: MarkdownNode) => {
    visitMarkdown(tree, (node) => {
      if (node.type !== 'html' || !node.value) {
        return;
      }

      node.value = transformCloudinaryHtml(node.value);
    });
  };
};
