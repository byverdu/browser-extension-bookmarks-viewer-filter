type APIKey = 'VisitedLinks'
type Actions = 'get_visited_links' | 'set_visited_links'
type VisitedLink = {
    url: string
    title: string
    date: number
}

type SendMsgParams = {
    type: Actions
    payload?: unknown
}

type OnMsgCallback = (
    msg: SendMsgParams,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: unknown) => void
  ) => void;

interface API {
    getStorage: (key: APIKey) => Promise<{[key in APIKey]: VisitedLink[]}>;
    setStorage: (key: APIKey, values: VisitedLink[]) => Promise<void>;
    sendMessage: <T>({type, payload}: SendMsgParams) => Promise<T>
    onMessage;
    onMessage: (callback: OnMsgCallback) => void;
  removeStorage: (key: APIKey) => Promise<void>;
}