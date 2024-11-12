// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.35.1
// 	protoc        (unknown)
// source: protos/v1/happened_messages.proto

package happenedv1

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type GreetRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
}

func (x *GreetRequest) Reset() {
	*x = GreetRequest{}
	mi := &file_protos_v1_happened_messages_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GreetRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GreetRequest) ProtoMessage() {}

func (x *GreetRequest) ProtoReflect() protoreflect.Message {
	mi := &file_protos_v1_happened_messages_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GreetRequest.ProtoReflect.Descriptor instead.
func (*GreetRequest) Descriptor() ([]byte, []int) {
	return file_protos_v1_happened_messages_proto_rawDescGZIP(), []int{0}
}

func (x *GreetRequest) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

type GreetResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Greeting string `protobuf:"bytes,1,opt,name=greeting,proto3" json:"greeting,omitempty"`
}

func (x *GreetResponse) Reset() {
	*x = GreetResponse{}
	mi := &file_protos_v1_happened_messages_proto_msgTypes[1]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GreetResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GreetResponse) ProtoMessage() {}

func (x *GreetResponse) ProtoReflect() protoreflect.Message {
	mi := &file_protos_v1_happened_messages_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GreetResponse.ProtoReflect.Descriptor instead.
func (*GreetResponse) Descriptor() ([]byte, []int) {
	return file_protos_v1_happened_messages_proto_rawDescGZIP(), []int{1}
}

func (x *GreetResponse) GetGreeting() string {
	if x != nil {
		return x.Greeting
	}
	return ""
}

type Event struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Title string `protobuf:"bytes,1,opt,name=title,proto3" json:"title,omitempty"`
}

func (x *Event) Reset() {
	*x = Event{}
	mi := &file_protos_v1_happened_messages_proto_msgTypes[2]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Event) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Event) ProtoMessage() {}

func (x *Event) ProtoReflect() protoreflect.Message {
	mi := &file_protos_v1_happened_messages_proto_msgTypes[2]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Event.ProtoReflect.Descriptor instead.
func (*Event) Descriptor() ([]byte, []int) {
	return file_protos_v1_happened_messages_proto_rawDescGZIP(), []int{2}
}

func (x *Event) GetTitle() string {
	if x != nil {
		return x.Title
	}
	return ""
}

type CreateEventRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Title       string `protobuf:"bytes,1,opt,name=title,proto3" json:"title,omitempty"`
	Description string `protobuf:"bytes,2,opt,name=description,proto3" json:"description,omitempty"`
	Place       string `protobuf:"bytes,3,opt,name=place,proto3" json:"place,omitempty"`
}

func (x *CreateEventRequest) Reset() {
	*x = CreateEventRequest{}
	mi := &file_protos_v1_happened_messages_proto_msgTypes[3]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *CreateEventRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateEventRequest) ProtoMessage() {}

func (x *CreateEventRequest) ProtoReflect() protoreflect.Message {
	mi := &file_protos_v1_happened_messages_proto_msgTypes[3]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateEventRequest.ProtoReflect.Descriptor instead.
func (*CreateEventRequest) Descriptor() ([]byte, []int) {
	return file_protos_v1_happened_messages_proto_rawDescGZIP(), []int{3}
}

func (x *CreateEventRequest) GetTitle() string {
	if x != nil {
		return x.Title
	}
	return ""
}

func (x *CreateEventRequest) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

func (x *CreateEventRequest) GetPlace() string {
	if x != nil {
		return x.Place
	}
	return ""
}

type CreateEventResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Event *Event `protobuf:"bytes,1,opt,name=event,proto3" json:"event,omitempty"`
}

func (x *CreateEventResponse) Reset() {
	*x = CreateEventResponse{}
	mi := &file_protos_v1_happened_messages_proto_msgTypes[4]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *CreateEventResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateEventResponse) ProtoMessage() {}

