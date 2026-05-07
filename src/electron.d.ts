export interface ElectronAPI {
  storeGet: (key: string) => Promise<any>;
  storeSet: (key: string, value: any) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};