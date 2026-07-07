export interface Call {
  _id: string;
  channelName: string;
  participants: string[];
  startedAt?: string;
  duration?: string;
}

export interface InitiateCallRequest {
  channelName: string;
}

export interface InitiateCallResponse {
  status: string;
  call: Call;
  token?: string;
}

export interface CallHistoryResponse {
  status: string;
  calls: Call[];
}
