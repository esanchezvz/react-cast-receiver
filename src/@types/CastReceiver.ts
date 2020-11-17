export interface CastReceiverContext {
  getInstance: () => CastReceiverContext;
  /**
   * @param {String} namespace - A valid namespace has to be prefixed with the string 'urn:x-cast:'.
   * @param {String} listener - Function to listen for custom messages
   */
  addCustomMessageListener: (namespace: string, listener: (e: any) => void) => void;
  start: () => void;
}
