export interface Node {
  type: 'folder' | 'file' | 'unset' | null;
  name?: string;
  children?: Node[];
  id: string;
}
