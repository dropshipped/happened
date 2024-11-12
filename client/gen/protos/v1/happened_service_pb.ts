// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file v1/happened_service.proto (package happened_service.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file v1/happened_service.proto.
 */
export const file_v1_happened_service: GenFile = /*@__PURE__*/
  fileDesc("Chl2MS9oYXBwZW5lZF9zZXJ2aWNlLnByb3RvEhNoYXBwZW5lZF9zZXJ2aWNlLnYxIhwKDEdyZWV0UmVxdWVzdBIMCgRuYW1lGAEgASgJIiEKDUdyZWV0UmVzcG9uc2USEAoIZ3JlZXRpbmcYASABKAkiFAoSQ3JlYXRlRXZlbnRSZXF1ZXN0IhUKE0NyZWF0ZUV2ZW50UmVzcG9uc2UyxwEKD0hhcHBlbmVkU2VydmljZRJQCgVHcmVldBIhLmhhcHBlbmVkX3NlcnZpY2UudjEuR3JlZXRSZXF1ZXN0GiIuaGFwcGVuZWRfc2VydmljZS52MS5HcmVldFJlc3BvbnNlIgASYgoLQ3JlYXRlRXZlbnQSJy5oYXBwZW5lZF9zZXJ2aWNlLnYxLkNyZWF0ZUV2ZW50UmVxdWVzdBooLmhhcHBlbmVkX3NlcnZpY2UudjEuQ3JlYXRlRXZlbnRSZXNwb25zZSIAQiZaJGhhcHBlbmVkYXBpL2dlbi9wcm90b3MvdjE7aGFwcGVuZWR2MWIGcHJvdG8z");

/**
 * @generated from message happened_service.v1.GreetRequest
 */
export type GreetRequest = Message<"happened_service.v1.GreetRequest"> & {
  /**
   * @generated from field: string name = 1;
   */
  name: string;
};

/**
 * Describes the message happened_service.v1.GreetRequest.
 * Use `create(GreetRequestSchema)` to create a new message.
 */
export const GreetRequestSchema: GenMessage<GreetRequest> = /*@__PURE__*/
  messageDesc(file_v1_happened_service, 0);

/**
 * @generated from message happened_service.v1.GreetResponse
 */
export type GreetResponse = Message<"happened_service.v1.GreetResponse"> & {
  /**
   * @generated from field: string greeting = 1;
   */
  greeting: string;
};

/**
 * Describes the message happened_service.v1.GreetResponse.
 * Use `create(GreetResponseSchema)` to create a new message.
 */
export const GreetResponseSchema: GenMessage<GreetResponse> = /*@__PURE__*/
  messageDesc(file_v1_happened_service, 1);

/**
 * @generated from message happened_service.v1.CreateEventRequest
 */
export type CreateEventRequest = Message<"happened_service.v1.CreateEventRequest"> & {
};

/**
 * Describes the message happened_service.v1.CreateEventRequest.
 * Use `create(CreateEventRequestSchema)` to create a new message.
 */
export const CreateEventRequestSchema: GenMessage<CreateEventRequest> = /*@__PURE__*/
  messageDesc(file_v1_happened_service, 2);

/**
 * @generated from message happened_service.v1.CreateEventResponse
 */
export type CreateEventResponse = Message<"happened_service.v1.CreateEventResponse"> & {
};

/**
 * Describes the message happened_service.v1.CreateEventResponse.
 * Use `create(CreateEventResponseSchema)` to create a new message.
 */
export const CreateEventResponseSchema: GenMessage<CreateEventResponse> = /*@__PURE__*/
  messageDesc(file_v1_happened_service, 3);

/**
 * @generated from service happened_service.v1.HappenedService
 */
export const HappenedService: GenService<{
  /**
   * @generated from rpc happened_service.v1.HappenedService.Greet
   */
  greet: {
    methodKind: "unary";
    input: typeof GreetRequestSchema;
    output: typeof GreetResponseSchema;
  },
  /**
   * @generated from rpc happened_service.v1.HappenedService.CreateEvent
   */
  createEvent: {
    methodKind: "unary";
    input: typeof CreateEventRequestSchema;
    output: typeof CreateEventResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_v1_happened_service, 0);

