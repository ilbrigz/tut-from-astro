export interface MarkdownInstance<T extends Record<string, any>> {
  frontmatter: T;
  file: string;
  url: string | undefined;
  content: any;
  getHeadings(): Promise<{ depth: number; slug: string; text: string }[]>;
}