func (x *CreateEventResponse) ProtoReflect() protoreflect.Message {
	mi := &file_protos_v1_happened_messages_proto_msgTypes[4]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateEventResponse.ProtoReflect.Descriptor instead.
func (*CreateEventResponse) Descriptor() ([]byte, []int) {
	return file_protos_v1_happened_messages_proto_rawDescGZIP(), []int{4}
}

func (x *CreateEventResponse) GetEvent() *Event {
	if x != nil {
		return x.Event
	}
	return nil
}

type GetUploadImageURLRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *GetUploadImageURLRequest) Reset() {
	*x = GetUploadImageURLRequest{}
	mi := &file_protos_v1_happened_messages_proto_msgTypes[5]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetUploadImageURLRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetUploadImageURLRequest) ProtoMessage() {}

func (x *GetUploadImageURLRequest) ProtoReflect() protoreflect.Message {
	mi := &file_protos_v1_happened_messages_proto_msgTypes[5]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetUploadImageURLRequest.ProtoReflect.Descriptor instead.
func (*GetUploadImageURLRequest) Descriptor() ([]byte, []int) {
	return file_protos_v1_happened_messages_proto_rawDescGZIP(), []int{5}
}

type GetUploadImageURLResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	PresignedUrl string `protobuf:"bytes,1,opt,name=presigned_url,json=presignedUrl,proto3" json:"presigned_url,omitempty"`
}

func (x *GetUploadImageURLResponse) Reset() {
	*x = GetUploadImageURLResponse{}
	mi := &file_protos_v1_happened_messages_proto_msgTypes[6]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetUploadImageURLResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetUploadImageURLResponse) ProtoMessage() {}

