type APIKey = 'BookmarkViewerFilter'
type FilterView = 'grid' | 'list'
type FilterTime = '7' | '15' | '30' | '90' | '120' | '180' | 'custom'
type BookmarkViewerFilter = {
  search: string;
  time: FilterTime;
  view: FilterView;
}


type Bookmark = {
  url: string;
  title: string;
  date: number;
}

type Actions = 'GET_STORAGE' | 'SET_STORAGE' | 'REMOVE_STORAGE' | 'UPDATE_STORAGE'

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

interface API {
  onInstalled: (callback: OnInstalledCallback) => void;
  getStorage: (key: APIKey) => Promise<{[key in APIKey]: BookmarkViewerFilter[]}>;
  setStorage: (key: APIKey, values: BookmarkViewerFilter[]) => Promise<void>;
  sendMessage: <T>({type, payload}: SendMsgParams) => Promise<T>
  onMessage: (callback: OnMsgCallback) => void;
  removeStorage: (key: APIKey) => Promise<void>;
  updateStorage: (key: APIKey, value: BookmarkViewerFilter) => Promise<void>;
}
