type APIKey = 'VisitedLinks'
type APIKeyOptions = 'VisitedLinksOptions'
type Actions = 'GET_STORAGE' | 'SET_STORAGE' | 'REMOVE_STORAGE' | 'UPDATE_STORAGE'
type VisitedLink = {
  url: string
  title: string
  date: number
}

type Options = {
  sort: 'asc' | 'desc';
}

type Payload<T> = {
  key: APIKey
  value?: T
}

type SendMsgParams = {
  type: Actions
  payload?: Payload<unknown>
}

type OnMsgCallback = (
  msg: SendMsgParams,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: unknown) => void
) => void;

type OnInstalledCallback = (details: chrome.runtime.InstalledDetails) => void;

type OnclickContextMenu =  (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => void;

type ContextMenu = {
  id: string;
  title: string;
  contexts: chrome.contextMenus.ContextType[];
}

interface API {
  getStorage: (key: APIKey) => Promise<{[key in APIKey]: VisitedLink[]} | {[key in APIKeyOptions]: Options}>;
  setStorage: (key: APIKey, values: VisitedLink[] | Options) => Promise<void>;
  sendMessage: <T>({type, payload}: SendMsgParams) => Promise<T>
  onMessage: (callback: OnMsgCallback) => void;
  removeStorage: (key: APIKey) => Promise<void>;
  onInstalled: (callback: OnInstalledCallback) => void;
  updateStorage: (key: APIKey, value: VisitedLink) => Promise<void>;
  createContextMenu: (props: ContextMenu) => void;
  contextMenuOnClick: (callback: OnclickContextMenu) => void;
}