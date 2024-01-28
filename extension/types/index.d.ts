type APIKey = 'VisitedLinks'
type Actions = 'GET_STORAGE' | 'SET_STORAGE' | 'REMOVE_STORAGE' | 'UPDATE_STORAGE'
type VisitedLink = {
  url: string
  title: string
  date: number
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

interface API {
  getStorage: (key: APIKey) => Promise<{[key in APIKey]: VisitedLink[]}>;
  setStorage: (key: APIKey, values: VisitedLink[]) => Promise<void>;
  sendMessage: <T>({type, payload}: SendMsgParams) => Promise<T>
  onMessage: (callback: OnMsgCallback) => void;
  removeStorage: (key: APIKey) => Promise<void>;
  onInstalled: (callback: OnInstalledCallback) => void;
  updateStorage: (key: APIKey, value: VisitedLink) => Promise<void>;
}