func (x *GetUploadImageURLResponse) ProtoReflect() protoreflect.Message {
	mi := &file_protos_v1_happened_messages_proto_msgTypes[6]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetUploadImageURLResponse.ProtoReflect.Descriptor instead.
func (*GetUploadImageURLResponse) Descriptor() ([]byte, []int) {
	return file_protos_v1_happened_messages_proto_rawDescGZIP(), []int{6}
}

func (x *GetUploadImageURLResponse) GetPresignedUrl() string {
	if x != nil {
		return x.PresignedUrl
	}
	return ""
}

var File_protos_v1_happened_messages_proto protoreflect.FileDescriptor

var file_protos_v1_happened_messages_proto_rawDesc = []byte{
	0x0a, 0x21, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x2f, 0x76, 0x31, 0x2f, 0x68, 0x61, 0x70, 0x70,
	0x65, 0x6e, 0x65, 0x64, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x73, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x12, 0x11, 0x68, 0x61, 0x70, 0x70, 0x65, 0x6e, 0x65, 0x64, 0x5f, 0x6d, 0x65,
	0x73, 0x73, 0x61, 0x67, 0x65, 0x73, 0x22, 0x22, 0x0a, 0x0c, 0x47, 0x72, 0x65, 0x65, 0x74, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x22, 0x2b, 0x0a, 0x0d, 0x47, 0x72,
	0x65, 0x65, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x67,
	0x72, 0x65, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x67,
	0x72, 0x65, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x22, 0x1d, 0x0a, 0x05, 0x45, 0x76, 0x65, 0x6e, 0x74,
	0x12, 0x14, 0x0a, 0x05, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x05, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x22, 0x62, 0x0a, 0x12, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65,
	0x45, 0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x14, 0x0a, 0x05,
	0x74, 0x69, 0x74, 0x6c, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x74, 0x69, 0x74,
	0x6c, 0x65, 0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69, 0x6f,
	0x6e, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70,
	0x74, 0x69, 0x6f, 0x6e, 0x12, 0x14, 0x0a, 0x05, 0x70, 0x6c, 0x61, 0x63, 0x65, 0x18, 0x03, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x05, 0x70, 0x6c, 0x61, 0x63, 0x65, 0x22, 0x45, 0x0a, 0x13, 0x43, 0x72,
	0x65, 0x61, 0x74, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x12, 0x2e, 0x0a, 0x05, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x18, 0x2e, 0x68, 0x61, 0x70, 0x70, 0x65, 0x6e, 0x65, 0x64, 0x5f, 0x6d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x73, 0x2e, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x52, 0x05, 0x65, 0x76, 0x65, 0x6e,
	0x74, 0x22, 0x1a, 0x0a, 0x18, 0x47, 0x65, 0x74, 0x55, 0x70, 0x6c, 0x6f, 0x61, 0x64, 0x49, 0x6d,
	0x61, 0x67, 0x65, 0x55, 0x52, 0x4c, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x40, 0x0a,
	0x19, 0x47, 0x65, 0x74, 0x55, 0x70, 0x6c, 0x6f, 0x61, 0x64, 0x49, 0x6d, 0x61, 0x67, 0x65, 0x55,
	0x52, 0x4c, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x23, 0x0a, 0x0d, 0x70, 0x72,
	0x65, 0x73, 0x69, 0x67, 0x6e, 0x65, 0x64, 0x5f, 0x75, 0x72, 0x6c, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x0c, 0x70, 0x72, 0x65, 0x73, 0x69, 0x67, 0x6e, 0x65, 0x64, 0x55, 0x72, 0x6c, 0x42,
	0x26, 0x5a, 0x24, 0x68, 0x61, 0x70, 0x70, 0x65, 0x6e, 0x65, 0x64, 0x61, 0x70, 0x69, 0x2f, 0x67,
	0x65, 0x6e, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x73, 0x2f, 0x76, 0x31, 0x3b, 0x68, 0x61, 0x70,
	0x70, 0x65, 0x6e, 0x65, 0x64, 0x76, 0x31, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_protos_v1_happened_messages_proto_rawDescOnce sync.Once
	file_protos_v1_happened_messages_proto_rawDescData = file_protos_v1_happened_messages_proto_rawDesc
)

func file_protos_v1_happened_messages_proto_rawDescGZIP() []byte {
	file_protos_v1_happened_messages_proto_rawDescOnce.Do(func() {
		file_protos_v1_happened_messages_proto_rawDescData = protoimpl.X.CompressGZIP(file_protos_v1_happened_messages_proto_rawDescData)
	})
	return file_protos_v1_happened_messages_proto_rawDescData
}

var file_protos_v1_happened_messages_proto_msgTypes = make([]protoimpl.MessageInfo, 7)
var file_protos_v1_happened_messages_proto_goTypes = []any{
	(*GreetRequest)(nil),              // 0: happened_messages.GreetRequest
	(*GreetResponse)(nil),             // 1: happened_messages.GreetResponse
	(*Event)(nil),                     // 2: happened_messages.Event
	(*CreateEventRequest)(nil),        // 3: happened_messages.CreateEventRequest
	(*CreateEventResponse)(nil),       // 4: happened_messages.CreateEventResponse
	(*GetUploadImageURLRequest)(nil),  // 5: happened_messages.GetUploadImageURLRequest
	(*GetUploadImageURLResponse)(nil), // 6: happened_messages.GetUploadImageURLResponse
}
var file_protos_v1_happened_messages_proto_depIdxs = []int32{
	2, // 0: happened_messages.CreateEventResponse.event:type_name -> happened_messages.Event
	1, // [1:1] is the sub-list for method output_type
	1, // [1:1] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_protos_v1_happened_messages_proto_init() }
func file_protos_v1_happened_messages_proto_init() {
	if File_protos_v1_happened_messages_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_protos_v1_happened_messages_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   7,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_protos_v1_happened_messages_proto_goTypes,
		DependencyIndexes: file_protos_v1_happened_messages_proto_depIdxs,
		MessageInfos:      file_protos_v1_happened_messages_proto_msgTypes,
	}.Build()
	File_protos_v1_happened_messages_proto = out.File
	file_protos_v1_happened_messages_proto_rawDesc = nil
	file_protos_v1_happened_messages_proto_goTypes = nil
	file_protos_v1_happened_messages_proto_depIdxs = nil
}