// export interface Message {
//   jsonrpc: string;
// }

import {
  RequestMessage,
  NotificationMessage,
  CompletionParams,
  DidChangeTextDocumentParams,
} from "vscode-languageserver";

// export interface RequestMessage extends Message {
//   /**
//    * The request id.
//    */
//   id: number | string;

//   /**
//    * The method to be invoked.
//    */
//   method: string;

//   /**
//    * The method's params.
//    */
//   params?: unknown[] | object;
// }

// export interface ResponseMessage extends Message {
//   /**
//    * The request id.
//    */
//   id: number | string | null;

//   /**
//    * The result of a request. This member is REQUIRED on success.
//    * This member MUST NOT exist if there was an error invoking the method.
//    */
//   result?: LSPAny;

//   /**
//    * The error object in case a request fails.
//    */
//   error?: ResponseError;
// }

// export interface ResponseError {
//   /**
//    * A number indicating the error type that occurred.
//    */
//   code: number;

//   /**
//    * A string providing a short description of the error.
//    */
//   message: string;

//   /**
//    * A primitive or structured value that contains additional
//    * information about the error. Can be omitted.
//    */
//   data?: LSPAny;
// }

// /**
//  * The LSP any type
//  *
//  * @since 3.17.0
//  */
// export type LSPAny =
//   | LSPObject
//   | LSPArray
//   | string
//   | number
//   | uinteger
//   | decimal
//   | boolean
//   | null;

// /**
//  * LSP object definition.
//  *
//  * @since 3.17.0
//  */
// export type LSPObject = { [key: string]: LSPAny };

// /**
//  * LSP arrays.
//  *
//  * @since 3.17.0
//  */
// export type LSPArray = LSPAny[];

// /**
//  * Defines an unsigned integer number in the range of 0 to 2^31 - 1.
//  */
// export type uinteger = number;

// /**
//  * Defines a decimal number. Since decimal numbers are very
//  * rare in the language server specification we denote the
//  * exact range with every decimal using the mathematics
//  * interval notation (e.g. [0, 1] denotes all decimals d with
//  * 0 <= d <= 1.
//  */
// export type decimal = number;

export type RequestType =
  | RequestMessage
  | NotificationMessage
  | CompletionParams
  | DidChangeTextDocumentParams;

export type NotificationType =
  | NotificationMessage
  | DidChangeTextDocumentParams;
